import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import useAxiosPublic from "../../hooks/UseAxiosPublic";

const Signup = () => {
  const {register,profile} = useAuth();
  const navigate = useNavigate()
  const location = useLocation()
  const [profileImage,setProfileImage] = useState('')
  const axiosPublic = useAxiosPublic()


  const handleImage = async (e) => {
    const image = e.target.files[0]

    const formData = new FormData()
    formData.append('file',image)
    formData.append("upload_preset", "nikeStore");
    const {data} = await axios.post("https://api.cloudinary.com/v1_1/ddhb3f9rg/image/upload",formData)
    setProfileImage(data.url);
  }

  const handleSignup = async(e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if(profileImage === ''){
      return
    }
    else{
      register(email,password)
    .then(()=>{
      navigate(location?.state ? location.state : '/');
      profile(name,profileImage)
      .then(()=>{
        const userInfo = {
          name:name,
          email:email,
          profile: profileImage,
          price: 0,
          role:'user',
          createdAt: new Date()
        }
        axiosPublic.post('/users',userInfo)
        .then(()=>{
          toast.success("Create Your Account Sucessfully", {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
        })
      })
    })
    .catch(err=>{
      toast.error(err.message);
    })
    }
    
  }

  return (
    <div className="max-w-md mx-auto px-4">
      <h1 className="text-3xl mt-8 mb-6 font-semibold">Welcome to Nike</h1>
      <form onSubmit={handleSignup}>
        <label htmlFor="email" className="text-base font-semibold">
          Your Name
        </label>
        <br />
        <input
          type="text"
          required
          name="name"
          className="px-3 py-2 rounded-xl mb-3 mt-1 text-lg border-2 border-black w-full"
        />
        <label htmlFor="email" className="text-base font-semibold">
          Upload Photo
        </label>
        <br />
        <input
          type="file"
          required
          name="image"
          onChange={handleImage}
          className="file:text-white file:border-1 file:border-black file:outline-none file:py-2 file:px-5 rounded-xl file:bg-black  mb-3 mt-1 text-lg border-2 border-black w-full"
        />
        <label htmlFor="email" className="text-base font-semibold">
          Your Email
        </label>
        <br />
        <input
          type="email"
          required
          name="email"
          className="px-3 py-2 rounded-xl mb-3 mt-1 text-lg border-2 border-black w-full"
        />
        <label htmlFor="email" className="text-base font-semibold">
          Password
        </label>
        <br />
        <input
          type="password"
          required
          name="password"
          className="px-3 py-2 rounded-xl mt-1 text-lg border-2 border-black w-full"
        />
        <input type="submit" value='Sign Up' className="w-full cursor-pointer font-semibold mt-3 text-lg bg-black py-3 text-white rounded-full" />
      </form>
      <p className='text-center mt-3 text-gray-700'>Already have an account?<Link to='/signin' className='underline'>Sign In</Link></p>
    </div>
  );
};

export default Signup;
