import { useQuery } from "@tanstack/react-query";
import { Card, Typography } from "@material-tailwind/react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import {MdDashboard} from "react-icons/md"
import {FaAngleRight} from "react-icons/fa"

const TABLE_HEAD = ["SL", "Profile Picture", "User ID", "Name", "Email"];

const AllUsers = () => {
  const axios = useAxiosPublic();
  const { data: users = [] } = useQuery({
    queryKey: ["all-user"],
    queryFn: () =>
      axios.get(`/allusers`).then((res) => {
        return res.data;
      }),
  });

  // console.log(users);

  return (
    <div>
      <>
        <h1 className="font-bold text-4xl mt-7">All Users</h1>

        <nav class="flex" aria-label="Breadcrumb" className="mt-1">
          <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li class="inline-flex items-center">
              <Link
                to="/dashboard"
                class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
              >
                <MdDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <div class="flex items-center">
                <FaAngleRight />
                <a class="ms-1 text-sm font-medium text-gray-500 hover:text-gray-800 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                  Account Holders
                </a>
              </div>
            </li>
          </ol>
        </nav>
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
              {users.map((user, index) => {
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
                        className="w-10 h-10 ml-8 border-black border-[2px] rounded-full bg-cover bg-center"
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
                        {user?.name}
                      </Typography>
                    </td>
                    <td className={classes}>{user?.email}</td>
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
