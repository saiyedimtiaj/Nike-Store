/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";


const Card = ({product}) => {
    return (
        <div>
            <Link to={`/product/${product?.id}`}>
            <img className="cursor-pointer" src={product?.images[0]} alt="" />
            </Link>
            <h1 className="text-xl mt-1 font-semibold">{product?.name}</h1>
            <p className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">{product?.description}</p>
        </div>
    );
};

export default Card;