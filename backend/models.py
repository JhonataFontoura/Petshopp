from database import get_connection

# ================= PRODUTOS =================

def cadastrar_produto(nome, preco, quantidade):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO produtos (nome, preco, quantidade_estoque) VALUES (%s, %s, %s)",
        (nome, preco, quantidade)
    )

    conn.commit()
    produto_id = cursor.lastrowid

    cursor.close()
    conn.close()

    return produto_id


def listar_produtos():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM produtos ORDER BY nome ASC")
    produtos = cursor.fetchall()

    cursor.close()
    conn.close()

    return produtos


def buscar_produto(produto_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM produtos WHERE id = %s", (produto_id,))
    produto = cursor.fetchone()

    cursor.close()
    conn.close()

    return produto


# ================= VENDAS =================

def registrar_venda(produto_id, quantidade):
    produto = buscar_produto(produto_id)

    if not produto:
        return None, "Produto não encontrado"

    if produto['quantidade_estoque'] < quantidade:
        return None, "Estoque insuficiente"

    total = float(produto['preco']) * quantidade

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO vendas (produto_id, quantidade, total) VALUES (%s, %s, %s)",
        (produto_id, quantidade, total)
    )

    novo_estoque = produto['quantidade_estoque'] - quantidade

    cursor.execute(
        "UPDATE produtos SET quantidade_estoque = %s WHERE id = %s",
        (novo_estoque, produto_id)
    )

    conn.commit()

    venda_id = cursor.lastrowid

    cursor.close()
    conn.close()

    return {
        "venda_id": venda_id,
        "produto": produto['nome'],
        "total": total
    }, None


def listar_vendas():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT v.id, p.nome AS produto, v.quantidade, v.total, v.data_venda
        FROM vendas v
        JOIN produtos p ON v.produto_id = p.id
        ORDER BY v.data_venda DESC
    """)

    vendas = cursor.fetchall()

    cursor.close()
    conn.close()

    return vendas