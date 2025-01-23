import React, { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa"; // Import check and circle icons

export const works = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1605351720698-6cfec9eb9b5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhbnQlMjBjYXJlfGVufDB8fDB8fHww",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1605449669573-8abe6d34d583?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBsYW50JTIwY2FyZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1711790670823-fe7d09e6e4d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1605351720698-6cfec9eb9b5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhbnQlMjBjYXJlfGVufDB8fDB8fHww",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1605449669573-8abe6d34d583?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBsYW50JTIwY2FyZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1711790670823-fe7d09e6e4d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function UpcomingTasks() {
  const [selectedImages, setSelectedImages] = useState([]);  // Track selected images as an array

  const handleImageClick = (index) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(index)) {
        // If the image is already selected, deselect it
        return prevSelectedImages.filter((id) => id !== index);
      } else {
        // Otherwise, select the image
        return [...prevSelectedImages, index];
      }
    });
  };

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4 py-1">
        {works.map((artwork, index) => (
          <figure
            key={artwork.artist}
            className="relative shrink-0"
            onClick={() => handleImageClick(index)} // Add click handler
          >
            <div className="relative overflow-hidden rounded-md">
              <img
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className="aspect-[3/4] object-cover w-[200px] h-[200px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px] xl:w-[200px] xl:h-[200px]"
              />
              <div className="absolute inset-0 bg-black/50 flex items-end p-2">
                <span className="text-xs font-semibold text-white">
                  Photo by {artwork.artist}
                </span>
              </div>
              {/* Default circle icon or check mark depending on selection */}
              <div className="absolute top-2 right-2">
                {selectedImages.includes(index) ? (
                  <FaCheckCircle className="text-white text-xl" /> // Check mark when selected
                ) : (
                  <FaRegCircle className="text-white text-xl" /> // Circle by default
                )}
              </div>
            </div>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ); 
}
