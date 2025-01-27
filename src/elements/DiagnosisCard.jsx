import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const DiagnosisCard = ({ diagnosis }) => {
  const { id, plant_name, diagnosis_title, user_photos, createdAt } = diagnosis;

  // Convert Firestore Timestamp to readable date
  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "Unknown date";
  };

  const formattedDate = formatDate(createdAt);


  return (
    <>
      <Link to={`/diagnosis/${id}`} className=" flex flex-col md:m-2 xl:m-0">
        <article class="relative">
          <div class="aspect-square overflow-hidden">
            {user_photos?.[0] && (
              <img
                class="group-hover:scale-125 h-full w-full object-cover transition-all duration-300 rounded-xl"
                src={`${user_photos?.[0]}`}
              />
            )}
          </div>

            <div >
              <span className=" font-semibold line-clamp-1">{plant_name} </span>
              <h3 className=" text-sm text-gray-500 line-clamp-1 pt-1">
                {diagnosis_title}
              </h3>
              <p className=" text-xs text-gray-400 line-clamp-1 pt-1">{formattedDate}</p>
            </div>
        </article>
      </Link>
    </>
  );
};

export default DiagnosisCard;
