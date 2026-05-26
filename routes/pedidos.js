const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase');
// ─── [GET] /api/pedidos ──────────────────────────────────────
// Retorna todos os pedidos (correios elegantes).
// Mapeia os nomes das colunas do banco (destinatario/remetente)
// para os nomes que o frontend espera (para/de).
router.get('/', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .order('id', { ascending: false });
        if (error) throw error;
        // Mapeia os campos do banco para o formato do frontend
        const pedidos = data.map(p => ({
            id: p.id,
            categoria: p.categoria,
            de: p.remetente || '?',
            para: p.destinatario || '?',
            mensagem: p.mensagem,
            preco: p.preco,
            created_at: p.created_at
        }));
        res.json(pedidos);
    } catch (err) {
        next(err);
    }
});
// ─── [GET] /api/pedidos/:id ──────────────────────────────────
// Retorna um pedido específico por ID.
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (error) throw error;
        if (!data) {
            return res.status(404).json({ mensagem: 'Pedido não encontrado 🌽' });
        }
        res.json({
            id: data.id,
            categoria: data.categoria,
            de: data.remetente || '?',
            para: data.destinatario || '?',
            mensagem: data.mensagem,
            preco: data.preco,
            created_at: data.created_at
        });
    } catch (err) {
        next(err);
    }
});
// ─── [POST] /api/pedidos ─────────────────────────────────────
// Cria um novo pedido (correio elegante).
// O frontend envia: { categoria, de, para, mensagem, preco }
// O banco espera:   { categoria, remetente, destinatario, mensagem, preco }
router.post('/', async (req, res, next) => {
    try {
        const { categoria, de, para, mensagem, preco } = req.body;
        // Validação dos campos obrigatórios
        if (!para || !mensagem) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Destinatário e mensagem são obrigatórios! 🌽'
            });
        }
        // Mapeia os campos do frontend para o formato do banco
        const novoPedido = {
            destinatario: para,
            remetente: de || null,
            mensagem: mensagem,
            categoria: categoria || null,
            preco: preco != null ? Number(preco) : null
        };
        const { data, error } = await supabase
            .from('pedidos')
            .insert([novoPedido])
            .select();
        if (error) throw error;
        const pedidoSalvo = data[0];
        res.status(201).json({
            sucesso: true,
            mensagem: 'Pedido recebido com sucesso!',
            id: pedidoSalvo.id,
            pedido: {
                id: pedidoSalvo.id,
                categoria: pedidoSalvo.categoria,
                de: pedidoSalvo.remetente,
                para: pedidoSalvo.destinatario,
                mensagem: pedidoSalvo.mensagem,
                preco: pedidoSalvo.preco,
                created_at: pedidoSalvo.created_at
            }
        });
    } catch (err) {
        next(err);
    }
});
// ─── [DELETE] /api/pedidos/:id ────────────────────────────────
// Remove um pedido por ID.
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('pedidos')
            .delete()
            .eq('id', id);
        if (error) throw error;
        res.json({ mensagem: 'Pedido removido com sucesso! 🌽🔥' });
    } catch (err) {
        next(err);
    }
});
module.exports = router;