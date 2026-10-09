/* ==================================================
   MIMU — JAVASCRIPT
   ================================================== */


/* ==================================================
   MENÚ MOBILE
   ================================================== */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("show");

});


/* Cerrar menú al tocar un enlace */

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("show");

    });

});


/* ==================================================
   CARRITO
   ================================================== */

let cart = [];


/* Elementos */

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutButton = document.getElementById("checkoutButton");


/* Abrir carrito */

function openCart() {

    cartPanel.classList.add("open");
    cartOverlay.classList.add("show");

}


/* Cerrar carrito */

function closeCartPanel() {

    cartPanel.classList.remove("open");
    cartOverlay.classList.remove("show");

}


cartButton.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


/* ==================================================
   AGREGAR PRODUCTOS
   ================================================== */

document.querySelectorAll(".add-button").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".product-card");

        const name = card.dataset.name;
        const price = Number(card.dataset.price);

        const image = card.querySelector("img").src;

        const existingProduct = cart.find(
            product => product.name === name
        );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: name,
                price: price,
                image: image,
                quantity: 1

            });

        }


        updateCart();

        showToast();

    });

});


/* ==================================================
   ACTUALIZAR CARRITO
   ================================================== */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <span>🧶</span>

                <p>
                    Todavía no agregaste productos.
                </p>

                <a href="#productos" id="goProducts">
                    Ver productos
                </a>

            </div>

        `;

        cartTotal.textContent = "$0";

        cartCount.textContent = "0";

        checkoutButton.disabled = true;

        return;

    }


    checkoutButton.disabled = false;


    let total = 0;
    let quantityTotal = 0;


    cart.forEach((product, index) => {

        total += product.price * product.quantity;

        quantityTotal += product.quantity;


        const item = document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                class="cart-item-image"
            >

            <div>

                <h3>
                    ${product.name}
                </h3>

                <p class="cart-item-price">
                    ${formatPrice(product.price)}
                </p>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-item"
                onclick="removeProduct(${index})"
                aria-label="Eliminar producto">

                ×

            </button>

        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent = formatPrice(total);

    cartCount.textContent = quantityTotal;

}


/* ==================================================
   CAMBIAR CANTIDAD
   ================================================== */

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* ==================================================
   ELIMINAR PRODUCTO
   ================================================== */

function removeProduct(index) {

    cart.splice(index, 1);

    updateCart();

}


/* ==================================================
   FORMATO DE PRECIO
   ================================================== */

function formatPrice(price) {

    return "$" + price.toLocaleString("es-AR");

}


/* ==================================================
   TOAST
   ================================================== */

let toastTimer;


function showToast() {

    const toast = document.getElementById("toast");

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* ==================================================
   FILTROS
   ================================================== */

const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(button => {

            button.classList.remove("active");

        });


        filter.classList.add("active");


        const category = filter.dataset.category;


        products.forEach(product => {

            if (
                category === "todos" ||
                product.dataset.category === category
            ) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

});


/* ==================================================
   WHATSAPP
   ================================================== */

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) return;


    let message = "Hola Mimu 💚 Quisiera realizar este pedido:%0A%0A";

    let total = 0;


    cart.forEach(product => {

        const subtotal =
            product.price * product.quantity;

        total += subtotal;


        message +=
            `• ${product.name} x${product.quantity} — ${formatPrice(subtotal)}%0A`;

    });


    message +=
        `%0ATotal: ${formatPrice(total)}%0A%0A`;

    message +=
        "¡Gracias!";


    /*
       REEMPLAZÁ ESTE NÚMERO POR EL WHATSAPP
       DEL EMPRENDIMIENTO.
    */

    const phone = "543764142524";


    const whatsappURL =
        `https://wa.me/${phone}?text=${message}`;


    window.open(whatsappURL, "_blank");

});


/* ==================================================
   COMPARTIR PÁGINA
   ================================================== */

const shareButton =
    document.getElementById("shareButton");


shareButton.addEventListener("click", async () => {

    const shareData = {

        title: "Amigurumis Mimu",

        text: "Conocé Amigurumis Mimu ✦ Creaciones hechas a mano.",

        url: window.location.href

    };


    if (navigator.share) {

        try {

            await navigator.share(shareData);

        } catch (error) {

            /*
               El usuario cerró la ventana
               de compartir.
            */

        }

    } else {

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

            alert(
                "¡Link copiado! Ya podés compartirlo 💚"
            );

        } catch (error) {

            alert(
                "Copiá este link para compartir Mimu: " +
                window.location.href
            );

        }

    }

});


/* ==================================================
   INICIALIZAR
   ================================================== */

updateCart();
