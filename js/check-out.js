import { showLoading, hideLoading } from "./loading.js"
const cartContainer = document.getElementById("cart-container")
const totalPriceEl = document.getElementById("total-price")
const checkoutButton = document.getElementById("checkout-button")

let cart = JSON.parse(localStorage.getItem("cart")) || []

function renderCart() {
    showLoading()
    cartContainer.innerHTML = ""

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>"
        totalPriceEl.textContent = "Total: 0 $"
        checkoutButton.style.display = "none"
        hideLoading()
        return
    }

    let total = 0

    cart.forEach((product, index) => {
        const item = document.createElement("div")
        item.className = "cart-item"

        item.innerHTML = `
            <img src="${product.image}" alt="${product.alt}" width="100">
            <div>
                <h2>${product.title}</h2>
                <p>Price: ${product.price} $</p>
                <button class="remove-button" data-index="${index}">Remove</button>
            </div>
        `

        cartContainer.appendChild(item)
        total += product.price
       
    })

    totalPriceEl.textContent = `Total: ${total.toFixed(2)} $`

    document.querySelectorAll(".remove-button").forEach(button => {
        button.addEventListener("click", (e) => {
            const indexToRemove = e.target.dataset.index
            cart.splice(indexToRemove, 1)
            localStorage.setItem("cart", JSON.stringify(cart))
            renderCart()
        })
    })

    hideLoading()
}

checkoutButton.addEventListener("click", () => {
    localStorage.removeItem("cart")
    window.location.href = "confirmation.html"
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
renderCart()
updateCartCount()