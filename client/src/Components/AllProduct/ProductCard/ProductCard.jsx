/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";


const ProductCard = ({product}) => {
    return (
        <Link to={`/product/${product?._id}`}>
            <img className="cursor-pointer" src={product?.images[0]} alt="" />
            <h1 className="text-sm lg:text-xl mt-1 font-semibold">{product.name}</h1>
            <p className="whitespace-nowrap overflow-hidden text-ellipsis text-xs lg:text-sm">{product?.description}</p>
        </Link>
    );
};

export default ProductCard;