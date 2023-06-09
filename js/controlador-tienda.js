//Arreglo que almacena los productos agregados al carrito de compras 
var carrito = [];
var localStorage = window.localStorage;
var codTienda = localStorage.getItem('tiendaActual');
var clienteActual=JSON.parse(localStorage.getItem('clienteActual'));
var tienda;
let categorias = {};
let ropaMujer = [];
let ropaHombre = []; 
let zapatosMujer = []; 
let zapatosHombre = []; 
let accesoriosMujer = []; 
let accesoriosHombre = []; 



//Obteniendo empresas
const obtenerEmpresa = () => {
    fetch(`http://localhost:8000/empresas/${codTienda}`, {
        method: 'GET', 
        headers: {
            "Content-Type": "application/json", 
          }
        })
  .then(response => response.json())
  .then(result => {
    tienda=result; 
    console.log(result);
}) 
}
obtenerEmpresa(); 

//Obteniendo categorias de genero y producto 
const obtenercategorias = () => {
    fetch(`http://localhost:8000/categorias/${codTienda}`, {
        method: 'GET', 
        headers: {
            "Content-Type": "application/json", 
          }
        })
  .then(response => response.json())
  .then(result => {
    categorias=result; 
    console.log(result);
    mostrarTienda();
    renderizarNavbar();
    renderizarFooter();
    renderizarCategoriaMujer();
    renderizarCategoriaHombre()
}) 
}
obtenercategorias();

//Obteniendo productos por categorias (ropa, zapatos o accesorios)------------------------
const obtenerRopaMujer = () => {
    fetch(`http://localhost:8000/productos/${codTienda}fr`, {
        method: 'GET', 
        headers: {
            "Content-Type": "application/json", 
          }
        })
  .then(response => response.json())
  .then(result => {
    ropaMujer=result; 
    console.log(result);
    renderizarRopaMujer();
}) 
}
obtenerRopaMujer(); 

const obtenerZapatosMujer = () => {
    fetch(`http://localhost:8000/productos/${codTienda}fz`, {
        method: 'GET', 
        headers: {
            "Content-Type": "application/json", 
          }
        })
  .then(response => response.json())
  .then(result => {
    zapatosMujer=result; 
    console.log(result);
    renderizarZapatosMujer();
}) 
}
obtenerZapatosMujer(); 

const obtenerAccesoriosMujer = () => {
    fetch(`http://localhost:8000/productos/${codTienda}fa`, {
        method: 'GET', 
        headers: {
            "Content-Type": "application/json", 
          }
        })
  .then(response => response.json())
  .then(result => {
    accesoriosMujer=result; 
    console.log(result);
    renderizarAccesoriosMujer();
}) 
}
obtenerAccesoriosMujer();


function renderizarNavbar () {
    document.getElementById(`nav-${codTienda}`).innerHTML =
    `
    <i class="fas fa-bars"></i>
    <i class="fa-solid fa-angles-left" onclick="volverATiendas('index-cliente.html#3')" ></i>
        <i class="fas fa-user"></i>
    
    `
}

function renderizarFooter () {
    document.getElementById('foot-categorias').innerHTML =
    `
    <b style="color: #17382B;" >¡Siguenos!</b>
        <div class="redes-sociales">
            <i class="fab fa-instagram"></i>
            <i class="fab fa-tiktok"></i>
            <i class="fab fa-facebook"></i>
            <i class="fab fa-youtube"></i>
        </div>
        <div style="text-align: center;">
        <span>Política de Privacidad</span>
        <span> | Condiciones de compra</span>
        </div>
    `
}

function renderizarCategoriaMujer() {
    let mujer = categorias.categorias[0];
    document.getElementById('nav-catMujer').innerHTML =
    `
    <i class="fas fa-bars"></i>
            <i class="fa-solid fa-angles-left" onclick="mostrarSeccion(0)" ></i>
            <i class="fas fa-user"></i>
    `;
    document.getElementById('categoria-mujer').innerHTML =
    `
    <div>
    <img style="width:180px; height: 30px; margin: 2rem;"  src="./img/${tienda.logo}">
    </div>
    <div class="producto" style="background-image:url(./img/${mujer.ropa})"
     onclick=" mostrarProductos(3)">
        <h3>ROPA</h3>
    </div>
    <br>
    <div class="producto" style="background-image:url(./img/${mujer.zapatos})" onclick="  mostrarProductos(4)">
        <h3>ZAPATOS</h3>
    </div>
    <br>
    <div class="producto" style="background-image:url(./img/${mujer.accesorios})" onclick=" mostrarProductos(5)">
        <h3>ACCESORIOS</h3>
    </div>
    <br>
    `
}

