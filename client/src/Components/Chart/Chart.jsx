import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const parseData = (data) => {
  const currentDate = new Date();
  const sixMonthAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 5,
    1
  );

  const filterDate = data.filter((item) => new Date(item?.date >= sixMonthAgo));

  const monthlyData = {};
  filterDate.forEach((item) => {
    const month = new Date(item?.date).toLocaleString("default", {
      month: "long",
    });

    // if(monthlyData[month]){
    //     monthlyData[month].totalPrice += item.totalPrice ;
    // }
    // else{
    monthlyData[month] = {
      month,
      totalPrice: item?.price,
    };
    // }
  });
  return Object.values(monthlyData);
};

const Chart = ({ orderData }) => {
  const chartData = parseData(orderData);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Monthly Booking Revenue</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tick={{ transform: "translate(-10, 0)" }} />
          <Tooltip />
          <Bar dataKey="totalPrice" fill="#0E0E0E" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
