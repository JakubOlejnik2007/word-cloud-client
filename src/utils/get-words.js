import axios from "axios";

export const getWords = () => axios.get("http://localhost:5101/get-words");