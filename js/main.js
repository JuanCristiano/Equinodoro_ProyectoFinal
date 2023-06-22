const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

const verProducto = ({
  id,
  titulo,
  precio,
  sinopsis,
  stock,
  urlImg,
  autor,
  editorial,
  añoEdicion,
  ISBN,
}) => {
  const contenedorTarjetas = document.querySelector("#contenedorTarjetas");
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";
  tarjeta.innerHTML = `
        <img src="${urlImg}" alt="">
        <div class="contenido">
            <h3>${titulo}</h3>
            <p>${sinopsis}</p>
            <span><b>Precio:</b> ${parseFloat(precio).toFixed(2)}$</span>
            <span><b>Autor:</b> ${autor}</span>
            <span><b>Editorial:</b> ${editorial}</span>
            <span><b>Año de Edición:</b> ${parseInt(añoEdicion)}</span>
            <span><b>ISBN:</b> ${ISBN}</span>
            <span><b>Stock:</b> ${stock}</span>
        </div>
        <form id="formCarrito${id}">
            <input name="id" type="hidden" value="${id}">
            <input name="cantidad" type="number" value="1" min="1" max="${stock}">
            <button type="submit">Agregar al carrito</button>
        </form>
    `;
  contenedorTarjetas.append(tarjeta);
};

const agregarCarrito = (id) => {
  const formCarrito = document.querySelector("#formCarrito" + id);
  formCarrito.addEventListener("submit", (e) => {
    e.preventDefault();
    const cantidad = e.target.children["cantidad"].value;
    carrito.push({
      id,
      cantidad,
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarNumeroCarrito();
    Toastify({
      text: "Producto agregado al carrito",
      duration: 2000,
      gravity: "bottom",
      position: "right",
      style: {
        background: "pink",
        color: "black",
        width: "300px",
        textAlign: "center",
        borderRadius: "10px",
      },
    }).showToast();
  });
};

const actualizarNumeroCarrito = () => {
  const carritoCantidad = document.querySelector("#carritoCantidad");
  const cantidadTotal = carrito.reduce(
    (total, producto) => total + parseInt(producto.cantidad),
    0
  );
  carritoCantidad.textContent = cantidadTotal;
};

const verProductos = async () => {
  const res = await fetch("./productos.json");
  const productos = await res.json();
  productos.forEach((producto) => {
    if (producto.stock != 0) {
      verProducto(producto);
      agregarCarrito(producto.id);
    }
  });
};

window.addEventListener("DOMContentLoaded", () => {
  actualizarNumeroCarrito();
  verProductos();
});



