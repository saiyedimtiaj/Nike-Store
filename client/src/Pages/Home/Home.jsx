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
      </div>
    </>
  );
};

export default Home;
