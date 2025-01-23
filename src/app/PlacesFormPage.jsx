import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SpinLoader from "@/elements/Loaders/SpinLoader";
import axiosInstance from "@/utilities/axios";
import PhotosUploader from "@/elements/PhotosUploader";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    perks: [],
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 10,
    price: 500,
  });

  const { title, address, description, maxGuests } = formData;

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axiosInstance.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      setFormData((prev) => ({ ...prev, ...place }));
      setAddedPhotos([...place.photos]);
      setLoading(false);
    });
  }, [id]);

  const savePlace = async (e) => {
    e.preventDefault();

    if (!isValidPlaceData()) return;

    const placeData = { ...formData, addedPhotos };

    if (id) {
      await axiosInstance.put("/places/update-place", { id, ...placeData });
    } else {
      await axiosInstance.post("/places/add-places", placeData);
    }
    setRedirect(true);
  };

  const isValidPlaceData = () => {
    if (title.trim() === "") {
      toast.error("Title can't be empty!");
      return false;
    } else if (address.trim() === "") {
      toast.error("Address can't be empty!");
      return false;
    } else if (addedPhotos.length < 5) {
      toast.error("Upload at least 5 photos!");
      return false;
    } else if (description.trim() === "") {
      toast.error("Description can't be empty!");
      return false;
    } else if (maxGuests < 1 || maxGuests > 10) {
      toast.error("Guests must be between 1 and 10!");
      return false;
    }

    return true;
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  if (loading) {
    return <SpinLoader />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile and save changes when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={savePlace}>
          <div className="grid gap-4 py-4">
            <Textarea
              name="description"
              value={description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your place..."
              className="h-[100px]"
            />
            <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlacesFormPage;
