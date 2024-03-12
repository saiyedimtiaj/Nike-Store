import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { Card, Typography } from "@material-tailwind/react";


const TABLE_HEAD = ["SL", "Profile Picture", "User ID", "Email", "Name"];

const AllUsers = () => {
    const axios = useAxiosPublic();
  const { data: users = [] } = useQuery({
    queryKey: ["all user",],
    queryFn: () =>
      axios.get(`/users`).then((res) => {
        return res.data;
      }),
  });
    return (
        <div>
       <>
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
          {users.map((user,index) => {
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
          className="w-10 h-10 border-black border-[2px] rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${user?.profile})` }}
        />
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user?._id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                   {user?.email}
                  </Typography>
                </td>
                <td className={classes}>
                 
                  {user?.name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
   </>
    </div>
    );
};

export default AllUsers;