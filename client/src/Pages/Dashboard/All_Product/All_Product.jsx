import { Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";

const TABLE_HEAD = ["ID", "Image", "Name", "Price", "Action"];


const All_Product = () => {
  const axios = useAxiosPublic();
  const { data: products = [] } = useQuery({
    queryKey: ["dashboard all-product"],
    queryFn: () =>
      axios.get(`/dashboard-allProduct`).then((res) => {
        return res.data;
      }),
  });
  console.log(products);

  return (
    <Card className="w-full mt-2 rounded-none">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((item,index) => {
            const classes = "p-4 border-b border-blue-gray-50";

            return (
              <tr key={index + 1}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td>
                <div
          className="w-16 h-16 bg-cover"
          style={{ backgroundImage: `url(${item?.images[0]})` }}>
                    </div>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.price}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default All_Product;
