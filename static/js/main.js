const categories = [
    {
        index: 0,
        name: "lacteos"
    },
    {
        index: 1,
        name: "frutas"
    },
    {
        index: 2,
        name: "granos"
    },
    {
        index: 3,
        name: "proteinas"
    },
    {
        index: 4,
        name: "bebidas"
    },
    {
        index: 5,
        name: "verduras"
    }
]

const products = [
    [
        {
            id: 0,
            name: 'Queso'
        },
        {
            id: 1,
            name: 'Leche'
        },
        {
            id: 2,
            name: 'Mantequilla'
        },
        {
            id: 3,
            name: 'Yogurt'
        },
    ],
    [
        {
            id: 4,
            name: 'Pera'
        },
        {
            id: 5,
            name: 'Manzana'
        },
        {
            id: 6,
            name: 'Papaya'
        },
        {
            id: 7,
            name: 'Patilla'
        },
    ],
    [
        {
            id: 8,
            name: 'Lentaja'
        },
        {
            id: 9,
            name: 'Arroz'
        },
        {
            id: 10,
            name: 'Zaragoza'
        },
        {
            id: 11,
            name: 'Harina de trigo'
        },
    ],
    [
        {
            id: 12,
            name: 'Huevo'
        },
        {
            id: 13,
            name: 'Carne de Res'
        },
        {
            id: 14,
            name: 'Pollo'
        },
        {
            id: 15,
            name: 'Pescado'
        },
    ],
    [
        {
            id: 16,
            name: 'Coca-Cola'
        },
        {
            id: 17,
            name: 'Quatro'
        },
        {
            id: 18,
            name: 'Hit'
        },
        {
            id: 19,
            name: 'Postobon'
        },
    ],
    [
        {
            id: 20,
            name: 'Tomate'
        },
        {
            id: 21,
            name: 'Cebolla'
        },
        {
            id: 22,
            name: 'Lechiga'
        },
        {
            id: 23,
            name: 'Espinaca'
        },
    ],
]

const agregarProducto = document.querySelector('#agregarProducto')
agregarProducto.addEventListener("click",func)

const categoria = document.querySelector('#categoria')
categoria.onload = loadCategories()
categoria.addEventListener('change', addProducts)

function func() {
    location.href='/new-product'
}

async function addProducts(e) {
    const productos = document.getElementById('product_id')
    while (productos.firstChild) {
        productos.removeChild(productos.firstChild);
    }
    const index = e.target.value;
    addOptions("product_id", products[index]);
}

function loadCategories() {
    addOptions("categoria", categories)
}

function addOptions(domElement, array) {
    const selector = document.querySelector(`#${domElement}`)
    for (a in array) {
        let opcion = document.createElement("option");
        opcion.text = array[a].name;
        // Añadimos un value a los option para hacer mas facil escoger los pueblos
        opcion.value = array[a].index;
        selector.appendChild(opcion);
    }
}
