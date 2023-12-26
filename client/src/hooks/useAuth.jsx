import { useContext } from "react";
import { AuthContext } from "../Privider/AuthProvider";


const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth
};

export default useAuth;