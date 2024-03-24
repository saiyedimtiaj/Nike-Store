import useAxiosPublic from './UseAxiosPublic';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
    const axios = useAxiosPublic();
    const { user } = useAuth();
    const { data: userInfo = [],isPending } = useQuery({
        queryKey: ["is-admin", user?.email],
        queryFn: () =>
          axios.get(`/users?email=${user?.email}`).then((res) => res.data),
      });
      return [userInfo,isPending]
};

export default useUser;