function renderizarCategoriaHombre() {
    let hombre = categorias.categorias[1];
    document.getElementById('nav-catHombre').innerHTML =
    `
    <i class="fas fa-bars"></i>
            <i class="fa-solid fa-angles-left" onclick="mostrarSeccion(0)" ></i>
            <i class="fas fa-user"></i>
    `;
    document.getElementById('categoria-hombre').innerHTML =
    `
    <div>
    <img style="width:180px; height: 30px; margin: 2rem;"  src="./img/${tienda.logo}">
    </div>
    <div class="producto" style="background-image:url(./img/${hombre.ropa})"
     onclick=" mostrarProductos(3)">
        <h3>ROPA</h3>
    </div>
    <br>
    <div class="producto" style="background-image:url(./img/${hombre.zapatos}) onclik"mostrarProductos(4)">
        <h3>ZAPATOS</h3>
    </div>
    <br>
    <div class="producto" style="background-image:url(./img/${hombre.accesorios})" onclick=" obtenerProductos('${codTienda}ma'); mostrarProductos(5)">
        <h3>ACCESORIOS</h3>
    </div>
    <br>
    `
}

function mostrarTienda () {
    let estrellas = '';
    for (let i=0; i<tienda.calificacion; i++){
        estrellas += '<i class="fa-solid fa-star"></i> ';
    }
    for(let i=0; i<5-tienda.calificacion; i++){
        estrellas += '<i class="fa-regular fa-star"></i> ';
    }
    document.getElementById(codTienda). innerHTML = 
    `
    <div>
    <img style="width:180px; height: 30px; margin: 2rem;"  src="./img/${tienda.logo}" >
       </div>
       <div style="color:#FFBA00">
       ${estrellas}
       </div>
       <br>
       <div style="margin: 0 2rem; text-align:justify">
       <p>${tienda.descripcion}<p>
       </div>
       <br>
       <div >
       </div>
       <div class="genero" style="background-image:url(./img/${categorias.categorias[0].portada})" onclick="mostrarSeccion(1)">
           <h1>MUJER</h1>
       </div>
       <div class="genero" style="background-image:url(./img/${categorias.categorias[1].portada})" onclick="mostrarSeccion(2)">
           <h1>HOMBRE</h1>
    </div>
       <br>
    `
}

// Funciones de renderizado de productos-----------------------------------------------------------------
function renderizarRopaMujer() {
    
    document.getElementById('nav-catRopa').innerHTML =
    `
    <i class="fas fa-bars"></i>
    <i class="fa-solid fa-angles-left" onclick="atras(1)" ></i>
    <i class="fas fa-search"></i>
    `
    document.getElementById('encabezado-ropa').innerHTML =
        `
        <div style="text-align: center">
            <img style="width:180px; height: 30px; margin: 2rem"  src="./img/${tienda.logo}" >
        </div>
        <div class="contenedor-carrito">
        <h3>ROPA</h3> 
            <button onclick="mostrarCarrito()" type="button" class="btn btn-primary btn-carrito" >
                <i class="fa-solid fa-cart-shopping" ></i>
            </button> 
        </div>
        `;
    
    ropaMujer.forEach(p => {
        
        document.getElementById('ropa-mujer').innerHTML+=
        ` 
        <div class="card" style="width: 10rem;">
            <img src="./img/${p.imagen}" class="card-img-top" >
            <div class="card-body">
                <h6 class="card-title">${p.descripcion}</h6>
                <p class="card-text">${p.precio} HNL</p>
                <button type="button" class="btn btn-primary btn-comprar" onclick="agregarAlCarrito('${p._id}', (ropaMujer))">
                    comprar
                </button>
            </div>
        </div>
        `
        console.log("terror")
        ;
    });  
}

