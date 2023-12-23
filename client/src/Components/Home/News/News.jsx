import newslatter from "../../../assets/newsletter-bg.jpeg";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const News = () => {
  return (
    <div
      className="w-full h-400 flex items-center bg-cover bg-center bg-f9f9f9 relative"
      style={{ backgroundImage: `url("${newslatter}")` }}
    >
      <div className="w-max flex flex-col items-center mx-auto text-center py-6">
        <span className="mb-10 text-14 text-gray-500">Newsletter</span>
        <span className="big-text mb-5 text-2xl lg:text-4xl font-semibold text-gray-800 uppercase">
          Sign up for latest updates and offers
        </span>
        <div className="form flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Email Address"
            className="w-40 lg:w-60 h-10 border border-gray-200 px-2 text-base lg:text-lg outline-none"
          />
          <button className="h-10 w-24 lg:w-32 flex items-center justify-center cursor-pointer text-white text-base lg:text-lg bg-purple-600 border-b-2 border-purple-700">
            Subscribe
          </button>
        </div>
        <span className="text text-sm text-gray-500 mb-5">
          Will be used in accordance with our Privacy Policy
        </span>
        <span className="social-icons flex gap-2">
          <div className="icon w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white">
            <FaLinkedinIn size={14} />
          </div>
          <div className="icon w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white">
            <FaFacebookF size={14} />
          </div>
          <div className="icon w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white">
            <FaTwitter size={14} />
          </div>
          <div className="icon w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white">
            <FaInstagram size={14} />
          </div>
        </span>
      </div>
    </div>
  );
};

export default News;
