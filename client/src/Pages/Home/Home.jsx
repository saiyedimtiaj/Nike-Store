import Footer from "../../Components/Footer/Footer";
import Banner from "../../Components/Home/Banner/Banner";
import News from "../../Components/Home/News/News";
import TopSeller from "../../Components/Home/TopSeller/TopSeller";

const Home = () => {
  return (
    <>
      <div className="">
        <Banner />
        <TopSeller/>
        <News/>
        <Footer/>
      </div>
    </>
  );
};

export default Home;
