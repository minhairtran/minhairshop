import axios from "axios";
import { BASE_URL } from "../../constants/constants";

async function fetchProducts({params}) {
  return await axios({
    method: "get",
    url: BASE_URL + `/api/products-full-info/${params}`,
  });
}

async function fetchProduct(id) {
  return await axios.get(`/api/products-full-info/${id}/`);
}

const productApi = {
  fetchProducts: fetchProducts,
  fetchProduct: fetchProduct,
};

export default productApi;
