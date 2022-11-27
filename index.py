from flask import Flask, render_template, request, redirect,url_for,flash
from flask_mysqldb import MySQL

app=Flask(__name__)
# Conecion a mysql
app.config["MYSQL_HOST"]="localhost"
app.config["MYSQL_USER"]="admin"
app.config["MYSQL_PASSWORD"]="admin"
app.config["MYSQL_DB"]="food_bank"
mysql=MySQL(app)

def obtener_donantes():
    cur1=mysql.connection.cursor()
    cur1.execute("SELECT name, id FROM donor")
    donantes=cur1.fetchall()
    cur1.close()
    return donantes

def obtener_categorias():
    cur1=mysql.connection.cursor()
    cur1.execute("SELECT name, id FROM categories")
    categorias=cur1.fetchall()
    cur1.close()
    return categorias

def obtener_productos():
    cur1=mysql.connection.cursor()
    cur1.execute("SELECT categories.id, product.id, product.name FROM categories, product WHERE categories.id=product.id_category")
    productos=cur1.fetchall()
    cur1.close()
    return productos

# Iniciar una sesion
app.secret_key = 'mysecretkey'

@app.route('/get-products')
def get_products():
    data=[]
    productos = obtener_productos()
    for producto in productos:
        data.append({"category_id":producto[0],"product_id":producto[1],"product_name":producto[2]})
    return {"data":data}

@app.route('/')
def home():
    cur=mysql.connection.cursor()
    cur.execute("""SELECT product_detailed.id, product.name, categories.name, product_detailed.quantity, product_detailed.expiration,product_detailed.weight,product_detailed.state,product_detailed.description FROM product INNER JOIN product_detailed ON product.id=product_detailed.id_product INNER JOIN categories ON categories.id=product.id_category;""")
    product_details=cur.fetchall()
    return render_template("home.html", details=product_details)

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
        cur.execute("INSERT INTO product_detailed (id_product,quantity,expiration,weight,state,id_donor,description, quantity_available) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",(id_product,quantity,expiration,weight,state,id_donor,description,quantity))
        mysql.connection.commit()
        cur.close()
        flash("Dato guardado con éxito")
        return redirect(url_for("home"))
    if request.method=="GET":
        donantes = obtener_donantes()
        categorias= obtener_categorias()
        my_list = list(categorias)
        print(my_list)
        return render_template("new_product.html",donantes=donantes,categorias=categorias)


@app.route('/eliminar/<string:id>')
def eliminar(id):
    cur=mysql.connection.cursor()
    cur.execute("DELETE FROM product_detailed where id={0}".format(id))
    mysql.connection.commit()
    flash("Producto eliminado")
    return redirect(url_for("home"))

@app.route('/editar/<string:id>',methods=['GET','POST'])
def editar(id):
    # Prueba con la base de datos testing y su unica tabla data 
    if request.method=="GET":
        cur=mysql.connection.cursor()
        cur.execute("SELECT*FROM product_detailed where id={0}".format(id))
        edit=cur.fetchall()
        cur.close()
        donantes = obtener_donantes()
        return render_template("editar.html", editar=edit[0], donantes=donantes)
    if request.method=="POST":
        quantity=request.form["cantidad"]
        expiration=request.form["expiracion"]
        weight=request.form["peso"]
        state=request.form["estado"]
        id_donor=request.form["donante"]
        description=request.form["descripcion"]  

        cur=mysql.connection.cursor()
        cur.execute("""
        UPDATE product_detailed
        SET expiration=%s,weight=%s,state=%s,id_donor=%s,description=%s, quantity_available=%s
        WHERE id=%s
        """,(expiration,weight,state,id_donor,description,quantity,id))
        mysql.connection.commit()
        flash("Producto actualizado") 
        return redirect(url_for("home"))  

if __name__=='__main__':
    app.run(debug=True)



