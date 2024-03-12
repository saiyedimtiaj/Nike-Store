/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";


const ProductCard = ({product}) => {
    return (
        <Link to={`/product/${product?._id}`}>
            <img className="cursor-pointer" src={product?.images[0].url} alt="" />
            <h1 className="text-sm lg:text-xl mt-1 font-semibold">{product.name}</h1>
            <p className="whitespace-nowrap overflow-hidden text-ellipsis text-xs lg:text-sm">{product?.description}</p>
            <div className="flex flex-row md:flex-col lg:flex-row md:items-start justify-between items-center my-1">
                <h1 className="text-xl md:text-lg lg:text-xl font-medium text-gray-500">{product?.category}</h1>
                <h1 className="text-xl md:text-lg lg:text-xl font-medium ">${product?.price}</h1>
            </div>
        </Link>
    );
};

export default ProductCard;