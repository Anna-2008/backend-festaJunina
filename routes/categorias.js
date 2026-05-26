// =============================================================
// routes/categorias.js — Rotas de Categorias (Correio Elegante)
// =============================================================
// No server.js, registramos este router em '/api/categorias'.
// Como o banco Supabase pode não ter tabela de categorias,
// servimos as categorias estáticas do Correio Elegante.
// =============================================================
const express = require('express');
const router = express.Router();
// ─── Categorias do Correio Elegante ──────────────────────────
// Categorias estáticas que combinam com o frontend
const categoriasCorreio = [
    { id: 1, nome: 'Romântico', slug: 'romantico', preco: 5.00 },
    { id: 2, nome: 'Amizade',   slug: 'amizade',   preco: 5.00 },
    { id: 3, nome: 'Engraçado', slug: 'engracado',  preco: 5.00 },
    { id: 4, nome: 'Anônimo',   slug: 'anonimo',    preco: 7.00 },
];
// ─── [GET] /api/categorias ────────────────────────────────────
// Retorna a lista de categorias do correio elegante.
router.get('/', (req, res) => {
    res.json(categoriasCorreio);
});
// ─── [GET] /api/categorias/:slug ──────────────────────────────
// Retorna uma categoria específica pelo slug.
router.get('/:slug', (req, res) => {
    const cat = categoriasCorreio.find(
        c => c.slug === req.params.slug || c.id === Number(req.params.slug)
    );
    if (!cat) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada 🌽' });
    }
    res.json(cat);
});
module.exports = router;