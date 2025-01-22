import { Button } from "@/components/ui/button";
import SideNavbar from "@/elements/SideBar/SideBar";
import SideBar from "@/elements/SideBar/SideBar";
import Tip from "@/elements/Tip/Tip";
import { UpcomingTasks } from "@/elements/UpcomingTasks/UpcomingTasks";
import React from "react";
import { BsArrowUpRight, BsPlusLg } from "react-icons/bs";

function Dashboard() {
  return (
    <>
      <SideBar />

      <div className="h-screen p-4 sm:ml-64 bg-slate-50">
        <div className=" ">
          <div className="mx-auto max-w-screen-xl px-1 bg-slate-50">
            <Tip />

            {/* Header Section */}
            <div className="flex flex-row justify-between items-center mb-1 mt-2 space-y-0">
              {/* Upcoming Tasks Title */}
              <div className="flex items-center flex-1">
                <p className="font-bold self-center whitespace-nowrap dark:text-white text-xl lg:text-2xl md:text-2xl mr-2">
                  Upcoming Tasks<span className="text-emerald-600">.</span>
                </p>
              </div>

              {/* ADD TASK SECTION */}
              <div className="ml-2">
                <Button
                  size="sm"
                  className="flex items-center gap-2 px-2 py-2 bg-emerald-700 hover:bg-emerald-500 focus:bg-emerald-500 border-primary rounded-full text-white text-sm"
                >
                  <BsPlusLg className="h-5 w-5 text-white" />{" "}
                  <span className="hidden md:block"> Add Task </span>
                </Button>
              </div>
            </div>

            <p className="text-base text-gray-500 dark:text-gray-400 hidden sm:block mb-1">
              Stay on top of your plant care with these upcoming tasks tailored
              to keep your plants thriving!
            </p>

            {/* Upcoming Tasks Component */}
            <UpcomingTasks />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
