const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;
const FILE_PATH = 'file.json';

app.use(bodyParser.json());

async function cargarPostresDesdeArchivo() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function guardarPostresEnArchivo(postres) {
  await fs.writeFile(FILE_PATH, JSON.stringify(postres, null, 2), 'utf-8');
}

app.get('/postres', async (req, res) => {
  const postres = await cargarPostresDesdeArchivo();
  res.json(postres);
});

app.get('/postres/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const postres = await cargarPostresDesdeArchivo();
  const postre = postres.find(p => p.id === id);

  if (postre) {
    res.json(postre);
  } else {
    res.status(404).json({ mensaje: 'Postre no encontrado' });
  }
});

app.post('/postres', async (req, res) => {
  const nuevoPostre = req.body;
  const postres = await cargarPostresDesdeArchivo();

  nuevoPostre.id = postres.length + 1;

  postres.push(nuevoPostre);

  await guardarPostresEnArchivo(postres);

  res.status(201).json(nuevoPostre);
});

app.put('/postres/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const postres = await cargarPostresDesdeArchivo();
  const index = postres.findIndex(p => p.id === id);

  if (index !== -1) {
    postres[index] = { ...postres[index], ...req.body };

    await guardarPostresEnArchivo(postres);

    res.json(postres[index]);
  } else {
    res.status(404).json({ mensaje: 'Postre no encontrado' });
  }
});

app.delete('/postres/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  let postres = await cargarPostresDesdeArchivo();
  postres = postres.filter(p => p.id !== id);

  await guardarPostresEnArchivo(postres);

  res.json({ mensaje: 'Postre eliminado con éxito' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

////// Final del codigo.