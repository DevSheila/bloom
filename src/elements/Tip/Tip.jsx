import React from "react";
import { FaArrowDown, FaSync } from "react-icons/fa"; 

const Tip = () => {
  return (
    <div className="flex flex-col items-start max-w-md">
      <h2 className="font-bold mb-4 text-xl lg:text-2xl md:text-2xl mr-2 m-2">
        Did you know..
      </h2>

      <div className="bg-emerald-700 text-white rounded-2xl p-6 relative shadow-lg m-2 ">
        <span
          className="absolute inset-0 bg-emerald-400 rounded-2xl scale-10 opacity-30 skew-y-2"
          aria-hidden="true"
        ></span>
        <span
          className="absolute inset-0 bg-emerald-500 rounded-2xl scale-105 opacity-40 skew-y-3"
          aria-hidden="true"
        ></span>

        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <h3 className=" text-lg font-bold md:text-l">
              Houseplants Love Stability
            </h3>
          </div>
          <p className="mb-3 text-sm">
            Plants thrive once they are used to their surroundings! Light and
            temperature are important!
          </p>
        </div>
        <div className="flex justify-end mt-4  relative z-10">
          <FaSync className=" text-white text-lg" />
        </div>
      </div>
    </div>
  );
};

export default Tip;
