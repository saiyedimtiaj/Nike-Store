import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import Card from "./Card";

const TopSeller = () => {
  const axios = useAxiosPublic()

  const { data:products=[] } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios.get('/products')
      .then(res=>res.data)
  })

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 text-center mt-10 mb-16">
        <h1 className="text-3xl font-semibold">Best Sellers Collection</h1>
        <p className="mt-1">Discover our top-selling shoes — the favorites loved by all. Step into style with our curated collection, where every pair is a statement. Find your perfect fit among the best of the best.</p>
      </div>
        <div className="max-w-5xl mb-16 mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
          {
            products?.map(product=><Card key={product._id} product={product} />).slice(0,6)
          }
        </div>
    </>
  );
};

export default TopSeller;
