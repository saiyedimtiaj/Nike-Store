import image from "../../assets/p1.png";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItems = () => {
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src={image} alt="" />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            Jordan Retro 6 G
          </div>
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            Man Shoes
          </div>
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            Price : $99
          </div>
        </div>
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          Man Shoes
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size: UK 6</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity: 1</div>
            </div>
          </div>
          <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
