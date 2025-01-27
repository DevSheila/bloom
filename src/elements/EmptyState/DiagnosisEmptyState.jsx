import DiagnosisFormPage from "@/app/DiagnosisFormPage";
import React from "react";

function DiagnosisEmptyState() {
  return (
    <>
      <div className="absolute left-1/2 right-1/2 flex  w-full -translate-x-1/2 transform flex-col  md:w-1/2 mb-10">
        <div className="text-center">
          <img
            src="/plantcare1.svg"
            className="mx-auto w-3/4 h-3/4"
            alt="No Diagnosis yet"
          />

          <h1 className=" text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Grow Healthy
          </h1>

          <p className="mt-4 text-gray-500">
            Don’t leave your plant’s health to chance!we’re here to help every
            step of the way.
          </p>
        </div>
      </div>
    </>
  );
}

export default DiagnosisEmptyState;
