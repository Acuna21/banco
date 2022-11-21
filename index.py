from flask import Flask, render_template, request, redirect,url_for,flash
from flask_mysqldb import MySQL

app=Flask(__name__)
# Conecion a mysql
app.config["MYSQL_HOST"]="localhost"
app.config["MYSQL_USER"]="root"
app.config["MYSQL_PASSWORD"]="SaraAcuña123"
app.config["MYSQL_DB"]="food_bank"
mysql=MySQL(app)

# Iniciar una sesion
app.secret_key = 'mysecretkey'

@app.route('/')
def home():
    cur=mysql.connection.cursor()
    cur.execute("SELECT*FROM data")
    data=cur.fetchall()
    return render_template("home.html", usuarios=data)

@app.route('/new-product', methods=['GET','POST'])
def new_product():
    if request.method=="POST":
        id_product=request.form["product_id"]
        quantity=request.form["cantidad"]
        expiration=request.form["expiracion"]
        weight=request.form["peso"]
        state=request.form["estado"]
        id_donor=request.form["donante"]
        description=request.form["descripcion"]        

        cur=mysql.connection.cursor()
        cur.execute("INSERT INTO product_detailed (name,quantity,last_date,expiration_date,category,wigth,state,description) VALUES (%s,%s,%s,%s,%s,%s,%s )",(id_product,quantity,expiration,weight,state,id_donor,description))

        mysql.connection.commit()
        flash("Dato guardado con éxito")
        return redirect(url_for("home"))
    if request.method=="GET":
        return render_template("new_product.html")


@app.route('/eliminar/<string:id>')
def eliminar(id):
    cur=mysql.connection.cursor()
    cur.execute("DELETE FROM data where id={0}".format(id))
    mysql.connection.commit()
    flash("Usuario eliminado")
    return redirect(url_for("home"))

@app.route('/editar/<string:id>',methods=['GET','POST'])
def editar(id):
    if request.method=="GET":
        cur=mysql.connection.cursor()
        cur.execute("SELECT*FROM data where id={0}".format(id))
        data=cur.fetchall()
        return render_template("editar.html", usuario=data[0])
    if request.method=="POST":
        name=request.form["name"]
        lastname=request.form["lastname"]
        cur=mysql.connection.cursor()
        cur.execute("""
        UPDATE data 
        SET name=%s,
        lastname=%s 
        WHERE id=%s
        """,(name, lastname,id))
        mysql.connection.commit()
        flash("Contacto actualizado") 
        return redirect(url_for("home"))  


if __name__=='__main__':
    app.run(debug=True)
