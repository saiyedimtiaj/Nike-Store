import axios from "axios";


const instance = axios.create({
    baseURL: 'https://nike-server.vercel.app',
    withCredentials:true
  });

const useAxiosPublic = () => {
    return instance
};

export default useAxiosPublic;