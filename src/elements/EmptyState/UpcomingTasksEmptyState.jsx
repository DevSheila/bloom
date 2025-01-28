import DiagnosisFormPage from "@/app/DiagnosisFormPage";
import React from "react";

function UpcomingTasksEmptyState() {
  return (
    <>
      <div className="absolute left-1/2 right-1/2 flex  w-full -translate-x-1/2 transform flex-col  md:w-1/2 mb-10 px-4">
        <div className="text-center">
          <img
            src="/plantcare2.svg"
            className="mx-auto w-1/4 h-1/4"
            alt="No Diagnosis yet"
          />

            <p className="font-bold self-center whitespace-nowrap dark:text-white text-xl lg:text-2xl md:text-2xl mr-2">
              Plant Parenthood Awaits
            </p>

          <p className="mt-4 text-gray-500 px-4">
            Let’s set some reminders for watering, feeding, or repotting. Your
            plants will thank you!
          </p>
        </div>
      </div>
    </>
  );
}

export default UpcomingTasksEmptyState;
