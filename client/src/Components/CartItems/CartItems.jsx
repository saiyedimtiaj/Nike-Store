/* eslint-disable react/prop-types */
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItems = ({item,handleDelete,handleQuantity}) => {
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src={item.image} alt="" />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {item.name}
          </div>
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {item?.category}
          </div>
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            Price : ${item.price}
          </div>
        </div>
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
        {item?.category}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size: {item.size}</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity: <select onChange={(e)=>handleQuantity(e,item._id)} defaultValue={item.qunatity} name="qunatity" id="">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select></div>
            </div>
          </div>
          <RiDeleteBin6Line onClick={()=>handleDelete(item?._id)} className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
