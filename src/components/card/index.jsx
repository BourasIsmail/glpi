"use client";
import CountUp from "react-countup";

const Card = ({ name, count, svg, className }) => {
  return (
    <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-blue-200">
      <div className="p-3 rounded-full bg-indigo-300 bg-opacity-75">{svg}</div>
      <div className="mx-5">
        <h4 className="text-2xl font-semibold text-gray-700">
          <CountUp end={count} start={0} />
        </h4>
        <div className="text-gray-400">{name}</div>
      </div>
    </div>
  );
};

export default Card;
