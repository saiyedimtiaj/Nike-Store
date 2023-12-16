import image from '../../assets/p1.png'

const ProductCard = () => {
    return (
        <div>
            <img className="cursor-pointer" src={image} alt="" />
            <h1 className="text-xl mt-1 font-semibold">Nike Air Force 1 '09</h1>
            <p className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">Classic details elevate an icon for timeless sty</p>
        </div>
    );
};

export default ProductCard;