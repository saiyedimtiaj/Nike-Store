import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const {register} = useAuth();
  const navigate = useNavigate()

  const handleSignup = e => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    register(email,password)
    .then(()=>{
      navigate('/')
    })
    .catch(err=>{
      console.log(err.message);
    })
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
          name="name"
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
