
import React, { useState } from "react";
import { GiWaterDrop, GiSpade, GiCrossMark, GiFarmer, GiPlantRoots } from "react-icons/gi";
import { IoCutSharp } from "react-icons/io5";
import {
  PiBinocularsDuotone,
  PiMapPinArea,
  PiRulerThin,
  PiStethoscopeFill,
} from "react-icons/pi";

const PlantSchedule = ({ scheduleData }) => {
  const [selectedDay, setSelectedDay] = useState(scheduleData[0]?.day); // Initialize with the first day's date

  
  // Icons mapping
  const conditionIcons = {
    Watering: <GiWaterDrop className="text-blue-500 text-sm" />,
    Pruning: <IoCutSharp className="text-green-500 text-sm" />,
    Treatment: <PiStethoscopeFill className="text-pink-500 text-sm" />,
    Fertilizing: <GiSpade className="text-amber-500 text-sm" />,
    Prevention: <GiCrossMark className="text-red-500 text-sm" />,
    Monitoring: <PiRulerThin className="text-emerald-500 text-sm" />,
    Observation: <PiBinocularsDuotone className="text-indigo-500 text-sm" />,
    Maintenance: <GiFarmer className="text-blue-500 text-sm" />,
    Environment: <PiMapPinArea className="text-yellow-500 text-sm" />,
    Soil: <GiPlantRoots className="text-amber-500 text-sm" />,
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="flex flex-col w-full max-w-lg my-4">
      {/* Day Headers */}
      <div className="flex flex-row overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 space-x-2 p-2">
        {scheduleData.map((item) => (
          <div
            key={item.day}
            onClick={() => handleDayClick(item.day)}
            className={`text-sm font-medium cursor-pointer whitespace-nowrap ${
              item.day === selectedDay
                ? "bg-green-100 text-green-700 rounded-md p-2"
                : "text-gray-500 rounded-md border border-emerald-600 p-2"
            }`}
          >
            <div>{new Date(item.day).toLocaleDateString(undefined, { weekday: "short" })}</div>
            <div className="text-xs font-normal">
              {new Date(item.day).getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Action Cards */}
      <div>
        {scheduleData.map((item) => {
          if (item.day !== selectedDay) {
            return null; // Only render for the selected day
          }

          return (
            <div key={item.day} className="bg-white py-4 mb-2">
              <p className="text-sm font-medium text-gray-500">
                {new Date(item.day).toLocaleDateString(undefined, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              {item.actions &&
                item.actions.map((action, index) => (
                  <div
                    key={`${item.day}-action-${index}`}
                    className="flex items-center gap-4 border rounded-lg p-4 bg-white mb-2"
                  >
                    <div>{conditionIcons[action.category]}</div>
                    <div>
                      <span className="text-xs text-gray-400 font-medium uppercase">
                        {action.category}
                      </span>
                      <p className="text-sm text-gray-700">
                        {action.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlantSchedule;
