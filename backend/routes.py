from flask import Blueprint, request, jsonify
from models import (
    cadastrar_produto, listar_produtos, buscar_produto,
    registrar_venda, listar_vendas
)

api = Blueprint('api', __name__)


# ==================== ROTAS DE PRODUTOS ====================

@api.route('/produtos', methods=['GET'])
def get_produtos():
    """Lista todos os produtos em ordem alfabética."""
    produtos = listar_produtos()
    # Converte Decimal para float para serialização JSON
    for p in produtos:
        p['preco'] = float(p['preco'])
        if p.get('criado_em'):
            p['criado_em'] = str(p['criado_em'])
    return jsonify(produtos), 200


@api.route('/produtos', methods=['POST'])
def post_produto():
    """Cadastra um novo produto."""
    data = request.get_json()

    nome = data.get('nome', '').strip()
    preco = data.get('preco')
    quantidade = data.get('quantidade_estoque', 0)

    # Validações
    if not nome:
        return jsonify({'erro': 'Nome é obrigatório'}), 400
    if preco is None or float(preco) < 0:
        return jsonify({'erro': 'Preço deve ser um valor positivo'}), 400
    if int(quantidade) < 0:
        return jsonify({'erro': 'Quantidade não pode ser negativa'}), 400

    produto_id = cadastrar_produto(nome, float(preco), int(quantidade))
    if produto_id:
        return jsonify({
            'mensagem': 'Produto cadastrado com sucesso',
            'id': produto_id
        }), 201
    return jsonify({'erro': 'Erro ao cadastrar produto'}), 500


@api.route('/produtos/<int:produto_id>', methods=['GET'])
def get_produto(produto_id):
    """Busca um produto pelo ID."""
    produto = buscar_produto(produto_id)
    if not produto:
        return jsonify({'erro': 'Produto não encontrado'}), 404
    produto['preco'] = float(produto['preco'])
    if produto.get('criado_em'):
        produto['criado_em'] = str(produto['criado_em'])
    return jsonify(produto), 200


# ==================== ROTAS DE VENDAS ====================

@api.route('/vendas', methods=['POST'])
def post_venda():
    """Realiza uma venda: escolhe produto, define quantidade, calcula total."""
    data = request.get_json()

    produto_id = data.get('produto_id')
    quantidade = data.get('quantidade')

    if not produto_id:
        return jsonify({'erro': 'produto_id é obrigatório'}), 400
    if not quantidade or int(quantidade) <= 0:
        return jsonify({'erro': 'Quantidade deve ser maior que zero'}), 400

    resultado, erro = registrar_venda(int(produto_id), int(quantidade))
    if erro:
        return jsonify({'erro': erro}), 400
    return jsonify({
        'mensagem': 'Venda realizada com sucesso',
        'venda': resultado
    }), 201


@api.route('/vendas', methods=['GET'])
def get_vendas():
    """Lista todas as vendas."""
    vendas = listar_vendas()
    for v in vendas:
        v['total'] = float(v['total'])
        if v.get('data_venda'):
            v['data_venda'] = str(v['data_venda'])
    return jsonify(vendas), 200