let productos = [];
$.ajax({
  url: "./data/data.json",
  dataType: "json",
  success: (respuesta) => {
    cargarProductos(respuesta);
  },
});



const cargarProductos = (respuesta) => {
  productos = respuesta;
  const contenedor = document.getElementById("container");
  contenedor.innerHTML = "";

  productos.forEach((producto, indice) => {
    let card = document.createElement("div");
    card.classList.add("card", "col-sm-12", "col-lg-3");
    let html = `
    <img src="${producto.imagen}" id="img" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">${producto.descripcion}</p>
      <h3 class="card-text text-slide"> $${producto.precio}</h3>
      <a href="#cart" id="Btn" class="btn btn-primary" onClick="agregarAlCarrito(${indice})">Comprar</a> 
      <div class="detalle">
      <button class="btn2 btn-danger"> Mostrar Detalle</button>
      <button class="btn1 btn-danger"> Ocultar Detalle</button>
      </div>
      </div>
      `;
    card.innerHTML = html;
    contenedor.appendChild(card); // fin de la creacion de las card
   
  });


  $(document).ready(function(){
    $(".btn1").click(function(){
      $(".card-text").fadeOut();
    });
    $(".btn2").click(function(){
      $(".card-text").fadeIn();
    });
  }); 
  
  let toastTrigger = document.getElementById('btn')
let toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', function () {
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
  })
}

  
};

const abrirCarrito = document.getElementById("open-cart");
const cerrarCarrito = document.getElementById("close-cart");
const carritoContainer = document.getElementsByClassName("cart-container")[0];

abrirCarrito.addEventListener("click", () => {
  carritoContainer.classList.add("cart-opened");
});

cerrarCarrito.addEventListener("click", () => {
  carritoContainer.classList.remove("cart-opened");
});

let modalCarrito = document.getElementById("cartProducts");

const dibujarCarrito = () => {
  let total = 0;
  let cantidadCarrito = 0;
  modalCarrito.className = "cart";
  modalCarrito.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((producto, indice) => {
      total = total + producto.precio * producto.cantidad;
      cantidadCarrito = cantidadCarrito + producto.cantidad;
      const carritoContainer = document.createElement("div");
      carritoContainer.className = "producto-carrito";
      carritoContainer.innerHTML = `
        <img class="car-img img-Carrito" src="${producto.imagen}"/>
        <div class="product-details">
          ${producto.nombre}
        </div>
        <div class="product-details text-slide" > Cantidad: ${producto.cantidad}</div>
        <div class="product-details text-slide"> Precio: $ ${producto.precio}</div>
        <div class="product-details text-slide "> Subtotal: $ ${
          producto.precio * producto.cantidad
        }</div>
        <div class="elim-Producto">
        <button class="btn btn-danger"  id="remove-product" onClick="removeProduct(${indice})">Eliminar producto</button></div>
         `;
      modalCarrito.appendChild(carritoContainer);
    });
    // Dibujo el total y lo dibuja en el div capturado y guardado en la variable modalCarrito

    const totalContainer = document.createElement("div");
    totalContainer.className = "total-carrito";
    totalContainer.innerHTML = `<div class= "total"> TOTAL $ ${total}</div>
    </div>
    <button class= "btn btn-secondary finalizar" id="finalizar" onClick="finalizarCompra()"> Finalizar Compra </button>`;
    modalCarrito.appendChild(totalContainer);

    const contadorCarrito = document.getElementById("count__cart");
    contadorCarrito.innerHTML = cantidadCarrito;
    contadorCarrito.style.display = "inline-block";
  } else {
    modalCarrito.classList.remove("cart");

    const contadorCarrito = document.getElementById("count__cart");
    contadorCarrito.style.display = "none";
  }
};

let cart = [];
// si existen datos en el local storage hago la carga inicial desde local storage.
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
  dibujarCarrito();
}

const agregarAlCarrito = (indiceDelArrayProducto) => {
  //findIndex  es la que devuelve el indice del elemento encontrado
  // si no encuentra nada devuelve menos 1 (-1)
  const indiceEncontradoCarrito = cart.findIndex((elemento) => {
    return elemento.id === productos[indiceDelArrayProducto].id;
  });
  if (indiceEncontradoCarrito === -1) {
    //agrego el producto
    const productoAgregar = productos[indiceDelArrayProducto];
    productoAgregar.cantidad = 1;
    cart.push(productoAgregar);
    actualizarStorage(cart);
    dibujarCarrito();
    //alerta de notificacion
    Swal.fire({
      toast: 'true',
      iconColor: 'green',
      color: 'white',
      background: 'rgba(13, 109, 253, 0.893)',
      position:'bottom-end',
      icon: 'success',
      title: 'Se agrego el producto al carrito',
      showConfirmButton: false,
      timer: 1500
    })
  } else {
    //incremento cantidad
    cart[indiceEncontradoCarrito].cantidad += 1;
    actualizarStorage(cart);
    dibujarCarrito();    
    //alerta de notificacion
    Swal.fire({
      toast: 'true',
       color: 'white',
       iconColor: 'green',
      background: 'rgba(13, 109, 253, 0.893)',
      position:'bottom-end',
      icon: 'success',
      title: 'Se agrego el producto al carrito',
      showConfirmButton: false,
      timer: 1500
    })
  }

};

