import React, { useEffect, useState } from "react";

function DiagnosisGallery({ diagnosis }) {
  const [activeImage, setActiveImage] = useState("");
  const [images, setImages] = useState([]);
  useEffect(() => {
    console.log("active image", diagnosis?.user_photos[0]);
    setActiveImage(diagnosis?.user_photos[0]);
    setImages(diagnosis?.user_photos);
  }, [diagnosis]);

  return (
    <>
      <div className="lg:col-span-3 lg:row-end-1">
        <div className="lg:flex lg:items-start">
          <div className="lg:order-2 lg:ml-5">
            <div className="max-w-xl overflow-hidden rounded-lg">
              {/* CURRENTLY ACTIVE IMAGE */}
              <img
                className="h-96 w-96 max-w-full object-cover" // Fixed size for the active image
                src={activeImage}
                alt={activeImage}
              />
            </div>
          </div>

          {/* OTHER IMAGES THAT ONCE CLICKED BECOME THE ACTIVE IMAGE */}
          <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
            <div className="flex flex-row items-start lg:flex-col">
              {images?.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(image)} // Update active image on click
                  className={`flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 ${
                    activeImage === image
                      ? "border-emerald-600"
                      : "border-transparent"
                  } text-center`}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DiagnosisGallery;
