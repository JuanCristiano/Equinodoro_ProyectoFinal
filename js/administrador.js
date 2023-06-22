class Libro {
    constructor(titulo, autor, sinopsis, editorial, edicion, isbn, precio, stock, tematica, imagen) {
      this.titulo = titulo;
      this.autor = autor;
      this.sinopsis = sinopsis;
      this.editorial = editorial;
      this.edicion = edicion;
      this.isbn = isbn;
      this.precio = precio;
      this.stock = stock;
      this.tematica = tematica;
      this.fechaIngreso = new Date();
      this.fechaActualizacion = new Date();
      this.imagen = imagen;
    }
  }
  
  class Articulo {
    constructor(nombre, proveedor, descripcion, numeroSerie, stock, tematica, imagen) {
      this.nombre = nombre;
      this.proveedor = proveedor;
      this.descripcion = descripcion;
      this.numeroSerie = numeroSerie;
      this.stock = stock;
      this.tematica = tematica;
      this.fechaIngreso = new Date();
      this.fechaActualizacion = new Date();
      this.imagen = imagen;
    }
  }
  
  const libros = JSON.parse(localStorage.getItem("libros")) || [];
  const articulos = JSON.parse(localStorage.getItem("articulos")) || [];
  
  const crearLibro = () => {
    const crearLibroForm = document.querySelector("#crearItem1");
    crearLibroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const titulo = e.target.elements.titulo.value;
      const autor = e.target.elements.autor.value;
      const sinopsis = e.target.elements.sinopsis.value;
      const editorial = e.target.elements.editorial.value;
      const edicion = e.target.elements.edicion.value;
      const isbn = e.target.elements.isbn.value;
      const precio = e.target.elements.precio.value;
      const stock = e.target.elements.stock.value;
      const tematica = e.target.elements.tematica.value;
      const imagen = e.target.elements.imagen.files[0];
  
      const libro = new Libro(titulo, autor, sinopsis, editorial, edicion, isbn, precio, stock, tematica, imagen);
      libros.push(libro);
      localStorage.setItem("libros", JSON.stringify(libros));
      verItem(libro);
      crearLibroForm.reset();
    });
  };
  
  const crearArticulo = () => {
    const crearArticuloForm = document.querySelector("#crearItem2");
    crearArticuloForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = e.target.elements.nombre.value;
      const proveedor = e.target.elements.proveedor.value;
      const descripcion = e.target.elements.descripcion.value;
      const numeroSerie = e.target.elements.numero_de_serie.value;
      const stock = e.target.elements.stock.value;
      const tematica = e.target.elements.tematica.value;
      const imagen = e.target.elements.imagen.files[0];
  
      const articulo = new Articulo(nombre, proveedor, descripcion, numeroSerie, stock, tematica, imagen);
      articulos.push(articulo);
      localStorage.setItem("articulos", JSON.stringify(articulos));
      verItem(articulo);
      crearArticuloForm.reset();
    });
  };
  
  const verItem = (item) => {
    const contenedorItems = document.querySelector("#tarjetasItems");
    
    const card = document.createElement("div");
    card.classList.add("tarjeta");
  
    const imagen = document.createElement("img");
    imagen.classList.add("card-img-top");
    imagen.src = URL.createObjectURL(item.imagen);
  
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
  
    const titulo = document.createElement("h5");
    titulo.classList.add("card-title");
    titulo.textContent = item.titulo || item.nombre;
  
    const autorProveedor = document.createElement("p");
    autorProveedor.innerHTML = `<span>${item instanceof Libro ? "Autor" : "Proveedor"}:</span> ${item.autor || item.proveedor}`;
  
    const sinopsisDescripcion = document.createElement("p");
    sinopsisDescripcion.innerHTML = `<span>${item instanceof Libro ? "Sinopsis" : "Descripción"}:</span> ${item.sinopsis || item.descripcion}`;
  
    const editorial = document.createElement("p");
    editorial.innerHTML = `<span>Editorial:</span> ${item.editorial || ""}`;
  
    const edicionNumeroSerie = document.createElement("p");
    edicionNumeroSerie.innerHTML = `<span>${item instanceof Libro ? "Edición" : "Número de serie"}:</span> ${item.edicion || item.numeroSerie}`;
  
    const isbn = document.createElement("p");
    isbn.innerHTML = `<span>ISBN:</span> ${item.isbn || ""}`;
  
    const precio = document.createElement("p");
    precio.innerHTML = `<span>Precio:</span> ${item.precio || ""}`;
  
    const stock = document.createElement("p");
    stock.innerHTML = `<span>Stock:</span> ${item.stock || ""}`;
  
    const tematica = document.createElement("p");
    tematica.innerHTML = `<span>Temática:</span> ${item.tematica || ""}`;
  
    cardBody.appendChild(titulo);
    cardBody.appendChild(autorProveedor);
    cardBody.appendChild(sinopsisDescripcion);
    cardBody.appendChild(editorial);
    cardBody.appendChild(edicionNumeroSerie);
    cardBody.appendChild(isbn);
    cardBody.appendChild(precio);
    cardBody.appendChild(stock);
    cardBody.appendChild(tematica);
  
    card.appendChild(imagen);
    card.appendChild(cardBody);
  
    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar para la venta";
    botonAgregar.addEventListener("click", () => {
    localStorage.setItem("itemSeleccionado", JSON.stringify(item));
    window.location.href = "index.html";
  });
  
  card.appendChild(botonAgregar);
  contenedorItems.appendChild(card);
  };
  
  crearLibro();
  crearArticulo();