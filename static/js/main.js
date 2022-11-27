const agregarProducto = document.querySelector('#agregarProducto')
agregarProducto.addEventListener("click",func)
function func() {
    location.href='/new-product'
}

const btnDelete = document.querySelectorAll('.btn-delete');
if (btnDelete) {
    const btnArray = Array.from(btnDelete);
    btnArray.forEach(btn => {
        btn.addEventListener('click',(e)=>{
            if (!confirm('Seguro que quieres eliminar este producto')) {
                e.preventDefault();
            }
        });
    })
}

const newProductButton = document.querySelector('#newProductButton')
if (newProductButton){
    newProductButton.addEventListener("click",validate)
}

const categoriaSelector = document.querySelector('#categoria');
const estadoSelector = document.querySelector('#estado');
const donanteSelector = document.querySelector('#donante');

function validate(e) {
    
    if (categoriaSelector.value === '-1' ) {
        console.log('categoria')
        categoriaSelector.setCustomValidity("Opcion no valida")
    } else {
        categoriaSelector.setCustomValidity("")
    }


    if (estadoSelector.value === "-1" ) {
        estadoSelector.setCustomValidity("Opcion no valida")
    }else{
        estadoSelector.setCustomValidity("")
    }


    if (donanteSelector.value === "-1" ) {
        donanteSelector.setCustomValidity("Opcion no valida")
    }else{
        donanteSelector.setCustomValidity("")
    }
}