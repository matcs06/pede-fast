import axios from "axios";
//  baseURL: "http://localhost:3333/",
let instace = axios.create({
  baseURL: "http://localhost:3333/",
});

export default instace