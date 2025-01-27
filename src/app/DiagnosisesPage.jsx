import React, { useEffect, useState } from "react";
import DiagnosisCard from "@/elements/DiagnosisCard";
import SpinLoader from "@/elements/Loaders/SpinLoader";
import SideNavbar from "@/elements/SideBar/SideBar";

import DiagnosisFormPage from "./DiagnosisFormPage";
import { getDiagnosisDataByUserId } from "@/services/diagnoseService";
import { useAuth } from "@/context/AuthContext";
import DiagnosisEmptyState from "@/elements/EmptyState/DiagnosisEmptyState";

const DiagnosisesPage = () => {
  const [diagnosis, setDiagnosis] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useAuth();

  useEffect(() => {
    if (user) {
      getDiagnosisDataByUserId(user?.id).then((records) => {
        setDiagnosis(records);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) {
    return <SpinLoader />;
  }
  return (
    <>
      <SideNavbar />
      <div className="h-screen p-4 sm:ml-64 ">
        <div className=" ">
          <div className="mx-auto max-w-screen-xl px-1 ">
            {/* Header Section */}
            <div className="flex flex-row justify-between items-center mb-1 mt-2 space-y-0">
              {/* Upcoming Tasks Title */}
              <div className="flex items-center flex-1">
                <p className="font-bold self-center whitespace-nowrap dark:text-white text-xl lg:text-2xl md:text-2xl mr-2">
                  Your Plant Diagnosis
                  <span className="text-emerald-600">.</span>
                </p>
              </div>

              <DiagnosisFormPage />
            </div>

            <p className="text-base text-gray-500 dark:text-gray-400 hidden sm:block mb-1">
              Your diagnostics history will appear here. Start by uploading an
              image to the plant health page.
            </p>

            <section>
              <div class="mx-auto max-w-screen-xl">
                <div class="grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">

                {diagnosis.length > 0 ? (
                diagnosis.map((diagnosis) => (
                  <DiagnosisCard diagnosis={diagnosis} key={diagnosis.id} />
                ))
              ) : (
                <>
                <DiagnosisEmptyState/>
                </>
              )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiagnosisesPage;
