/* eslint-disable react/prop-types */
import ReactSlider from "react-slider";
import "./style.css";

const PriceSlider = ({maxPrice,minPrice,value,setValue}) => {
  return (
    <div>
      <div className="flex justify-between items-center px-1 mt-2">
        <p>Start : {value[0]}</p>
        <p>End : {value[1]}</p>
      </div>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={[minPrice, maxPrice]}
        max={maxPrice}
        min={minPrice}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
};

export default PriceSlider;
