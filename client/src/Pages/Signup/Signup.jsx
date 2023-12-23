import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="max-w-md mx-auto px-4">
      <h1 className="text-3xl mt-8 mb-6 font-semibold">Welcome to Nike</h1>
      <div>
        <label htmlFor="email" className="text-base font-semibold">
          Your Name
        </label>
        <br />
        <input
          type="text"
          name="name"
          className="px-3 py-2 rounded-xl mb-3 mt-1 text-lg border-2 border-black w-full"
        />
        <label htmlFor="email" className="text-base font-semibold">
          Upload Photo
        </label>
        <br />
        <input
          type="file"
          name="name"
          className="file:text-white file:border-1 file:border-black file:outline-none file:py-2 file:px-5 rounded-xl file:bg-black  mb-3 mt-1 text-lg border-2 border-black w-full"
        />
        <label htmlFor="email" className="text-base font-semibold">
          Your Email
        </label>
        <br />
        <input
          type="email"
          name="email"
          className="px-3 py-2 rounded-xl mb-3 mt-1 text-lg border-2 border-black w-full"
        />
        <label htmlFor="email" className="text-base font-semibold">
          Password
        </label>
        <br />
        <input
          type="password"
          name="password"
          className="px-3 py-2 rounded-xl mt-1 text-lg border-2 border-black w-full"
        />
        <button className="w-full font-semibold mt-3 text-lg bg-black py-3 text-white rounded-full">
          Sign In
        </button>
      </div>
      <p className='text-center mt-3 text-gray-700'>Already have an account?<Link to='/signin' className='underline'>Sign In</Link></p>
    </div>
  );
};

export default Signup;
