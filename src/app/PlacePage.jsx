import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import AddressLink from "@/elements/AddressLink";
// import BookingWidget from '@/elements/BookingWidget';
import PlaceGallery from "@/elements/PlaceGallery";
import PerksWidget from "@/elements/PerksWidget";
import axiosInstance from "@/utilities/axios";
import SpinLoader from "@/elements/Loaders/SpinLoader";
import SideBar from "@/elements/SideBar/SideBar";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    if (!id) {
      return "";
    }

    setLoading(true);

    const getPlace = async () => {
      const { data } = await axiosInstance.get(`/places/${id}`);
      setPlace(data.place);
      setLoading(false);
    };
    getPlace();
  }, [id]);

  if (loading) {
    return <SpinLoader />;
  }

  if (!place) {
    return;
  }

  return (
    <>
      <SideBar />
      <div className="h-screen p-4 sm:ml-64 bg-slate-50">
        <div className=" ">
          <div className="mx-auto max-w-screen-xl px-1 bg-slate-50">
            <div className="mt-4 overflow-x-hidden px-8 pt-20 ">
              <h1 className="text-3xl">{place.title}</h1>

              <AddressLink placeAddress={place.address} />
              <PlaceGallery place={place} />

              <div className="mt-8 mb-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
                <div className="">
                  <div className="my-4 ">
                    <h2 className="text-2xl font-semibold">Description</h2>
                    {place.description}
                  </div>
                  Max number of guests: {place.maxGuests}
                  <PerksWidget perks={place?.perks} />
                </div>

                <div>
                  <p className="text-2xl font-semibold">
                    What this place offers
                  </p>

                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </div>
              </div>
              <div className="-mx-8 border-t bg-white px-8 py-8">
                <div>
                  <h2 className="mt-4 text-2xl font-semibold">Extra Info</h2>
                </div>
                <div className="mb-4 mt-2 text-sm leading-5 text-gray-700">
                  {place.extraInfo}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacePage;
