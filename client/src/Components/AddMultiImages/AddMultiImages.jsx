import React, { useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddMultiImages = ({ image1, setImage1,image2, setImage2,image3, setImage3,image4, setImage4 }) => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  const handelImage1 = (event) => {
    const image = event.target.files[0];
    if (image) {
      setLoading1(true);
    }
    const fromData = new FormData();
    fromData.append("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=ca1e75a277bb15be2aa64bc489aa437b",
        fromData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setImage1(res.data.data.url);
        setLoading1(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading1(false);
      });
  };

  const handelImage2 = (event) => {
    const image = event.target.files[0];
    if (image) {
      setLoading1(true);
    }
    const fromData = new FormData();
    fromData.append("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=ca1e75a277bb15be2aa64bc489aa437b",
        fromData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setImage2(res.data.data.url);
        setLoading2(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading2(false);
      });
  };

  const handelImage3 = (event) => {
    const image = event.target.files[0];
    if (image) {
      setLoading3(true);
    }
    const fromData = new FormData();
    fromData.append("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=ca1e75a277bb15be2aa64bc489aa437b",
        fromData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setImage3(res.data.data.url);
        setLoading3(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading3(false);
      });
  };

  const handelImage4 = (event) => {
    const image = event.target.files[0];
    if (image) {
      setLoading4(true);
    }
    const fromData = new FormData();
    fromData.append("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=ca1e75a277bb15be2aa64bc489aa437b",
        fromData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setImage4(res.data.data.url);
        setLoading4(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading4(false);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
     <div>
        <div
          onClick={() => document.querySelector(".input-Field1").click()}
          className="flex flex-col items-center justify-center h-[200px] w-full cursor-pointer border-dashed border-[3px] border-gray-500 rounded-lg"
        >
          <input
            type="file"
            required
            hidden
            name="files"
            className="input-Field1"
            onChange={handelImage1}
          />
          {image1 ? (
            <img
              className="w-full object-cover h-[195px] rounded-md"
              src={image1}
              alt=""
            />
          ) : loading1 ? (
            <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-gray-500"></div>
          ) : (
            <>
              <MdCloudUpload size={70} className="text-gray-500" />
              <p>Browse File to upload</p>
            </>
          )}
        </div>
        {image1 && (
          <div className="my-1.5">
            <span>
              <MdDelete
                size={22}
                className="cursor-pointer float-right text-gray-800"
                onClick={() => {
                  setImage1(null);
                  setLoading1(false)
                }}
              />
            </span>
          </div>
        )}
      </div>

      <div>
        <div
          onClick={() => document.querySelector(".input-Field2").click()}
          className="flex flex-col items-center justify-center h-[200px] w-full cursor-pointer border-dashed border-[3px] border-gray-500 rounded-lg"
        >
          <input
            type="file"
            required
            hidden
            name="files"
            className="input-Field2"
            onChange={handelImage2}
          />
          {image2 ? (
            <img
              className="w-full object-cover h-[195px] rounded-md"
              src={image2}
              alt=""
            />
          ) : loading2 ? (
            <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-gray-500"></div>
          ) : (
            <>
              <MdCloudUpload size={70} className="text-gray-500" />
              <p>Browse File to upload</p>
            </>
          )}
        </div>
        {image2 && (
          <div className="my-1.5">
            <span>
              <MdDelete
                size={22}
                className="cursor-pointer float-right text-gray-800"
                onClick={() => {
                  setImage2(null);
                  setLoading2(false)
                }}
              />
            </span>
          </div>
        )}
      </div>

      <div>
        <div
          onClick={() => document.querySelector(".input-Field3").click()}
          className="flex flex-col items-center justify-center h-[200px] w-full cursor-pointer border-dashed border-[3px] border-gray-500 rounded-lg"
        >
          <input
            type="file"
            required
            hidden
            name="files"
            className="input-Field3"
            onChange={handelImage3}
          />
          {image3 ? (
            <img
              className="w-full object-cover h-[195px] rounded-md"
              src={image3}
              alt=""
            />
          ) : loading3 ? (
            <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-gray-500"></div>
          ) : (
            <>
              <MdCloudUpload size={70} className="text-gray-500" />
              <p>Browse File to upload</p>
            </>
          )}
        </div>
        {image3 && (
          <div className="my-1.5">
            <span>
              <MdDelete
                size={22}
                className="cursor-pointer float-right text-gray-800"
                onClick={() => {
                  setImage3(null);
                  setImage3(false)
                }}
              />
            </span>
          </div>
        )}
      </div>

      <div>
        <div
          onClick={() => document.querySelector(".input-Field4").click()}
          className="flex flex-col items-center justify-center h-[200px] w-full cursor-pointer border-dashed border-[3px] border-gray-500 rounded-lg"
        >
          <input
            type="file"
            required
            hidden
            name="files"
            className="input-Field4"
            onChange={handelImage4}
          />
          {image4 ? (
            <img
              className="w-full object-cover h-[195px] rounded-md"
              src={image4}
              alt=""
            />
          ) : loading4 ? (
            <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-gray-500"></div>
          ) : (
            <>
              <MdCloudUpload size={70} className="text-gray-500" />
              <p>Browse File to upload</p>
            </>
          )}
        </div>
        {image4 && (
          <div className="my-1.5">
            <span>
              <MdDelete
                size={22}
                className="cursor-pointer float-right text-gray-800"
                onClick={() => {
                  setImage4(null);
                  setImage4(false)
                }}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMultiImages;
