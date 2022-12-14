// const products = [
//     [
//         {id:5,name:'Queso'},
//         {id:6,name:'Yogurt'},
//         {id:8,name:'Mantequilla'},
//         {id:11,name:'Flan'},
//         {id:12, name:'Leche Condensada'}
//     ],
//     [
//         {id:7, name:'Papaya'},
//         {id:13, name:'Fresa'},
//         {id:14, name:'Mango'},
//         {id:15,name:"Patilla"}
//     ],
//     [
//         {id:1,name:'Almendras'},
//         {id:2,name:'Cebada'},
//         {id:3,name:'Arroz'},
//         {id:4,name:'Alforfón'},
//         {id:9,name:'Lenteja'},
//         {id:10,name:'Avena'},
//         {id:27,name:'Grabanzo'},
//         {id:28,name:'Quinua'},
//     ],
//     [
//         {id:22,	name:'Pechuga de pollo'},
//         {id:23,	name:'Carne de res'},
//         {id:24,	name:'Chuleta de cerdo'},
//         {id:25,	name:'Huevo'},
//         {id:26,	name:'Pescado'},
//     ],
//     [
//         {id:16,	name:'Jugo Hit'},
//         {id:17,	name:'Coca Cola'},
//         {id:18,	name:'Postobon'},
//         {id:19,	name:'Cuatro'},
//         {id:20,	name:'Fanta'},
//         {id:21,	name:'Tea'},
//     ],
//     [
//         {id:29,	name:'Apio'},
//         {id:30,	name:'Patata'},
//         {id:31,	name:'Cebolla'},
//         {id:32,	name:'Tomate'},
//         {id:33,	name:'Zanahoria'},
//         {id:34,	name:'Coliflor'},
//     ]
// ]

let products_data;

(async function getData() {
    const result = await fetch(`http://localhost:5000/get-products`)
        .then((response) => response.json())
        .then(function(data){
            return data
        });
    products_data = result.data;
})();

async function getProducts(id, data) {
    let products = [];
    for (let i = 0; i < products_data.length; i++) {
        if (products_data[i].category_id == id) {
            products.push(products_data[i]);
        }
    }
    return products;
}

const categoria = document.querySelector('#categoria')
categoria.addEventListener('change', addProducts)

async function addProducts(e) {
    const productos = document.getElementById('product_id');
    while (productos.firstChild) {
        productos.removeChild(productos.firstChild);
    }
    const index = e.target.value;
    let products = await getProducts(index);
    addOptions("product_id", products);
}

function addOptions(domElement, productos) {
    const selector = document.querySelector(`#${domElement}`)
    for (p in productos) {
        let opcion = document.createElement("option");
        opcion.text = productos[p].product_name;
        // Añadimos un value a los option para hacer mas facil escoger los pueblos
        opcion.value = productos[p].product_id;
        selector.appendChild(opcion);
    }
}
