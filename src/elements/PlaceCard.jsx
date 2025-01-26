import React from "react";
import { Link } from "react-router-dom";

const PlaceCard = ({ diagnosis }) => {
  const { id, plant_name, diagnosis_title, user_photos } = diagnosis;
  return (
    <Link to={`/diagnosis/${id}`} className="m-4 flex flex-col md:m-2 xl:m-0">
      <div className="card ">
        {user_photos?.[0] && (
          <img
            src={`${user_photos?.[0]}`}
            className="h-4/5 w-full rounded-xl object-cover"
          />
        )}
        <span className="font-semibold">{plant_name} </span>
        <h3 className="truncate text-sm text-gray-500">{diagnosis_title}</h3>
      </div>
    </Link>
  );
};

export default PlaceCard;
