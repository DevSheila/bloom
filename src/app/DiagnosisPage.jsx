import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import SpinLoader from "@/elements/Loaders/SpinLoader";
import { getDiagnosisDataById } from "@/services/diagnoseService";
import DiagnosisGallery from "@/elements/DiagnosisGallery/DiagnosisGallery";
import SideNavbar from "@/elements/SideBar/SideBar";
import { IoWaterOutline, IoSunnyOutline } from "react-icons/io5";
import { FaTemperatureHigh } from "react-icons/fa";
import { GiWaterDrop, GiPlantRoots } from "react-icons/gi";
import PlantSchedule from "@/elements/PlantSchedule/PlantSchedule";

function DiagnosisPage() {
  const { id } = useParams();
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("careRules"); // Tracks the active tab

  useEffect(() => {
    if (!id) {
      return;
    }

    setLoading(true);
    getDiagnosisDataById(id).then((records) => {
      setDiagnosis(records);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <SpinLoader />;
  }

  if (!diagnosis) {
    return null;
  }

  // Icons mapping
  const conditionIcons = {
    temperature: <FaTemperatureHigh className="text-red-500 text-xl" />,
    light: <IoSunnyOutline className="text-yellow-500 text-xl" />,
    humidity: <GiWaterDrop className="text-blue-500 text-xl" />,
    soil_type: <GiPlantRoots className="text-brown-500 text-xl" />,
    watering: <IoWaterOutline className="text-emerald-500 text-xl" />,
  };

  return (
    <>
      <SideNavbar />
      <div className="h-screen p-4 sm:ml-64">
        <div className="container mx-auto px-4">
          <div className="lg:col-gap-12 xl:col-gap-16 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <DiagnosisGallery diagnosis={diagnosis} />

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              {/* Overview */}
              <h1 className="sm:text-2xl font-bold text-gray-900 sm:text-3xl">
                {diagnosis?.plant_name}
              </h1>
              <h2 className="text-base text-gray-900">
                {diagnosis?.diagnosis_title}
              </h2>
              <p className="mt-1 text-left text-sm font-medium text-gray-600">
                {diagnosis?.overview}
              </p>

              {/* Symptoms */}
              <div className="mt-2">
                <h2 className="text-base text-gray-900">Symptoms</h2>
                <ul className="space-y-2 list-disc">
                  {diagnosis?.symptoms.map((symptom, index) => (
                    <li
                      key={index}
                      className="text-left text-sm font-medium text-gray-600"
                    >
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Causes */}
              <div className="mt-2">
                <h2 className="text-base text-gray-900">Causes</h2>
                <ul className="space-y-2 list-disc">
                  {diagnosis?.causes.map((cause, index) => (
                    <li
                      key={index}
                      className="text-left text-sm font-medium text-gray-600"
                    >
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Treatment */}
              <div className="mt-2">
                <h2 className="text-base text-gray-900">Treatment</h2>
                <ul className="space-y-2 list-disc">
                  {diagnosis?.treatment_and_management.map(
                    (treatment, index) => (
                      <li
                        key={index}
                        className="text-left text-sm font-medium text-gray-600"
                      >
                        {treatment.recommendation}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Prevention */}
              <div className="mt-2">
                <h2 className="text-base text-gray-900">Prevention</h2>
                <ul className="space-y-2 list-disc">
                  {diagnosis?.prevention?.map((prevent, index) => (
                    <li
                      key={index}
                      className="text-left text-sm font-medium text-gray-600"
                    >
                      {prevent}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3">
              {/* Tabs */}
              <div className="border-b border-gray-300">
                <div className="flex gap-4">
                  <button
                    className={`py-4 text-sm font-medium ${
                      activeTab === "careRules"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600 hover:border-gray-400 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveTab("careRules")}
                  >
                    Care Rules
                  </button>
                  <button
                    className={`py-4 text-sm font-medium ${
                      activeTab === "careCalendar"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600 hover:border-gray-400 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveTab("careCalendar")}
                  >
                    Care Calendar
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "careRules" && (
                <div className="my-2 flow-root">
                  <h1 className="text-3xl font-bold">Care Rules</h1>
                  <div className="space-y-4">
                    {Object.entries(diagnosis?.environmental_conditions).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center gap-4 border rounded-lg p-4 shadow-sm bg-white"
                        >
                          <div>{conditionIcons[key]}</div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-800 capitalize">
                              {key.replace("_", " ")}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {value.ideal}
                            </p>
                            <p className="text-sm text-gray-600">
                              {value.description}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {activeTab === "careCalendar" && (
                <div className="my-2 flow-root">
                  <h1 className="text-3xl font-bold">Care Calendar</h1>
                  <h2 className="text-base text-gray-900">
                    {diagnosis?.conclusion}
                  </h2>
                  <div>
                    <PlantSchedule
                      scheduleData={diagnosis?.schedule_for_recovery}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DiagnosisPage;
