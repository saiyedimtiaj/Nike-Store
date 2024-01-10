import { useState } from "react";
import { UploadImage } from "../../../Api/Upload";


const AddProduct = () => {
  const [select,setSelect] = useState([])
  const [images,setImages] = useState([])
  const [link,setLink] = useState([])
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  const handleSelect = (value) => {
    const filterring = select.find(sel=>sel === value)

    if(filterring){
      const newArr = select.filter(size=>size !== value)
      setSelect(newArr)
    }
    else{
      setSelect([...select,value])
    }
  }

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

  const handleUploadPhoto = async() => {
    try{
      if(images.length < 4){
        return setError('upload more then 3 file')
      }
      let arr = []
      for(let i = 0; i < images.length; i++){
        setLoading(true)
        const data = await UploadImage(images[i])
        arr.push(data)
      }
      setLink(arr)
      setLoading(false)
    }
    catch(err){
      console.log(err);
    }
  }

  console.log(link);


  return (
    <div>
      <div className="flex gap-2 mt-3">
        <div className="w-full">
          <label className="font-semibold">Product Name</label>
          <input type="text" name="name" className="px-2 py-1 border-2 border-black w-full" />
        </div>
        <div className="w-full">
        <label className="font-semibold">Price</label>
          <input type="number" name="price" className="px-2 py-1 border-2 border-black w-full" />
        </div>
        <div className="w-full">
        <label className="font-semibold">Category</label>
          <select name="category" id="" className="px-2 py-1.5 border-2 border-black w-full" >
              <option value="Men's Shoes">Men's Shoes</option>
              <option value="Women's Shoes">Women's Shoes</option>
              <option value="Running Shoes">Running Shoes</option>
              <option value="Football Cleats">Football Cleats</option>
          </select>
        </div>
      </div>
        <div className="flex gap-4 mt-3">
          <div className="w-full">
            <h1 className="font-semibold">Select Sizes</h1>
            {
              allSizes.map((size,index)=><button key={index} onClick={()=>handleSelect(size)} className={select.includes(size) ? 'px-3 py-2 mx-2 mb-2 bg-black text-white rounded font-semibold text-lg' : 'border-2 border-black rounded px-3 py-1.5 text-lg font-semibold mx-2 mb-2'} >{size}</button>)
            }
          </div>
          <div className="w-full">
            <h1 className="font-semibold text-lg">Select Images</h1>
          <div className="flex gap-3">
          <input
          type="file"
          required
          multiple={true}
          onChange={(e)=>setImages(e.target.files)}
          className="file:text-white file:border-1 file:border-black file:outline-none file:py-2 file:px-5 rounded-xl file:bg-black  mb-3 mt-1 text-lg border-2 border-black w-full"
        />
        <button className="bg-black text-white px-5 h-12 rounded font-semibold" onClick={handleUploadPhoto}>Upload</button>
          </div>
        <p>{error}</p>
        <p>{loading === true ? 'loading....' : ''}</p>
        {link && link.map((link,index)=><div className="inline-flex" key={index}>
        <div
          className="w-24 mx-2 h-24 bg-cover"
          style={{ backgroundImage: `url(${link.url})` }}
        />
        </div>)}
          </div>
        </div>
    </div>
  );
};

export default AddProduct;