export function showLoading() {
    let loading = document.getElementById("loading")
    if (!loading) {
        loading = document.createElement("div")
        loading.id = "loading"
        loading.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
            font-size: 2rem;
            z-index: 9999;`

        loading.innerHTML = `
            <div class="spinner" style="
                border: 8px solid rgba(255, 255, 255, 0.3);
                border-top: 8px solid white;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            "></div>
            Loading...`

        document.body.appendChild(loading)

        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); } 
            }`
        document.head.appendChild(style);
    }
    loading.style.display = "flex"
}

export function hideLoading() {
    const loading = document.getElementById("loading")
    if (loading) {
        loading.style.display = "none"
    }
}
