import axios from "axios";


const instance = axios.create({
    baseURL: "https://nike-server.vercel.app",
  });
  
  //  "http://localhost:5000"
const useAxiosPublic = () => {
    return instance
};

export default useAxiosPublic;