const removeProduct = (indice) => {
  cart.splice(indice, 1);
  actualizarStorage(cart);
  dibujarCarrito();
  if (cart.length === 0) {
    carritoContainer.classList.remove("cart-opened");
  }
};
const finalizarCompra = () => {
  const botonSeguirComprando = document.getElementById("close-cart");
  botonSeguirComprando.classList.add("removeButton");

  const total = document.getElementsByClassName("total")[0].innerHTML;
  modalCarrito.innerHTML = "";
  const compraFinalizada = `<div class="datos-cliente">
  <p class="datos-parrafo"> Complete el formulario con sus datos para coordinar la entrega</p>
  <button class= "btn btn-danger formulario" id="formulario" onClick="dibujarFormu()"> Formulario </button>
  </div>`;
  modalCarrito.innerHTML = compraFinalizada;
};
const dibujarFormu = () => {
  modalCarrito.innerHTML = "";
  const formulario = `
  <h2> Datos de Envio y Pago </h2>
  <div class="contact__secction-container">
   <div class="row">
     <div class="contact__secction__item text-slide">
       <label for="nombre">Nombre</label>
       <input type="text" id="nombre" placeholder="Nombre"  />
     </div>
     <div class="contact__secction__item text-slide">
       <label>E-mail</label>
       <input type="email" name="email" id="email" placeholder="Contacto@contacto.com">
     </div>
     <div class="contact__secction__item text-slide">
       <label>Telefono</label>
       <input type="number" id="telefono" maxlength="10" placeholder="1140641006">
     </div>
     <div class="contact__secction__item text-slide">
       <label>Domicilio</label>
       <input type="text" id="domicilio" placeholder="Av. Mitre 1400">
     </div>
     <div class="tarjeta">
      <div class="contact__secction__item text-slide">
       <label>N° de Tarjeta</label>
       <input type="number" id="tarjet" placeholder="1234 5678 0987 0976">
      </div>
        <div class="contact__secction__item text-slide" >
        <label>F.Venc.</label>
        <input type="month" name="fecha" id="venci" class="vencimiento">
        </div>
          <div class="contact__secction__item text-slide">
          <label>Cod. Seg.</label>
          <input type="password" id="codSeg" class="codSeguridad" placeholder="123" maxlength="3"required >
       </div>
    </div>
     <div class="contact-button">
       <button type="button" class="btn btn-danger envio formulario" onClick="mostrarMensaje()" >Confirmar</button>
     </div>
   </div>
 </div>`;
  modalCarrito.innerHTML = formulario;
};


const mostrarMensaje = () => {
  const nombreCliente = document.getElementById("nombre").value;
  const domicilioCliente = document.getElementById("domicilio").value;
  const telefonoCliente = document.getElementById("telefono").value;
  const emailCliente = document.getElementById("email").value;
  const tarjetaCliente = document.getElementById("tarjet").value;
  const vencimiento = document.getElementById("venci").value;
  const codigoSeguridad = document.getElementById("codSeg").value;

  if (nombre.value === null || nombre.value === ""){
    window.alert ("Debe ingresar su Nombre")
    modalCarrito.innerHTML = mensaje;
  }
  if (email.value === null || email.value === ""){
    window.alert ("Debe ingresar su Casilla de correo electronico")
    modalCarrito.innerHTML = mensaje;
  }
  if (telefono.value === null || telefono.value === ""){
    window.alert ("Debe ingresar su Telefono")
    modalCarrito.innerHTML = mensaje;
  }  
  if (domicilio.value === null || domicilio.value === ""){
    window.alert ("Debe ingresar su Domicilio")
    modalCarrito.innerHTML = mensaje;
  }  
  if (tarjet.value === null || tarjet.value === ""){
    window.alert ("Debe ingresar su Tarjeta")
    modalCarrito.innerHTML = mensaje;
  }
  if (venci.value === null || venci.value === ""){
    window.alert ("Debe ingresar una fecha de vencimiento")
    modalCarrito.innerHTML = mensaje;
  }  
  if (codSeg.value === null || codSeg.value === ""){
    window.alert ("Debe ingresar el codigo de seguridad")
    modalCarrito.innerHTML = mensaje;
  }  


  modalCarrito.innerHTML = "";
  let mensaje = `<div class="mensaje-final"><p>Gracias ${nombreCliente} por tu compra! cuando tu pedido este saliendo te llamaremos al numero ${telefonoCliente} <br> Recibira tu pedido en ${domicilioCliente}</p><br><p class="text-slide">Importante:</p><p> El comprobante de la Compra lo recibiras en ${emailCliente}</p><br> 
  <button type="button" class="btn btn-primary envio" onClick="volverATienda()" >Volver a la tienda</button> 
  </div>`;
  modalCarrito.innerHTML = mensaje;
  
};


const volverATienda = () => {
  carritoContainer.classList.remove("cart-opened");
  const contadorCarrito = document.getElementById("count__cart");
  contadorCarrito.style.display = "none";
  cart = [];
  actualizarStorage(cart);
  dibujarCarrito();
};

const actualizarStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

