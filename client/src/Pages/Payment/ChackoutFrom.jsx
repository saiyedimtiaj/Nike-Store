import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import moment from "moment/moment";
import "./Style.css"

const ChackoutFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [transactionId, setTransactionId] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const axios = useAxiosPublic();
  const [cartItems] = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axios
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axios, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError, "payment error");
    } else {
      console.log(paymentIntent, "payment intent");
      if (paymentIntent.status === "succeeded") {
        const payment = {
          email: user?.email,
          price: totalPrice,
          date: moment().format("LLL"),
          cartId: cartItems.map((item) => item._id),
          productId: cartItems.map((item) => item.itemId),
          images: cartItems.map((item) => item.image),
          transactionId: transactionId,
        };
        axios.post("/orders", payment).then((res) => {
          console.log(res.data);
        });
      }
    }
  };
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1">
        <p className="text-gray-600 text-sm font-medium">Pay Nike Store</p>
        <h1 className="text-3xl font-semibold mb-5">${totalPrice}</h1>
        {
          cartItems?.map(item=><div className="flex items-center my-2 gap-2" key={item?._id}>
              <img className="w-20" src={item?.image} alt="" />
              <div>
                <h1 className="text-base font-medium">{item.name}</h1>
                <p className="my-2 text-gray-600 font-medium">Quantity : {item?.quantity}</p>
                <h2 className="text-xl font-semibold">${item.price}</h2>
              </div>
          </div>)
        }
      </div>
      <div className="lg:w-1/2">
        <h3 className="text-xl font-semibold">Shopping Information</h3>
        <h6 className="text-gray-700 mt-5 font-medium">Email</h6>
        <input type="text" defaultValue={user?.email} required className="border-2 border-black w-full px-3 py-1.5 mb-3" />
        <form onSubmit={handleSubmit}>
        <h6 className="text-gray-700 mt-1 font-medium">Card Information</h6>
          <CardElement className="px-3 w-full py-2 border-2 border-black flex flex-col"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            disabled={!clientSecret || !stripe}
            className="px-5 py-2 mt-4 bg-black text-white rounded-md"
            type="submit"
          >
            Pay
          </button>
        </form>
        <p>{error}</p>
        {transactionId && (
          <p className="text-green-600">Your Payment Id : {transactionId}</p>
        )}
      </div>
    </div>
  );
};

export default ChackoutFrom;
