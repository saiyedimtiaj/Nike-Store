import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import sniker from '../../assets/sneaker.png'
import CountUp from "react-countup";
import Chart from "../../Components/Chart/Chart";
import Recent from "../../Components/RecentOrders/Recent";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const DashboardHome = () => {
  const axios = useAxiosPublic()
  const {user} = useAuth()
  const [dataInfo,setDataInfo] = useState([]);
  const [orderData,setOrderData] = useState([])
  useEffect(()=>{
    axios.get('/dashboardCount')
    .then(res=>{
      setDataInfo(res.data)
    })
  },[])
  
  
  useEffect(()=>{
    axios.get('/orders')
    .then(res=>{
      setOrderData(res.data)
    })
  },[])

  const totalRevenue = orderData.reduce((total,item)=>total + item.price,0)
  const total = totalRevenue.toFixed(1)


  return (
    <div className="mt-3">
      <div>
        <h1 className="font-medium text-lg">Hi {user?.displayName},</h1>
        <h1 className="text-2xl font-semibold">Welcome Back to Nike</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:grid-cols-4 mt-4">
        <div className="flex gap-5 items-center bg-blue-gray-100 px-4 py-4 rounded-md">
            <span className="bg-blue-gray-200 p-4 rounded-full text-2xl"><IoStatsChartSharp/></span>
            <div>
              <p className="font-medium">Earnings</p>
              <h1 className="text-2xl font-semibold">$<CountUp
                    start={0}
                    end={total}
                    duration={5}
                /></h1>
            </div>
        </div>
        <div className="flex gap-5 items-center bg-blue-gray-100 px-4 py-4 rounded-md">
            <span className="bg-blue-gray-200 p-4 rounded-full text-2xl"><FaUsers/></span>
            <div>
              <p className="font-medium">New Client</p>
              <h1 className="text-2xl font-semibold">
              <CountUp
                    start={0}
                    end={dataInfo?.user}
                    duration={5}
                /></h1>
            </div>
        </div>
        <div className="flex gap-5 items-center bg-blue-gray-100 px-4 py-4 rounded-md">
            <span className="bg-blue-gray-200 p-4 rounded-full text-2xl"><FaShippingFast/></span>
            <div>
              <p className="font-medium">Order Shipped</p>
              <h1 className="text-2xl font-semibold">
              <CountUp
                    start={0}
                    end={dataInfo?.order}
                    duration={5}
                /></h1>
            </div>
        </div>
        <div className="flex gap-5 items-center bg-blue-gray-100 px-4 py-4 rounded-md">
            <img className="w-8 h-8" src={sniker} alt="" />
            <div>
              <p className="font-medium">Product</p>
              <h1 className="text-2xl font-semibold">
              <CountUp
                    start={0}
                    end={dataInfo?.product}
                    duration={5}
                /></h1>
            </div>
        </div>
      </div>
      <div className="mt-5 flex gap-5 flex-col md:flex-row">
        <div className="w-full lg:w-2/3">
          <Chart orderData={orderData} />
        </div>
        <div className="w-full lg:w-1/3">
          <Recent/>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
