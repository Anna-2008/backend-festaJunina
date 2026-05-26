// =============================================================
// data/database.js — Banco de Dados em Memória
// =============================================================
// Sistema de Correio Elegante - Festa Junina
// =============================================================

// ─── Categorias ───────────────────────────────────────────────

let categorias = [
    { id: 1, nome: 'Romântico' },
    { id: 2, nome: 'Engraçado' },
    { id: 3, nome: 'Amizade' },
    { id: 4, nome: 'Anônimo' }
]

// ─── Mensagens / Produtos ────────────────────────────────────
// Cada item representa um modelo de correio elegante.

let produtos = [

    {
        id: 1,
        categoriaId: 1,
        nome: 'Correio Romântico',
        descricao: 'Envie uma mensagem apaixonada para alguém especial.',
        preco: 5.00,
        imagem: 'romantico.png'
    },

    {
        id: 2,
        categoriaId: 2,
        nome: 'Correio Engraçado',
        descricao: 'Mande uma mensagem divertida para animar a festa.',
        preco: 5.00,
        imagem: 'engracado.png'
    },

    {
        id: 3,
        categoriaId: 3,
        nome: 'Correio de Amizade',
        descricao: 'Demonstre carinho e amizade durante o arraiá.',
        preco: 5.00,
        imagem: 'amizade.png'
    },

    {
        id: 4,
        categoriaId: 4,
        nome: 'Correio Anônimo',
        descricao: 'Envie uma mensagem misteriosa sem revelar seu nome.',
        preco: 7.00,
        imagem: 'anonimo.png'
    }
]

// ─── Mensagens enviadas ──────────────────────────────────────

let pedidos = [
    {
        id: 1,
        destinatario: 'Amanda',
        remetente: 'Anônimo',
        mensagem: 'Você iluminou minha festa! 🌽❤️',
        categoriaId: 4,
        status: 'enviado'
    }
]

// ─── Exportação ──────────────────────────────────────────────

module.exports = {
    categorias,
    produtos,
    pedidos
}