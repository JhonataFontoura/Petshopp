import mysql.connector

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '123456Gg@',
    'database': 'petshop_db'
}

def get_connection():
    try:
        return mysql.connector.connect(**DB_CONFIG)
    except Exception as e:
        print("Erro:", e)
        return None