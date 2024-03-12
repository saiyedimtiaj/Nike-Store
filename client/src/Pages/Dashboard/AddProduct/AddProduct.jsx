import { useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import AddMultiImages from "../../../Components/AddMultiImages/AddMultiImages";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";

const AddProduct = () => {
  const [select, setSelect] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const axios = useAxiosPublic();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();

  const handleSelect = (value) => {
    const filterring = select.find((sel) => sel === value);

    if (filterring) {
      const newArr = select.filter((size) => size !== value);
      setSelect(newArr);
    } else {
      setSelect([...select, value]);
    }
  };

  const allSizes = [
    "UK 6",
    "UK 6.5",
    "UK 7",
    "UK 7.5",
    "UK 8",
    "UK 8.5",
    "UK 9",
    "UK 9.5",
    "Uk 10",
    "Uk 10.5",
    "UK 11",
    "Uk 11.5",
  ];

  const handleAddProduct = () => {
    const body = {
      name: name,
      price: parseFloat(price),
      category: category,
      description: description,
      images: [
        { url: image1 },
        { url: image2 },
        { url: image3 },
        { url: image4 },
      ],
      sizes: select,
      sellCount: 1,
      brand: "nike",
      createdAt: new Date(),
    };
    if (name === "") {
      toast.error("name field is requird");
    } else if (price === "") {
      toast.error("price field is requird");
    } else if (description === "") {
      toast.error("Description field is requird");
    } else if (select.length === 0) {
      toast.error("size selection field is requird");
    } else if (!image1 && !image2 && !image3 && !image4) {
      toast.error("At least 4 images are required to be uploaded");
    } else {
      console.log(body);
      axios
        .post("/products", body)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("product add sucessfully");
            setName("");
            setSelect("");
            setDescription("");
            setPrice("");
            setImage1("");
            setImage2("");
          }
          setImage3("");
          setImage4("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1 className="font-bold text-4xl mt-7">Add Shoes</h1>

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
              <FaAngleRight/>
              <a class="ms-1 text-sm font-medium text-gray-500 hover:text-gray-800 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                Add Shoes
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex flex-col md:flex-row gap-2 mt-3">
        <div className="w-full">
          <label className="font-semibold">Product Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            className="px-2 py-1 border-2 border-black w-full"
          />
        </div>
        <div className="w-full">
          <label className="font-semibold">Price</label>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            className="px-2 py-1 border-2 border-black w-full"
          />
        </div>
        <div className="w-full">
          <label className="font-semibold">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id=""
            className="px-2 py-1.5 border-2 border-black w-full"
          >
            <option value="Men's Shoes">Men's Shoes</option>
            <option value="Women's Shoes">Women's Shoes</option>
            <option value="Running Shoes">Running Shoes</option>
            <option value="Football Cleats">Football Cleats</option>
          </select>
        </div>
      </div>
      <div className="w-full mt-2">
        <h1 className="font-semibold text-lg">Select Images</h1>
        <AddMultiImages
          image1={image1}
          setImage1={setImage1}
          image2={image2}
          setImage2={setImage2}
          image3={image3}
          setImage3={setImage3}
          image4={image4}
          setImage4={setImage4}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mt-3">
        <div className="w-full">
          <h1 className="font-semibold">Select Sizes</h1>
          {allSizes.map((size, index) => (
            <button
              key={index}
              onClick={() => handleSelect(size)}
              className={
                select.includes(size)
                  ? "px-3 py-2 mx-2 mb-2 bg-black text-white rounded font-semibold text-lg"
                  : "border-2 border-black rounded px-3 py-1.5 text-lg font-semibold mx-2 mb-2"
              }
            >
              {size}
            </button>
          ))}
        </div>
        <div className="w-full">
          <label className="font-semibold">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-2 py-2 border-2 border-black"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <button
        onClick={handleAddProduct}
        className="bg-black w-full cursor-pointer py-3 rounded text-white font-medium text-lg my-3"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
