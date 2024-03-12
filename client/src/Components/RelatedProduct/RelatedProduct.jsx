/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../AllProduct/ProductCard/ProductCard";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

const RelatedProduct = ({ category }) => {
  const axios = useAxiosPublic();
  const { data: products = [] } = useQuery({
    queryKey: ["related-product"],
    queryFn: () =>
      axios.get(`/allproduct?category=${category}`).then((res) => res.data),
  });
  const carouselRef = useRef(null); // Reference to the carousel component

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
    },
    minMobile: {
      breakpoint: { max: 420, min: 0 },
      items: 1
    }
  };

  const handlePrevClick = () => {
    carouselRef.current.previous();
  };

  const handleNextClick = () => {
    carouselRef.current.next();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-4">
      <div className="flex justify-between gap-5 items-center mb-5">
      <h1 className="md:text-2xl text-xl font-semibold mb-4 pl-3">You Might Also Like</h1>
      <div className="flex gap-1">
      <button className="carousel-control-prev bg-black text-white md:px-3 px-2 py-1 md:py-2" onClick={handlePrevClick}><FaArrowLeft size={19} /></button>
      <button className="carousel-control-next bg-black text-white md:px-3 px-2 py-1 md:py-2" onClick={handleNextClick}><FaArrowRight size={19} /></button>
      </div>
      </div>
      <div className="carousel-wrapper">
        <Carousel
          ref={carouselRef}
          itemClass="px-3"
          responsive={responsive}
          draggable={false} // Disable draggable to prevent issues with manual navigation
        >
          {products.map(product => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default RelatedProduct;
