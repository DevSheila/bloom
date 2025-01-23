import React, { useState } from "react";
import axiosInstance from "@/utilities/axios";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FaCheckCircle, FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { SlCloudUpload } from "react-icons/sl";

const PhotosUploader = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setphotoLink] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: filename } = await axiosInstance.post("/upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => [...prev, filename]);
      setphotoLink("");
    } catch (error) {
      console.error("Error uploading photo by link", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    setLoading(true);
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    try {
      const { data: filenames } = await axiosInstance.post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      });
      setAddedPhotos((prev) => [...prev, ...filenames]);
    } catch (error) {
      console.error("Error uploading photos", error);
    } finally {
      setLoading(false);
    }
  };

  const removePhoto = (filename) => {
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  };

  const selectAsMainPhoto = (e, filename) => {
    e.preventDefault();
    setAddedPhotos([
      filename,
      ...addedPhotos.filter((photo) => photo !== filename),
    ]);
  };

  return (
    <div className="p-4 space-y-4">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex space-x-4 py-1">
            {addedPhotos?.length > 0 &&
              addedPhotos.map((link) => (
                <figure key={link} className="relative shrink-0">
                  <div className="relative overflow-hidden rounded-md">
                    <img
                      src={link}
                      className="aspect-[3/4] object-cover w-[100px] h-[100px]"
                      alt="Uploaded"
                    />

                    <button
                      onClick={() => removePhoto(link)}
                      className="absolute top-2 right-2 flex h-3 w-3 items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                    >
                      <FaTrash className="text-white text-xl" />
                    </button>

                    <button
                      onClick={(e) => selectAsMainPhoto(e, link)}
                      className="absolute bottom-2 left-2 flex h-4 w-4 items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                    >
                      {link === addedPhotos[0] ? (
                        <FaStar className="text-white text-xl" />
                      ) : (
                        <FaRegStar className="text-white text-xl" />
                      )}
                    </button>
                  </div>
                </figure>
              ))}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}

      <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-400 bg-gray-100 p-4 text-gray-600 hover:bg-gray-200 hover:border-gray-500 transition-all duration-200">
        <input type="file" multiple className="hidden" onChange={uploadPhoto} />

        <SlCloudUpload className="h-8 w-8 text-gray-400" />
        <span className="mt-2 text-sm font-medium">
          Drag and drop or click to upload
        </span>
      </label>
    </div>
  );
};

export default PhotosUploader;
