import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./style.css";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Details = () => {
  const {user} = useAuth()
  const axios = useAxiosPublic();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [message,setMessage] = useState('')
  const allSizes = [
    "UK 6",
    "UK 6.5",
    "UK 7",
    "UK 7.5",
    "UK 8",
    "UK 8.5",
    "UK 9",
    "UK 9.5",
    "Uk 10",
    "Uk 10.5",
    "UK 11",
    "Uk 11.5",
  ];

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setMessage(null)
  };

  const { data: product = [],isPending } = useQuery({
    queryKey: ["single-product", id],
    queryFn: () => axios.get(`/products/${id}`).then((res) => res.data),
  });

  const haveSize = product.sizes;

  const handleAddToCart = () => {
    const cartItem = {
      name: product?.name,
      price: product?.price,
      image: product.images[0],
      size: selectedSize,
      email:user.email,
      quantity:1,
      category:product.category
    }
    if(selectedSize === null){
      setMessage('Size selection is require')
    }
    else{
      axios.post('/carts',cartItem)
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err.message);
      })
    }
  }

  if(isPending){
    return <p>Loading......</p>
  }

  return (
    <div className="max-w-6xl px-5 mt-10 flex flex-col md:flex-row gap-12 mb-16 mx-auto">
      <div className="flex-1 top-[50px]">
        <Carousel
          className="productCarousel"
          showIndicators={false}
          showStatus={false}
          infiniteLoop={true}
          thumbWidth={60}
        >
          {product.images?.map((image, index) => (
            <div key={index}>
              <img src={image} alt="" />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="flex-1">
        <div className="max-w-xs">
          <h1 className="text-[27px] font-semibold">{product.name}</h1>
          <p className="mt-2 font-medium">{product.category}</p>
          <h1 className="text-xl font-semibold my-2">
            Price : ${product.price}
          </h1>
          <p className="font-semibold text-sm mt-8">Select Size</p>
          <div className="grid grid-cols-3 gap-2">
            {allSizes.map((size, index) => (
              <button
                disabled={!haveSize.includes(size)}
                key={index}
                onClick={() => handleSizeClick(size)}
                className={`border rounded-md text-center font-medium py-2 ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : !haveSize.includes(size)
                    ? "bg-gray-300 text-gray-500"
                    : "border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <p className="text-sm">{message}</p>
          <button onClick={handleAddToCart} className="w-full py-3 rounded-full mt-4 text-sm bg-black text-white">
            Add to Cart
          </button>

          <h5 className="font-semibold mt-3 lg:mt-6 mb-2">Product Details</h5>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
