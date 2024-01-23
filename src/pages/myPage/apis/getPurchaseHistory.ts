import axios from "axios";

const getPurchaseHistory = async ({ page = 0 }) => {
  const getPurchaseHistoryURL = `products/own?page=${page}`;

  const response = await axios.get(getPurchaseHistoryURL);

  return response.data;
};

export default getPurchaseHistory;
