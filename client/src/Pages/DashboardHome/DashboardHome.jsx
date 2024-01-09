import troppy from "../../assets/trophy-icon.svg";
import sales from "../../assets/growth-icon.svg";

const DashboardHome = () => {
  return (
    <div className="mt-3 flex gap-3">
      <div
        className="flex justify-between w-96 items-end px-3 py-3 mb-1"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        <div>
          <h1 className="text-xl font-medium">Shop with Nike</h1>
          <p>Congratulation</p>
          <h1 className="text-[26px] mt-2 mb-3">420.8K</h1>
          <button className="bg-[#1876D2] text-white px-2 py-1 rounded font-medium">
            VIEW SALES
          </button>
        </div>
        <div>
          <img className="h-28" src={troppy} alt="" />
        </div>
      </div>
      <div
        className="w-full px-3 py-3"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        <h1 className="text-xl font-medium">Monthly Overview</h1>
        <h1 className="my-2 flex gap-1 text-sm">
          <p className="font-semibold">Total 48% groth </p> this month
        </h1>
        <div className="grid grid-cols-4 gap-3">
          <div className="flex gap-1 items-center">
            <img className="w-10" src={sales} alt="" />
            <div>
              <h1 className="text-sm">Sales</h1>
              <h1 className="text-2xl">30K</h1>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <img className="w-10" src={sales} alt="" />
            <div>
              <h1 className="text-sm">Sales</h1>
              <h1 className="text-2xl">30K</h1>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <img className="w-10" src={sales} alt="" />
            <div>
              <h1 className="text-sm">Sales</h1>
              <h1 className="text-2xl">30K</h1>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <img className="w-10" src={sales} alt="" />
            <div>
              <h1 className="text-sm">Sales</h1>
              <h1 className="text-2xl">30K</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
