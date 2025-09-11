import { showLoading, hideLoading } from "./loading.js"
const container = document.querySelector("#container")
const API_URL = "https://v2.api.noroff.dev/rainy-days"
const pathParts = window.location.pathname.split('/')
const repo = pathParts[1] || ''
const basePath = repo ? `/${repo}` : ''


async function fetchAndCreateProduct() {
    showLoading()
    try {
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")

        if(!id) {
            container.textContent = "No product ID provided!"
            return
        }

        const pathParts = window.location.pathname.split('/').filter(Boolean)
        const repo = pathParts.length > 0 ? pathParts[0] : ''
        const isLocal = repo.includes('.html') 
        const basePath = isLocal ? '' : `/${repo}`

        const response = await fetch(`${API_URL}/${id}`)
        const data = await response.json()
        const product = data.data

        const productDiv = document.createElement("div")
        const image = document.createElement("img")
        const title = document.createElement("h2")
        const price = document.createElement("p")
        const discountedPrice = document.createElement("p")
        const onSale = document.createElement("p")
        const description = document.createElement("p")
        const gender = document.createElement("p")
        const size = document.createElement("p")
        const baseColor = document.createElement("p")
        const backButton = document.createElement("a")
        const addToCartButton = document.createElement("button")
        const goToCartButton = document.createElement("button")

        productDiv.className = 'main-container'
        image.className = 'img-products'
        title.className = 'description'
        price.className = 'description'
        discountedPrice.className = 'description'
        onSale.className = 'description'
        description.className = 'description'
        gender.className = 'description'
        size.className = 'description'
        baseColor.className = 'description'
        backButton.className = 'cta'
        addToCartButton.className = 'cta'
        goToCartButton.className = 'cta'

        image.src = product.image.url
        image.alt = product.image.alt
        title.textContent = product.title

        if (product.onSale && product.discountedPrice < product.price) {
            price.innerHTML = `<span style="text-decoration: line-through; color: gray;">$${product.price}</span>`
            discountedPrice.innerHTML = `<strong style="color: red;">Now: $${product.discountedPrice}</strong>`
            onSale.textContent = `On Sale: Yes`
        } else {
            price.textContent = `$${product.price}`
            discountedPrice.textContent = ''
            onSale.textContent = `On sale: No`
        }

        description.textContent = product.description
        gender.textContent = `Gender: ${product.gender || "N/A"}`
        baseColor.textContent = `Base Color: ${product.baseColor || "N/A"}`

        if (Array.isArray(product.sizes)){
            size.textContent = `Sizes: ${product.sizes.join(',')}`
        } else {
            size.textContent = `Size: ${product.size || "N/A"}`
        }

        backButton.textContent = 'Back to products'
        backButton.href = `${basePath}/index.html`

        addToCartButton.textContent = 'Add to cart'
        goToCartButton.textContent = 'Go to cart'

        addToCartButton.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || []

            const existingProductIndex = cart.findIndex(item => item.id === product.id)
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1
            } else {
            
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                discountedPrice: product.discountedPrice,
                image: product.image.url,
                alt: product.image.alt,
                quantity: 1
            })
        }
        
        localStorage.setItem('cart', JSON.stringify(cart))

            updateCartCount()
            alert('Product added to cart!')
            })

        goToCartButton.addEventListener('click', () => {
            window.location.href= "check-out.html"
        }) 


        productDiv.appendChild(image)
        productDiv.appendChild(title)
        productDiv.appendChild(price)
        productDiv.appendChild(discountedPrice)
        productDiv.appendChild(onSale)
        productDiv.appendChild(description)
        productDiv.appendChild(gender)
        productDiv.appendChild(size)
        productDiv.appendChild(baseColor)
        productDiv.appendChild(addToCartButton)
        productDiv.appendChild(goToCartButton)
        productDiv.appendChild(backButton)
       
        container.appendChild(productDiv)
    } catch (error) {
        console.error("Failed to fetch product", error)
        container.textContent = 'Failed to load product'
    } finally {
        hideLoading()
    }
}

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

fetchAndCreateProduct()
updateCartCount()


