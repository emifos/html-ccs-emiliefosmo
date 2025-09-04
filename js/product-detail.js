const container = document.querySelector("#container")
const API_URL = "https://v2.api.noroff.dev/rainy-days"

async function fetchAndCreateProduct() {
    try {
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")

        if(!id) {
            container.textContent = "No product ID provided!"
            return
        }
        const response = await fetch(`${API_URL}/${id}`)
        const data = await response.json()
        const product = data.data

        const productDiv = document.createElement("div")
        const image = document.createElement("img")
        const title = document.createElement("h2")
        const price = document.createElement("p")
        const description = document.createElement("p")
        const backButton = document.createElement("a")

        productDiv.className = 'main-container'
        image.className = 'img-products'
        title.className = 'description'
        price.className = 'description'
        description.className = 'description'
        backButton.className = 'cta'

        image.src = product.image.url
        image.alt = product.image.alt
        title.textContent = product.title
        price.textContent = `$${product.price}`
        description.textContent = product.description
        backButton.textContent = 'Back to products'
        backButton.href = '/index.html'


        productDiv.appendChild(image)
        productDiv.appendChild(title)
        productDiv.appendChild(price)
        productDiv.appendChild(description)
        productDiv.appendChild(backButton)
       
        container.appendChild(productDiv)
    }   catch (error) {
        console.error("Failed to fetch product", error)
        container.textContent = 'Failed to load product'

    }
}

fetchAndCreateProduct()


const genderFilter = document.querySelector("#genderFilter");

async function createFilterOptions() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const products = data.data;

    // Hent alle kjønn fra produktene
    const genders = products.map(product => product.gender); // EKS: "men" eller "women"

    // Finn unike verdier
    const uniqueGenders = [...new Set(genders)];

    // Legg til en "All" først
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All";
    genderFilter.appendChild(allOption);

    // Lag <option> for hver unik gender
    uniqueGenders.forEach(gender => {
      const option = document.createElement("option");
      option.value = gender;
      option.textContent = gender.charAt(0).toUpperCase() + gender.slice(1); // f.eks. "Men"
      genderFilter.appendChild(option);
    });

  } catch (error) {
    console.error("Kunne ikke hente filter-data", error);
  }
}

createFilterOptions();
