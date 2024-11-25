from flask import Flask, request, jsonify
import pymysql, hashlib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# MySQL connection details
mysql_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'jc_db'
}

def sha256(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# Function to create a MySQL connection
def get_db_connection():
    connection = pymysql.connect(
        host=mysql_config['host'],
        user=mysql_config['user'],
        password=mysql_config['password'],
        database=mysql_config['database']
    )
    return connection

@app.route("/insert", methods=["POST"])
def insertData():
    try:
        # Get data from the JSON request
        data = request.get_json()
        name = data['name']
        age = data['age']

        # Create a connection to the database
        connection = get_db_connection()
        cursor = connection.cursor()

        # Insert the data into MySQL
        query = "INSERT INTO your_table_name (name, age) VALUES (%s, %s)"
        cursor.execute(query, (name, age))
        connection.commit()

        # Close the connection
        cursor.close()
        connection.close()

        return jsonify({"message": "Data inserted successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/update", methods=["POST"])
def updateData():
    try:
        # Get data from the JSON request
        data = request.get_json()
        user_id = data['id']
        name = data['name']
        age = data['age']

        # Create a connection to the database
        connection = get_db_connection()
        cursor = connection.cursor()

        # Update the data in MySQL
        query = "UPDATE your_table_name SET name = %s, age = %s WHERE id = %s"
        cursor.execute(query, (name, age, user_id))
        connection.commit()

        # Close the connection
        cursor.close()
        connection.close()

        return jsonify({"message": "Data updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/delete", methods=["POST"])
def deleteData():
    try:
        # Get data from the JSON request
        data = request.get_json()
        user_id = data['id']

        # Create a connection to the database
        connection = get_db_connection()
        cursor = connection.cursor()

        # Delete the data from MySQL
        query = "DELETE FROM your_table_name WHERE id = %s"
        cursor.execute(query, (user_id,))
        connection.commit()

        # Close the connection
        cursor.close()
        connection.close()

        return jsonify({"message": "Data deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/retrieve", methods=["GET"])
def retrieveData():
    try:
        # Create a connection to the database
        connection = get_db_connection()
        cursor = connection.cursor()

        # Retrieve data from MySQL
        query = "SELECT * FROM your_table_name"
        cursor.execute(query)
        result = cursor.fetchall()

        # Close the connection
        cursor.close()
        connection.close()

        # Return the retrieved data as a JSON response
        data = [{"id": row[0], "name": row[1], "age": row[2]} for row in result]
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/signup", methods=["POST"])
def signup():
    try:
        return jsonify({"status": "approved"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/login", methods=["POST"])
def login():
    try:
        connection = get_db_connection()
        data = request.get_json()
        email = data["email"]
        password = data["password"]

        # Hash the input password
        hashed_password = sha256(password)

        #Get admin account
        cursor = connection.cursor()
        query = "SELECT * FROM admin_account WHERE admin_email = %s AND admin_password = %s"
        cursor.execute(query, (email, hashed_password))

        #Get employer account
        cursor1 = connection.cursor()
        query1 = "SELECT * FROM employer_account WHERE email = %s AND password = %s"
        cursor1.execute(query1, (email, hashed_password))

        #Get employer account
        cursor1 = connection.cursor()
        query1 = "SELECT * FROM employer_account WHERE email = %s AND password = %s"
        cursor1.execute(query1, (email, hashed_password))

        #Get applicant account
        cursor2 = connection.cursor()
        query2 = "SELECT * FROM applicant_account WHERE email = %s AND password = %s"
        cursor2.execute(query2, (email, hashed_password))

        result = cursor.fetchone()
        result1 = cursor1.fetchone()
        result2 = cursor2.fetchone()

        if result:
            return jsonify({"role": "admin"})
        elif result1:
            return jsonify({"role": "employer"})
        elif result2:
            return jsonify({"role": "applicant"})
        else:
            return jsonify({"code": 401})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)