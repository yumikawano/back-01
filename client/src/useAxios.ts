import Axios from "axios";
import { configure } from "axios-hooks";
export { default as useAxios } from "axios-hooks";

const axios = Axios.create({
  baseURL: "http://localhost:8080",
});

configure({ axios });
