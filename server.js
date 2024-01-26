const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Datos de ejemplo para simular una base de datos
let postres = [
  { id: 1, nombre: 'Tiramisú' },
  { id: 2, nombre: 'Cheesecake' },
  { id: 3, nombre: 'Brownie' },
];

// Obtener todos los postres
app.get('/postres', (req, res) => {
  res.json(postres);
});

// Obtener un postre por ID
app.get('/postres/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postre = postres.find(p => p.id === id);

  if (postre) {
    res.json(postre);
  } else {
    res.status(404).json({ mensaje: 'Postre no encontrado' });
  }
});

// Agregar un nuevo postre
app.post('/postres', (req, res) => {
  const nuevoPostre = req.body;
  postres.push(nuevoPostre);
  res.status(201).json(nuevoPostre);
});

// Actualizar un postre por ID
app.put('/postres/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = postres.findIndex(p => p.id === id);

  if (index !== -1) {
    postres[index] = { ...postres[index], ...req.body };
    res.json(postres[index]);
  } else {
    res.status(404).json({ mensaje: 'Postre no encontrado' });
  }
});

// Eliminar un postre por ID
app.delete('/postres/:id', (req, res) => {
  const id = parseInt(req.params.id);
  postres = postres.filter(p => p.id !== id);
  res.json({ mensaje: 'Postre eliminado con éxito' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
