from flask import Flask, request, jsonify, session
import pymysql, hashlib, os
from flask_cors import CORS
from datetime import datetime
from flask_session import Session


app = Flask(__name__)

from flask_session import Session
from datetime import timedelta

app.config['SESSION_PERMANENT'] = True
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=5)

# The maximum number of items the session stores 
# before it starts deleting some, default 500
app.config['SESSION_FILE_THRESHOLD'] = 100  

app.config['SECRET_KEY'] = os.urandom(24).hex()

sess = Session()
sess.init_app(app)

CORS(app,  supports_credentials=True)  # This will enable CORS for all routes

# MySQL connection details
mysql_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'jc_db'
}

def set_session(email):
    session["email"] = email

def get_current_date():
    current_date = datetime.now().strftime('%Y-%m-%d')
    return current_date

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

@app.route("/apply", methods=["POST"])
def insertData():
    try:
        data = request.get_json()
        _id = data['id']
        title = data['title']
        content = data['content']
        job_id = data["job_id"]

        # Create a connection to the database
        connection = get_db_connection()
        cursor = connection.cursor()

        # Insert the data into MySQL
        query = "INSERT INTO application (application_title, application_content, application_date, applicant,applicant_target) VALUES (%s, %s,%s,%s, %s)"
        cursor.execute(query, (title, content, get_current_date(), _id, job_id))
        connection.commit()

        # Close the connection
        cursor.close()
        connection.close()

        return jsonify({"remarks": "success"}), 200
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

@app.route("/retrieve_job", methods=["GET"])
def retrieveData():
    try:
        # Create a connection to the database
        connection = get_db_connection()
        cursor = connection.cursor()

        # Retrieve data from MySQL
        query = "SELECT job_name, job_desc, job_rate, b.employer_company, b.company_image, c.*, job_id FROM job_hiring a JOIN employer b ON a.job_employer = b.employer_id JOIN address c ON b.employer_address_id = c.address_id;"
        cursor.execute(query)
        result = cursor.fetchall()

        # Close the connection
        cursor.close()
        connection.close()

        # Return the retrieved data as a JSON response
        data = [{"jobId": row[-1], "jobName": row[0], "jobDesc": row[1], "jobRate": row[2],"jobCompany": row[3], "jobLogo": row[4],"jobMuni": row[9], "jobProvince": row[10]} for row in result]
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route("/retrieve_employer", methods=["GET"])
def retrieveEmployer():
    try:
        # Create a connection to the database
        connection = get_db_connection()
        cursor = connection.cursor()

        # Retrieve data from MySQL
        query = "SELECT * FROM employer"
        cursor.execute(query)
        result = cursor.fetchall()

        # Close the connection
        cursor.close()
        connection.close()

        # Return the retrieved data as a JSON response
        data = [{"empName": row[1], "empAge": row[2],"empCom": row[4], "comImage": row[5]} for row in result]
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
        query1 = "SELECT * FROM employer_account a JOIN employer b ON a.employer_acc_id = b.employer_id WHERE email = %s AND password = %s AND status = 'Active'"
        cursor1.execute(query1, (email, hashed_password))

        #Get applicant account
        cursor2 = connection.cursor()
        query2 = "SELECT * FROM applicant_account a JOIN applicant b ON a.applicant_acc_id = b.applicant_id WHERE a.email = %s AND a.password = %s AND status = 'Active'"
        cursor2.execute(query2, (email, hashed_password))

        result = cursor.fetchone()
        result1 = cursor1.fetchone()
        result2 = cursor2.fetchone()

        if result:
            set_session(email)
            return jsonify({"role": "admin"})
        elif result1:
            set_session(email)
            return jsonify({"role": "employer", "id": result1[0], "name": result1[8]})
        elif result2:
            set_session(email)
            return jsonify({"role": "applicant", "id": result2[0],"name": result2[8]})
        else:
            return jsonify({"code": 401})

    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 400
    
@app.route("/jobs", methods=["GET", "POST"])
def setJobs():
    if request.method == "POST":
        try:
            connection = get_db_connection()
            data = request.get_json()
            employer_id = data["id"]
            cursor = connection.cursor()
            query = "SELECT a.job_id, a.job_name, a.job_desc, a.job_status, b.company_image, a.job_rate FROM job_hiring a JOIN employer b ON a.job_employer = b.employer_id WHERE b.employer_id = %s"
            cursor.execute(query,  (employer_id,))
            result = cursor.fetchall()
            if len(result) > 0:
                return jsonify({"job_dets": result})
            else:
                return jsonify({"code": 405})
        except Exception as e:
            print(str(e))
            return jsonify({"error": str(e)}), 400
    else:
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            query = "SELECT a.job_id, a.job_name, a.job_desc, CONCAT_WS(' ', house_num, street, baranggay, municipality, province, zip_code) AS concatenated_values ,a.job_rate, a.job_status, a.job_postDate FROM job_hiring a JOIN employer b ON a.job_employer = b.employer_id JOIN address c ON b.employer_address_id = c.address_id"
            cursor.execute(query)
            result = cursor.fetchall()
            if len(result) > 0:
                return jsonify({"job_details": result})
            else:
                return jsonify({"code": 405})
        except Exception as e:
            print(str(e))
            return jsonify({"error": str(e)}), 400
    
    
