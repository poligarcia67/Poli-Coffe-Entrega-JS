var DatoInicial = document.getElementById("DivContenedor").innerHTML;//Leer valor 
document.getElementById("DivContenedor").innerHTML =`<main><h1 class="Title">Desde hoy todos nuestros productos estes donde estes!!</h1><div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators"><button type="button" data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
      aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
      aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="./images/slide1.jpg" class="d-block w-100" alt="Slide 1">
      <div class="carousel-caption d-none d-md-block">
        <h5><a href="productos.html" class="btn btn-primary botonComprar">Comprar</a></h5>
        <p class="text-slide">Ingresa y compra!.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="./images/slide2.png" class="d-block w-100" alt="slide 2">
      <div class="carousel-caption d-none d-md-block">
        <h5><a href="productos.html" class="btn btn-primary botonComprar">Comprar</a></h5>
        <p class="text-slide">Ingresa y compra!.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="./images/slide3.png" class="d-block w-100" alt="slide 3">
      <div class="carousel-caption d-none d-md-block">
        <h5><a href="productos.html" class="btn btn-primary botonComprar">Comprar</a></h5>
        <p class="text-slide">Ingresa y compra!.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
    data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
    data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<div id="DivContenedor">

</div>
<!--inicio de footer-->
<footer>
  <div>
    <span>
      <img src="./images/LogoFB.png" alt="Instagram">
      <img src="./images/LogoIG.png" alt="Facebok">
      <img src="./images/LogoTw.png" alt="eMail">
    </span>
  </div>
  <div class="marcafooter">
    <p>Desarrollado por Pablo Garcia</p>
  </div>
</footer>
</main>`;//Asignar valor 