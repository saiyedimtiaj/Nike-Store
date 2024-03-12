import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./style.css";
import useAuth from "../../hooks/useAuth";
import RelatedProduct from "../../Components/RelatedProduct/RelatedProduct";
import { toast } from "react-hot-toast";
import useCart from "../../hooks/useCart";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Details = () => {
  const { user,isMenuOpen } = useAuth();
  const axios = useAxiosPublic();
  const [cartItems, refetch] = useCart();
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [message, setMessage] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleThumbClick = (index) => {
    setActiveImageIndex(index);
  };

  const handleSelectImage = (index) => {
    setActiveImageIndex(index);
  };

  const handlePrevClick = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

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
    setMessage(null);
  };

  const { data: product = [], isPending } = useQuery({
    queryKey: ["single-product", id],
    queryFn: () => axios.get(`/products/${id}`).then((res) => res.data),
  });

  const isExist = cartItems.find(
    (item) => item.name === product.name && item.email === user.email
  );

  const haveSize = product.sizes;

  const handleAddToCart = () => {
    const cartItem = {
      name: product?.name,
      itemId: product._id,
      price: product?.price,
      image: product.images[0].url,
      size: selectedSize,
      email: user?.email,
      quantity: 1,
      category: product.category,
    };
    if (user) {
      if (selectedSize === null) {
        setMessage("Size selection is required");
      } else {
        if (!isExist) {
          axios
            .post("/carts", cartItem)
            .then(() => {
              refetch();
              toast.success("Product added to your cart successfully", {
                style: {
                  background: "#333",
                  color: "#fff",
                },
              });
            })
            .catch((err) => {
              console.log(err.message);
            });
        } else {
          toast.error("Product is already in cart", {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
        }
      }
    } else {
      return navigate("/signin");
    }
  };

  if (isPending) {
    return <p>Loading......</p>;
  }

  return (
    <>
      <div className="max-w-6xl px-5 mt-10 flex flex-col md:flex-row gap-12 mb-16 mx-auto">
        <div className="flex-1 top-[50px]">
          <div className={isMenuOpen ? 'hidden' : 'carouselContainer relative'}>
            <Carousel
              className="productCarousel"
              showIndicators={false}
              showStatus={false}
              infiniteLoop={true}
              thumbWidth={60}
              selectedItem={activeImageIndex}
              onChange={handleSelectImage}
            >
              {product.images?.map((image, index) => (
                <div key={index} onClick={() => handleThumbClick(index)}>
                  <img src={image.url} alt="" />
                </div>
              ))}
            </Carousel>
            <div className="carouselButtons flex gap-1 absolute bottom-24  right-2 md:bottom-2 z-50">
              <button
                className="carouselButton prevButton bg-blue-gray-50 rounded-full p-2"
                onClick={handlePrevClick}
              >
                <FaChevronLeft size={19} />
              </button>
              <button
                className="carouselButton nextButton bg-blue-gray-50 rounded-full p-2"
                onClick={handleNextClick}
              >
                 <FaChevronRight size={19} />
              </button>
            </div>
          </div>
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
            <button
              onClick={handleAddToCart}
              className="w-full py-3 rounded-full mt-4 text-sm bg-black text-white"
            >
              Add to Cart
            </button>

            <h5 className="font-semibold mt-3 lg:mt-6 mb-2">Product Details</h5>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      {!isMenuOpen && <RelatedProduct category={product.category} />}
    </>
  );
};

export default Details;
