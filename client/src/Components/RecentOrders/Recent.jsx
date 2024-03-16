import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Recent = () => {
  const [order, setOrder] = useState();
  const axios = useAxiosPublic();

  useEffect(() => {
    axios.get("/orders?soryby=asc").then((res) => setOrder(res.data));
  }, [axios]);

  console.log(order);

  return (
    <div>
        <h1 className="text-2xl font-semibold mb-3">Recent Orders</h1>
      <div>
        {order
          ?.map((user, index) => (
            <div
              key={index}
              className="flex my-4 items-center justify-between gap -5"
            >
              <div className="flex items-center gap-1">
                <img
                  className="object-cover w-9 h-9 md:w-12 md:h-12 rounded-full"
                  src={
                    user?.profile ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4dxtPbtZScj1QNcJfd5K_UFY5kgKhMccczw&usqp=CAU"
                  }
                  alt=""
                />
                <div>
                  <h6 className="lg:text-base text-sm font-semibold">
                    {user?.userName || 'Anonymous'}
                  </h6>
                  <p className="lg:text-base text-sm">{user?.email}</p>
                </div>
              </div>
              <div>
                <h4 className="md:text-xl text-base font-semibold">
                  ${user?.price}
                </h4>
              </div>
            </div>
          ))
          .slice(0, 7)}
      </div>
    </div>
  );
};

export default Recent;
