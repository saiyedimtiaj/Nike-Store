import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./UseAxiosPublic";


const useCart = () => {
    const axios = useAxiosPublic();
    const { user } = useAuth();
    const { data: cartItems = [],refetch,isPending } = useQuery({
      queryKey: ["cart-items", user],
      queryFn: () =>
        axios.get(`/carts?email=${user?.email}`).then((res) => res.data),
    });
    return [cartItems,refetch,isPending]
};

export default useCart;