import React, { useEffect, useState } from "react";
import PlaceCard from "@/elements/PlaceCard";
import SpinLoader from "@/elements/Loaders/SpinLoader";
import axiosInstance from "@/utilities/axios";
import SideNavbar from "@/elements/SideBar/SideBar";
import { Button } from "@/components/ui/button";
import { BsPlusLg } from "react-icons/bs";
import PlacesFormPage from "./PlacesFormPage";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPlaces = async () => {
    const { data } = await axiosInstance.get("/places");
    setPlaces(data.places);
    setLoading(false);
  };
  useEffect(() => {
    getPlaces();
  }, []);

  if (loading) {
    return <SpinLoader />;
  }
  return (
    <>
      <SideNavbar />
      <div className="h-screen p-4 sm:ml-64 bg-slate-50">
        <div className=" ">
          <div className="mx-auto max-w-screen-xl px-1 bg-slate-50">
            {/* Header Section */}
            <div className="flex flex-row justify-between items-center mb-1 mt-2 space-y-0">
              {/* Upcoming Tasks Title */}
              <div className="flex items-center flex-1">
                <p className="font-bold self-center whitespace-nowrap dark:text-white text-xl lg:text-2xl md:text-2xl mr-2">
                  Your Plant Diagnosis
                  <span className="text-emerald-600">.</span>
                </p>
              </div>

              <PlacesFormPage />
            </div>

            <p className="text-base text-gray-500 dark:text-gray-400 hidden sm:block mb-1">
              Your diagnostics history will appear here. Start by uploading an
              image to the plant health page.
            </p>
            <div className="grid grid-cols-1 justify-items-center px-1 md:grid-cols-2 md:gap-0 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-10">
              {places.length > 0 ? (
                places.map((place) => (
                  <PlaceCard place={place} key={place._id} />
                ))
              ) : (
                <div className="absolute left-1/2 right-1/2 top-40 flex  w-full -translate-x-1/2 transform flex-col p-10  md:w-1/2">
                  <h1 className="text-3xl font-semibold">Result not found!</h1>
                  <p className="text-lg font-semibold">
                    Sorry, we couldn&#39;t find the place you&#39;re looking
                    for.
                  </p>
                  <button className="mt-4 w-32 rounded-full bg-primary p-2 text-white">
                    <a
                      href="/"
                      className="flex items-center justify-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-5 w-5"
                      >
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                      </svg>
                      Go back
                    </a>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacesPage;
