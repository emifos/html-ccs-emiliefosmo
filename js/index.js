import { showLoading, hideLoading } from "./loading.js"
const container = document.querySelector("#container")
const genderFilter = document.querySelector("#genderFilter")
const API_URL = "https://v2.api.noroff.dev/rainy-days"
let allProducts = []

async function fetchAndCreateProducts() {
    showLoading()
try {
    const response = await fetch (API_URL);
    const data = await response.json();
    allProducts = data.data

   renderProducts(allProducts)
}   catch(error) {
    console.error("Failed to fetch products", error)
    container.textContent = 'Failed to load product'
    } finally {
        hideLoading()
    }
}

function renderProducts (products) {
    container.innerHTML = ""

    products.forEach(product => {
        const card = document.createElement("div")
        const image = document.createElement("img")
        const content = document.createElement("div")
        const title = document.createElement("h2")
        const price = document.createElement("p")
        const anchor = document.createElement("a")

        card.className = 'item'
        image.className = 'img-products'
        content.className = 'description'
        title.className = 'description'
        price.className = 'description'

        image.src = product.image.url
        image.alt = product.image.alt
        title.textContent = product.title
        price.textContent = `$${product.price}`
        anchor.href = `product-detail.html?id=${product.id}`

        content.appendChild(title)
        content.appendChild(price)
        card.appendChild(image)
        card.appendChild(content)
        anchor.appendChild(card)

        container.appendChild(anchor)
    })
}

genderFilter.addEventListener("change", () => {
    const selected = genderFilter.value
    if (selected === "all"){
        renderProducts(allProducts)
    } else {
        const filtered = allProducts.filter(p => p.gender === selected)
        renderProducts(filtered)
    }
})

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const countElement = document.getElementById("cart-count")
    if (!countElement) return

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
    if (totalQuantity === 0) {
        countElement.style.display = "none"
    } else {
        countElement.textContent = totalQuantity
        countElement.style.display = "inline-block"
    }
}


fetchAndCreateProducts()
updateCartCount()




