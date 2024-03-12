import { toast } from "react-hot-toast";
import useAxiosPublic from "../../hooks/UseAxiosPublic";

const UpdateModal = ({ openModal, setOpenModal, item,selectSizes, setSelectSizes,refetch }) => {
  const axios = useAxiosPublic()
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

  const handelSizes = (value) => {
    const filterring = selectSizes.find((sel) => sel === value);

    if (filterring) {
      const newArr = selectSizes.filter((size) => size !== value);
      setSelectSizes(newArr);
    } else {
      setSelectSizes([...selectSizes, value]);
    }
  }

  const handelSubmit = event => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const price = parseFloat(form.price.value)
    const category = form.category.value
    const description = form.description.value
    const sizes= selectSizes
    const body = {name,price,category,description,sizes}
    
    axios.put(`/products/${item?._id}`,body)
    .then(res=>{
      if(res.data.modifiedCount > 0){
        refetch()
        toast.success('Shoes information update sucessfully')
        setOpenModal(false)
      }
    })
  }

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="rounded-sm bg-sky-500 px-5 py-[6px] text-white"
        id="_modal_NavigateUI"
      >
        Modal
      </button>
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] flex items-center justify-center ${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`text- absolute max-w-md rounded-sm bg-white p-6 drop-shadow-lg dark:bg-black dark:text-white ${
            openModal
              ? "scale-1 opacity-1 duration-300"
              : "scale-0 opacity-0 duration-150"
          }`}
        >
          <h1 className="mb-2 text-2xl font-semibold">Update Shoes</h1>
          <form onSubmit={handelSubmit} className="md:w-96 w-80">
            <div className="h-[300px] overflow-y-auto pr-3">

            
            <p>Shoes Name</p>
            <input
              className="border-2 border-black py-1.5 mb-2 px-2 w-full"
              type="text"
              name="name"
              defaultValue={item?.name}
            />
            <p>Shoes Price</p>
            <input
              className="border-2 border-black py-1.5 mb-2 px-2 w-full"
              type="number"
              name="price"
              defaultValue={item?.price}
            />
            <label className="font-semibold">Category</label>
            <select
              defaultValue={item?.category}
              name="category"
              id=""
              className="px-2 py-1.5 border-2 mb-2 border-black w-full"
            >
              <option value="Men's Shoes">Men's Shoes</option>
              <option value="Women's Shoes">Women's Shoes</option>
              <option value="Running Shoes">Running Shoes</option>
              <option value="Football Cleats">Football Cleats</option>
            </select>
            <div className="grid grid-cols-2 gap-4 mb-2">
              {item?.images?.map((imgs, index) => (
                <img src={imgs.url} key={index} />
              ))}
            </div>

            <p>Select Sizes</p>
            <div className="flex gap-2 flex-wrap mb-2">
              {allSizes.map((size, index) => (
                <p
                onClick={()=>handelSizes(size)}
                  className={
                    selectSizes && selectSizes?.includes(size)
                      ? "bg-black text-white px-2 py-1 rounded-sm cursor-pointer"
                      : "border-2 border-black px-[6px] py-[2px] rounded-sm cursor-pointer"
                  }
                  key={index}
                >
                  {size}
                </p>
              ))}
            </div>
            <p>Shoes Details</p>
            <textarea
              defaultValue={item?.description}
              name="description"
              className="border-2 border-black py-1.5 mb-2 px-2 w-full"
              rows="7"
            ></textarea>
            </div>
            <div className="flex justify-between mt-3">
            <button
              type="submit"
              className="me-2 rounded-sm bg-blue-700 px-6 py-[6px] text-white"
            >
              Update
            </button>
            <button
              onClick={() => setOpenModal(false)}
              className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
            >
              Cancel
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
