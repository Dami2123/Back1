const socket = io();

const title = document.getElementById('title');
const code = document.getElementById('code');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const description = document.getElementById('description');
const category = document.getElementById('category');
const button = document.getElementById('button');
const thumbnails = document.getElementById('thumbnails');


button.addEventListener('click', evt => {
    let product = {}

    if (title.value == "" || description.value == "" || code.value == "" || price.value == "" || stock.value == "" || category.value == "") {
        return alert('Imagen URL es el único campo opcional');
    }

    if (thumbnails.value != "") {
        product = {
            title: title.value,
            description: description.value,
            code: code.value,
            price: parseInt(price.value),
            stock: parseInt(stock.value),
            category: category.value,
            thumbnails: [thumbnails.value]
        }
    } else {
        product = {
            title: title.value,
            description: description.value,
            code: code.value,
            price: parseInt(price.value),
            stock: parseInt(stock.value),
            category: category.value
        }
    }

    socket.emit('newProduct', product);

});

socket.on("codeVerification", data => {

    if (!data) {
        return alert('El código ingresado ya existe para otro producto');
    }
    alert('El producto fue agregado exitósamente');
    title.value = ""
    code.value = ""
    price.value = ""
    stock.value = ""
    description.value = ""
    category.value = ""
    thumbnails.value = ""



});


socket.on("allProducts", data => {
    renderProducts(data)
});


function renderProducts(allProducts) {
    const productsDiv = document.getElementById('productsContainer');
    let productView = "";

    for (let i = 0; i < allProducts.length; i++) {

        productView += `<div class="cardProduct">
        <p class="title"> ${allProducts[i].title}</p>
        <p class="price">$ ${allProducts[i].price}</p>
        <p>Descripción: ${allProducts[i].description}</p>
        </div>`

    }

    productsDiv.innerHTML = productView;

}