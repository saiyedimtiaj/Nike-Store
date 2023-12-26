import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signin = () => {
  const {signin} = useAuth();
  const navigate = useNavigate()

  const handleSignin = e => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signin(email,password)
    .then(()=>{
      navigate('/')
    })
    .catch(err=>{
      console.log(err.message);
    })
  }
  return (
    <div className="max-w-md mx-auto px-4">
      <h1 className="text-3xl mt-10 mb-10 font-semibold">Sign in to Nike</h1>
      <button className="flex items-center justify-center border border-black rounded-full gap-3 w-full py-3 text-xl font-semibold">
        <span className="text-2xl">
          <FcGoogle />
        </span>
        <span>Sign in with Google</span>
      </button>
      <div className="my-4 flex gap-3 items-center">
        <span className="border flex-1 border-gray-700"></span>
        <span className="text-gray-700">or sign in with email</span>
        <span className="border flex-1 border-gray-700"></span>
      </div>
      <form onSubmit={handleSignin}>
        <label htmlFor="email" className="text-lg font-semibold">
          Enter Your Email
        </label>
        <br />
        <input
          type="email"
          name="email"
          className="px-3 py-3 rounded-xl mb-3 mt-1 text-xl border-2 border-black w-full"
        />
        <label htmlFor="email" className="text-lg font-semibold">
          Password
        </label>
        <br />
        <input
          type="password"
          name="password"
          className="px-3 py-3 rounded-xl mt-1 text-xl border-2 border-black w-full"
        />
        <button type="submit" className="w-full font-semibold mt-3 text-lg bg-black py-3 text-white rounded-full">
          Sign In
        </button>
      </form>
      <p className="text-center mt-3 text-gray-700">
        Don't have an account?
        <Link to="/signup" className="underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Signin;
