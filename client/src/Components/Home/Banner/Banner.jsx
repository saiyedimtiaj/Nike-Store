import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import {BiArrowBack} from 'react-icons/bi'
import slide1 from '../../../assets/slide-1.png'
import slide2 from '../../../assets/slide-2.png'
import slide3 from '../../../assets/slide-3.png'

const Banner = () => {
    return (
        <div className="text-white relative text-xl w-full">
              <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showIndicators={false} showStatus={false} renderArrowPrev={(clickHandelar,hasPrev)=>(
                <div onClick={clickHandelar} className="bottom-0 absolute z-10  flex justify-center items-center cursor-pointer text-sm py-1 w-6 right-7 md:right-9 md:w-8 md:py-1.5 md:text-lg  text-white bg-black">
                <BiArrowBack/>
            </div>
              )} renderArrowNext={(clickHandelar,hasNext)=>(
                <div onClick={clickHandelar} className="bottom-0 absolute z-10 right-0 flex justify-center items-center cursor-pointer py-1 w-6 text-sm md:w-8 md:py-1.5 md:text-lg  text-white bg-black">
                <BiArrowBack className="rotate-180" />
            </div>
              )}>
                <div>
                    <img src={slide1} />
                    <div className="px-2 py-1.5 text-xs md:px-4 md:py-2 md:text-base lg:px-6 lg:py-3  lg:text-xl lg:bottom-9 bottom-6 absolute bg-white text-black left-0 uppercase font-medium cursor-pointer">
                        Shop Now
                    </div>
                </div>
                <div>
                    <img src={slide2} />
                    <div className="px-2 py-1.5 text-xs md:px-4 md:py-2 md:text-base lg:px-6 lg:py-3  lg:text-xl lg:bottom-9 bottom-6 absolute bg-white text-black left-0 uppercase font-medium cursor-pointer">
                        Shop Now
                    </div>
                </div>
                <div>
                    <img src={slide3} />
                    <div className="px-2 py-1.5 text-xs md:px-4 md:py-2 md:text-base lg:px-6 lg:py-3  lg:text-xl lg:bottom-9 bottom-6 absolute bg-white text-black left-0 uppercase font-medium cursor-pointer">
                        Shop Now
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;