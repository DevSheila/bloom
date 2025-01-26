import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpinLoader from "@/elements/Loaders/SpinLoader";
import axios from "axios";
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
import { BsPlusLg } from "react-icons/bs";
import { useAuth } from "@/context/AuthContext";
import { savePlantDiagnosisDataToFirebase } from "@/services/diagnoseService";
import { Loader2 } from "lucide-react";

const DiagnosisFormPage = () => {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { user } = useAuth();
  const [formData, setFormData] = useState({ description: "" });
  const [messageIndex, setMessageIndex] = useState(0);
  const navigate = useNavigate();

  const diagnosisMessages = [
    "Asking the plant gods for advice...",
    "Watering the ideas...",
    "Leafing through the plant manual...",
    "Photosynthesizing the data...",
    "Counting chlorophyll molecules...",
    "Branching out to find solutions...",
  ];

  const { description } = formData;

  const saveDiagnosis = async (e) => {
    e.preventDefault();
    setIsDiagnosing(true);
    if (!isValidPlaceData()) return;

    const diagnosisData = { ...formData, addedPhotos };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_OTHER_BASE_URL}/diagnose`,
        diagnosisData
      );
      const diagnosisId = await savePlantDiagnosisDataToFirebase(
        response.data.data,
        user,
        addedPhotos
      ); // Save diagnosis data
      setIsDiagnosing(false);
      toast.success("Diagnosis successful "); // Success message
      navigate(`/diagnosis/${diagnosisId}`); // Redirect to /diagnosis/:id
    } catch (error) {
      console.log(error);
      setIsDiagnosing(false);
      toast.error("There was an error submitting the diagnosis. Please try again."); // Error message
    }
  };

  const isValidPlaceData = () => {
    if (description.trim() === "") {
      toast.error("Description can't be empty!");
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    return description.trim() !== "";
  };

  useEffect(() => {
    if (isDiagnosing) {
      setCurrentMessage(diagnosisMessages[0]); // Set initial message
      const interval = setInterval(() => {
        setMessageIndex(
          (prevIndex) => (prevIndex + 1) % diagnosisMessages.length
        );
      }, 3000); // Change message every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isDiagnosing]);

  useEffect(() => {
    if (isDiagnosing) {
      setCurrentMessage(diagnosisMessages[messageIndex]);
    }
  }, [messageIndex, isDiagnosing]);

  if (redirect) {
    return <Navigate to={"/diagnosis"} />;
  }

  if (loading) {
    return <SpinLoader />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="ml-2">
          <Button
            size="sm"
            className="flex items-center gap-2 p-1 bg-emerald-700 hover:bg-emerald-500 focus:bg-emerald-500 border-primary rounded-full text-white text-sm"
          >
            <BsPlusLg className="h-5 w-5 text-white" />{" "}
            <span className="hidden md:block"> Start a Diagnosis </span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ask Our Plant Doctor</DialogTitle>
          <DialogDescription>
            Get tailored advice for your plant's specific needs. Simply provide
            photos and describe the symptoms.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={saveDiagnosis}>
          <div className="grid gap-4 py-4">
            <Textarea
              name="description"
              value={description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the problem ..."
              className="h-[100px]"
            />
            <PhotosUploader
              addedPhotos={addedPhotos}
              setAddedPhotos={setAddedPhotos}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-500 focus:bg-emerald-500 rounded-full flex items-center justify-center"
              disabled={
                isDiagnosing || !isFormValid() || addedPhotos.length === 0
              }
            >
              {isDiagnosing ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />{" "}
                  {diagnosisMessages[messageIndex]}
                </>
              ) : (
                "Diagnose"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DiagnosisFormPage;
