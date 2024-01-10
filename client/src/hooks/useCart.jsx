import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


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