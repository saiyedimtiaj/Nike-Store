import cartImg from '../../assets/empty-cart.jpg'

const Cart = () => {
    return (
        <div className='container mx-auto px-4'>
            <div className='flex flex-col justify-center items-center'>
                <img className='w-80' src={cartImg} alt="" />
                <h3 className='text-lg font-semibold'>Your cart is empty</h3>
                <p className='max-w-[430px] text-sm mt-2 mb-4 text-center'>Looks like you have not added anything in your cart go ahead and explore our product</p>
                <button className='py-3 text-sm px-8 bg-black text-white rounded-full'>Continue Shopping</button>
            </div>
        </div>
    );
};

export default Cart;