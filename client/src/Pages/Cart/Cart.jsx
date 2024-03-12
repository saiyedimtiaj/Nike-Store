import CartItems from "../../Components/CartItems/CartItems";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import cartImg from "../../assets/empty-cart.jpg";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

const Cart = () => {
  const axios = useAxiosPublic();
  const [cartItems,refetch,isPending] = useCart()

  const handleDelete = (id) => {
    axios.delete(`/carts/${id}`)
    .then(res=>{
      refetch()
      if(res.data){
        toast.success("Product remove sucessfully", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      }
    })
    .catch(err=>{
      console.log(err.message);
    })
  }

  const handleQuantity = (e,id) => {
    const selectQuantity = parseInt(e.target.value)
    axios.put(`/carts/${id}`,{quantity:selectQuantity})
    .then(res=>{
      console.log(res.data);
      refetch()
    })
  }

  

  const subTottal = cartItems.reduce((a,b)=>a+(b.price * b.quantity),0)
  if(isPending){
    return <h1>Loading....</h1>
  }

  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-300px)]">
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <img className="w-80" src={cartImg} alt="" />
          <h3 className="text-lg font-semibold">Your cart is empty</h3>
          <p className="max-w-[430px] text-sm mt-2 mb-4 text-center">
            Looks like you have not added anything in your cart go ahead and
            explore our product
          </p>
         <Link to='/product'>
         <button className="py-3 text-sm px-8 bg-black text-white rounded-full">
            Continue Shopping
          </button>
         </Link>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-semibold leading-tight text-center mt-7">
            Shopping Cart
          </h1>
          <div className="flex flex-col lg:flex-row gap-12 py-12">
            <div className="flex-[2]">
              <h3 className="text-lg font-semibold">Cart Items</h3>
              {cartItems?.map(item=><CartItems handleQuantity={handleQuantity} handleDelete={handleDelete} key={item._id} item={item} />)}
            </div>
            <div className="flex-[1]">
              <div className="text-lg font-semibold">Summary</div>

              <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                <div className="flex pb-3 justify-between border-b border-gray-400">
                  <div className="uppercase text-md md:text-lg font-medium text-black">
                    Subtotal
                  </div>
                  <div className="text-md md:text-lg font-medium text-black">
                    ${subTottal.toFixed(2)}
                  </div>
                </div>
                <div className="text-sm md:text-md pb-4 border-t mt-3">
                  The subtotal reflects the total price of your order, including
                  duties and taxes, before any applicable discounts. It does not
                  include delivery costs and international transaction fees.
                </div>
              </div>

              {/* BUTTON START */}
             <Link to='/payment'>
             <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center">
                Checkout
              </button>
             </Link>
              {/* BUTTON END */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
