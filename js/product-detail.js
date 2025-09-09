const container = document.querySelector("#container")
const API_URL = "https://v2.api.noroff.dev/rainy-days"
const pathParts = window.location.pathname.split('/')
const repo = pathParts[1] || ''
const basePath = repo ? `/${repo}` : ''


async function fetchAndCreateProduct() {
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
        const description = document.createElement("p")
        const backButton = document.createElement("a")
        const addToCartButton = document.createElement("button")
        const goToCartButton = document.createElement("button")

        productDiv.className = 'main-container'
        image.className = 'img-products'
        title.className = 'description'
        price.className = 'description'
        description.className = 'description'
        backButton.className = 'cta'
        addToCartButton.className = 'cta'
        goToCartButton.className = 'cta'

        image.src = product.image.url
        image.alt = product.image.alt
        title.textContent = product.title
        price.textContent = `$${product.price}`
        description.textContent = product.description
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
        productDiv.appendChild(description)
        productDiv.appendChild(addToCartButton)
        productDiv.appendChild(goToCartButton)
        productDiv.appendChild(backButton)
       
        container.appendChild(productDiv)
    }   catch (error) {
        console.error("Failed to fetch product", error)
        container.textContent = 'Failed to load product'

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


