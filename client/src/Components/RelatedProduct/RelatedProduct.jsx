/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../AllProduct/ProductCard/ProductCard";

const RelatedProduct = ({ category }) => {
  const axios = useAxiosPublic();
  const { data: products = [] } = useQuery({
    queryKey: ["related-product"],
    queryFn: () =>
      axios.get(`/allproduct?category=${category}`).then((res) => res.data),
  });
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 960 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 960, min: 720 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 720, min: 0 },
      items: 2
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 mt-4">
      <h1 className="text-2xl font-semibold mb-4 pl-3">You Might Also Like</h1>
      <Carousel itemClass="px-3" responsive={responsive}>
        {
            products.map(product=><ProductCard key={product?._id} product={product} />)
        }
      </Carousel>
    </div>
  );
};

export default RelatedProduct;
