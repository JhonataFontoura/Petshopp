import mysql.connector

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'petshop_db'
}

def get_connection():
    try:
        return mysql.connector.connect(**DB_CONFIG)
    except Exception as e:
        print("❌ ERRO AO CONECTAR:", e)
        raise e
    
