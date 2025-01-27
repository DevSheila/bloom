import React, { useState } from "react";
import { GiWaterDrop,  GiSpade, GiCrossMark, GiFarmer } from "react-icons/gi";
import { PiBinocularsDuotone, PiRulerThin } from "react-icons/pi";

const PlantSchedule = ({ scheduleData }) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [selectedDay, setSelectedDay] = useState(
    new Date(scheduleData[0].day).toLocaleDateString(undefined, {
      weekday: "short",
    })
  ); // Initialize with the first day

  // Icons mapping
  const conditionIcons = {
    Watering: <GiWaterDrop className="text-blue-500 text-sm" />,
    Fertilizing: <GiSpade className="text-amber-500 text-sm" />,
    Prevention: <GiCrossMark  className="text-red-500 text-sm" />,
    Monitoring: <PiRulerThin className="text-emerald-500 text-sm" />,  
    Observation: <PiBinocularsDuotone className="text-indigo-500 text-sm" />,
    Maintenance: <GiFarmer  className="text-yellow-500 text-sm" />,
  };


  const handleDayClick = (day, index) => {
    const dateString = new Date(
      new Date().setDate(new Date().getDate() + index)
    ).toLocaleDateString(undefined, { weekday: "short" });
    setSelectedDay(dateString);
  };

  return (
    <div className="flex flex-col w-full max-w-lg my-4">
      {/* Day Headers */}
      <div className="flex flex-row justify-between ">
        {daysOfWeek.slice(0, 6).map((day, index) => (
          <div
            key={day}
            onClick={() => handleDayClick(day, index)}
            className={`text-sm font-medium cursor-pointer ${
              new Date(
                new Date().setDate(new Date().getDate() + index)
              ).toLocaleDateString(undefined, { weekday: "short" }) ===
              selectedDay
                ? "bg-green-100 text-green-700 rounded-md p-2"
                : "text-gray-500 rounded-md border border-emerald-600  p-2"
            }`}
          >
            {day}
            <div className={"text-xs font-normal"}>
              {new Date(new Date().setDate(new Date().getDate() + index))
                .getDate()
                .toString()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Action Cards */}
        <div className=" ">
          {scheduleData.map((item, i) => {
            const itemDay = new Date(item.day).toLocaleDateString(undefined, {
              weekday: "short",
            });

            if (itemDay !== selectedDay) {
              return null; // Only render the card for selectedDay
            }

            return (
              <div key={item.day + i} className={"bg-white py-4 mb-2 "}>
                <p className={"text-sm font-medium text-gray-500"}>
                  {new Date(item.day).toLocaleDateString(undefined, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                {item.actions &&
                  item.actions.map((action, actionIndex) => (
                    <div
                      key={action.description + actionIndex}
                      className="flex items-center gap-4 border rounded-lg p-4  bg-white mb-2"
                    >
                      <div>{conditionIcons[action.category]}</div>
                      <div>
                        <span
                          className={
                            "text-xs text-gray-400 font-medium uppercase"
                          }
                        >
                          {action.category}
                        </span>
                        <p className={"text-sm text-gray-700 "}>
                          {action.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            );
          })}

          {/* Cute message for days with no actions */}
          {scheduleData.every(
            (item) =>
              new Date(item.day).toLocaleDateString(undefined, {
                weekday: "short",
              }) !== selectedDay
          ) && (
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md mt-2 mb-2">
              <p className="text-sm font-medium">
                "Nothing planned today! Time to relax and let your plants enjoy the calm. 🌱"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantSchedule;
