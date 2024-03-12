import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import ChackoutFrom from "./ChackoutFrom";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Publishable_Key);

const Payment = () => {
  const navigate = useNavigate()
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold text-center my-5">Payment</h1>
      <button onClick={()=>navigate(-1)} className="flex items-center mb-7 gap-2 cursor-pointer">
          <span><FaArrowLeftLong/></span>
          <p>Go Back</p>
      </button>
      <Elements stripe={stripePromise}>
        <ChackoutFrom/>
      </Elements>
    </div>
  );
};

export default Payment;
