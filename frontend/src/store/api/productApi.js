import axios from "axios"

async function fetchProducts() {
    return await axios.get("/api/products-full-info/")
}

async function fetchProduct(id) {
    return await axios.get(`/api/products-full-info/${id}/`)
}

const Api = {
    fetchProducts: fetchProducts,
    fetchProduct: fetchProduct,
}

export default Api