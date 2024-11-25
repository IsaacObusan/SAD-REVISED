from flask import Flask, request, jsonify
import pymysql

app = Flask(__name__)

# MySQL connection details
mysql_config = {
    'host': 'localhost',
    'user': 'your_username',
    'password': 'your_password',
    'database': 'your_database'
}

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

        return jsonify({"message": "Data deleted successfully"}), 200
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
    pass

@app.route("/login", methods=["POST"])
def login():
    pass

if __name__ == "__main__":
    app.run(debug=True)