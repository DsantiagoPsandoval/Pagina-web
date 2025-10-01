const express = require('express');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// in-memory store for demo
let projects = [
  { id: uuidv4(), title: 'Proyecto inicial', description: 'Demo de la rama Ingeniería de Sistemas', status: 'pendiente', owner: 'u1' }
];

// GET all projects for user
router.get('/', auth, (req, res, next) => {
  try {
    // simple filter by owner
    const userProjects = projects.filter(p => p.owner === req.user.id);
    res.json(userProjects);
  } catch (err) { next(err); }
});

// POST create
router.post('/', auth, (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if(!title) return res.status(400).json({ error: 'title required' });
    const p = { id: uuidv4(), title, description: description||'', status: status||'pendiente', owner: req.user.id };
    projects.push(p);
    res.status(201).json(p);
  } catch (err) { next(err); }
});

// PUT update
router.put('/:id', auth, (req, res, next) => {
  try {
    const id = req.params.id;
    const idx = projects.findIndex(p => p.id === id && p.owner === req.user.id);
    if(idx === -1) return res.status(404).json({ error: 'project not found' });
    const { title, description, status } = req.body;
    if(title !== undefined) projects[idx].title = title;
    if(description !== undefined) projects[idx].description = description;
    if(status !== undefined) projects[idx].status = status;
    res.json(projects[idx]);
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', auth, (req, res, next) => {
  try {
    const id = req.params.id;
    const idx = projects.findIndex(p => p.id === id && p.owner === req.user.id);
    if(idx === -1) return res.status(404).json({ error: 'project not found' });
    projects.splice(idx,1);
    res.json({ message: 'deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