@app.route("/applications", methods=["GET", "POST"])
def getApplication():
    if request.method == "POST":
        try:
            connection = get_db_connection()
            data = request.get_json()
            application_id = data["id"]
            cursor = connection.cursor()
            query = "SELECT c.applicant_name, c.applicant_age, c.applicant_disability, a.application_title, a.application_content, a.application_date, a.application_status, a.application_num FROM application a JOIN job_hiring b ON a.applicant_target = b.job_id JOIN applicant c ON a.applicant = c.applicant_id WHERE b.job_employer = %s"
            cursor.execute(query,  (application_id,))
            result = cursor.fetchall()
            if len(result) > 0:
                return jsonify({"application_dets": result})
            else:
                return jsonify({"code": 405})
        except Exception as e:
            print(str(e))
            return jsonify({"error": str(e)}), 400
    else:
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            query = "SELECT a.application_num, a.application_title, a.application_content, a.application_date, a.application_status, b.applicant_name, c.job_name FROM application a JOIN applicant b ON a.applicant = b.applicant_id JOIN job_hiring c ON c.job_id = a.applicant_target"
            cursor.execute(query)
            result = cursor.fetchall()
            if len(result) > 0:
                return jsonify({"application_details": result})
            else:
                return jsonify({"code": 405})
        except Exception as e:
            print(str(e))
            return jsonify({"error": str(e)}), 400

@app.route("/get_notice", methods=["GET"])
def fetchNotice():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        query = "SELECT a.notice_num, a.notice_title, a.notice_content, b.applicant_name ,a.notice_date, c.employer_name FROM hiring_notice a JOIN applicant b ON a.notice_applicant = b.applicant_id JOIN employer c ON a.notice_employer = c.employer_id "
        cursor.execute(query)
        result = cursor.fetchall()
        if len(result) > 0:
            return jsonify({"notice_details": result})
        else:
            return jsonify({"code": 405})
    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 400

@app.route('/post_job', methods=["POST"])
def postJob():
    try:
        data = request.get_json()
        _id = data['id']
        title = data['title']
        desc = data['desc']
        salary = data['job']
        formatted_salary = f"₱{salary}"

        # Create a connection to the database
        connection = get_db_connection()
        cursor = connection.cursor()

        # Insert the data into MySQL
        query = "INSERT INTO job_hiring (`job_name`,`job_desc`,`job_postDate`,`job_employer`,`job_rate`) VALUES (%s,%s,%s,%s,%s)"
        cursor.execute(query, (title, desc, get_current_date(), _id, formatted_salary))
        connection.commit()
        

        # Close the connection
        cursor.close()
        connection.close()

        return jsonify({"remarks": "success"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/get_pie", methods=["POST"])
def getPie():
    try:
        connection = get_db_connection()
        data = request.get_json()
        application_id = data["id"]

        cursor = connection.cursor()
        query = "SELECT c.applicant_name, c.applicant_age, c.applicant_disability, a.application_title, a.application_content, a.application_date, a.application_status, a.application_num FROM application a JOIN job_hiring b ON a.applicant_target = b.job_id JOIN applicant c ON a.applicant = c.applicant_id WHERE b.job_employer = %s"
        cursor.execute(query,  (application_id,))

        result = cursor.fetchall()

        if len(result) > 0:
            return jsonify({"application_dets": result})
        else:
            return jsonify({"code": 405})

    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 400

@app.route("/get_user", methods=["POST"])
def getUser():
    try:
        connection = get_db_connection()
        data = request.get_json()
        type = data["type"]

        cursor = connection.cursor()
        if(type == "applicant"):
            query = "SELECT a.account_id, b.applicant_name, b.applicant_age, CONCAT_WS(' ', house_num, street, baranggay, municipality, province, zip_code) AS concatenated_values, b.applicant_disability, a.date_created, a.status, a.email, a.image FROM applicant_account a JOIN applicant b ON a.applicant_acc_id = b.applicant_id JOIN address c ON c.address_id = b.applicant_address_id"
        else:
            query = "SELECT a.account_id, b.employer_name, b.employer_age, CONCAT_WS(' ', house_num, street, baranggay, municipality, province, zip_code) AS concatenated_values, a.date_created, a.status, a.email, a.image FROM employer_account a JOIN employer b ON a.employer_acc_id = b.employer_id JOIN address c ON c.address_id = b.employer_address_id"
        cursor.execute(query)

        result = cursor.fetchall()

        if len(result) > 0:
            return jsonify({"users": result})
        else:
            return jsonify({"code": 405})

    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 400

@app.route('/logout')
def logout():
    session.pop('email', None)
    return 'You have been logged out'

if __name__ == "__main__":
    app.run(debug=True)