function renderizarZapatosMujer() {
    
    document.getElementById('nav-catZapatos').innerHTML =
    `
    <i class="fas fa-bars"></i>
    <i class="fa-solid fa-angles-left" onclick="atras(1)" ></i>
    <i class="fas fa-search"></i>
    `
    document.getElementById('encabezado-zapatos').innerHTML =
        `
        <div style="text-align: center">
            <img style="width:180px; height: 30px; margin: 2rem"  src="./img/${tienda.logo}" >
        </div>
        <div class="contenedor-carrito">
        <h3>ZAPATOS</h3> 
            <button type="button" class="btn btn-primary btn-carrito" onclick="mostrarCarrito()">
                <i class="fa-solid fa-cart-shopping" ></i>
            </button> 
        </div>
        `;
    
    zapatosMujer.forEach(p => {
        document.getElementById('zapatos-mujer').innerHTML+=
        ` 
        <div class="card" style="width: 10rem;">
            <img src="./img/${p.imagen}" class="card-img-top" >
            <div class="card-body">
                <h6 class="card-title">${p.descripcion}</h6>
                <p class="card-text">${p.precio} HNL</p>
                <button type="button" onclick="agregarAlCarrito('${p._id}', (zapatosMujer))" class="btn btn-primary btn-comprar" ">
                    comprar
                </button>
            </div>
        </div>
        `
        
    });  
}
renderizarZapatosMujer()

function renderizarAccesoriosMujer() {
    
    document.getElementById('nav-catAccesorios').innerHTML =
    `
    <i class="fas fa-bars"></i>
    <i class="fa-solid fa-angles-left" onclick="atras(1)" ></i>
    <i class="fas fa-search"></i>
    `;
    document.getElementById('accesorios-mujer').innerHTML =
        `
        <div style="text-align: center">
            <img style="width:180px; height: 30px; margin: 2rem"  src="./img/${tienda.logo}" >
        </div>
        <div class="contenedor-carrito">
        <h3>ACCESORIOS</h3> 
            <button type="button" class="btn btn-primary btn-carrito" onclick="mostrarCarrito()">
                <i class="fa-solid fa-cart-shopping" ></i>
            </button> 
        </div>
        `;
    
    accesoriosMujer.forEach(p => {
        document.getElementById('accesorios-mujer').innerHTML+=
        ` 
        <div class="card" style="width: 10rem;">
            <img src="./img/${p.imagen}" class="card-img-top" >
            <div class="card-body">
                <h6 class="card-title">${p.descripcion}</h6>
                <p class="card-text">${p.precio} HNL</p>
                <button type="button" onclick="agregarAlCarrito('${p._id}', (accesoriosMujer))" class="btn-primary btn btn-primary btn-comprar">
                    Comprar
                </button>
            </div>
        </div>
        `
      
    });  
}



function agregarAlCarrito(id, ropa){
    console.log(id);
    ropa.forEach(element => {
        if(element._id==id){
            producto=element;
            console.log(producto);
        }
    });
   
    let item = {
        producto: producto,
    

    };
    carrito.push(item);
}

//Nueva Orden

function registrarOrden(){
    let txtNombreCliente =  `${clienteActual.nombre} ${clienteActual.apellido}`; 
    let txtDireccion = document.getElementById('direccion-cliente').value; 
    let txtCiudad = document.getElementById('ciudad-cliente').value; 
    let txtTelefono = document.getElementById('telefono-cliente').value; 
    let txtTienda = tienda.nombreTienda; 
    let arrayItems = carrito; 
    let pendiente = ["tomada", "en camino", "en destino"]; 

    fetch('http://localhost:8000/ordenes', {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
           nombreCliente: txtNombreCliente,
           direccion: txtDireccion,
           ciudad: txtCiudad, 
           telefono: txtTelefono,
           tienda: txtTienda,
           items: arrayItems,
           disponible: true,
           pendiente: pendiente

        })
      })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      alert("Orden procesada!! porfavor estate pendiente a tu telefono")
    }) 
  }

  function mostrarCarrito() {
    window.location.href="./orden.html"
    carrito.forEach(c => {
        document.getElementById('ordenes-carrito').innerHTML+=
            `
            <p>Descripcion: ${c.descripcion}</p>
            <p>Precio: ${c.precio}</p>
            <br>
     `
    });
    window.location.href='orden.html'
    
    if(carrito.length>1){
    document.getElementById('ordenes').innerHTML+=
    '<button style="margin: 0 auto; display: block;" id="btnfinalizarCompra" type="button" class="btn-inicio-sesion" class="btn btn-primary" onclick="registrarOrden(); mostrarSeccion(1)">Finalizar compra</button>'
  }
}
