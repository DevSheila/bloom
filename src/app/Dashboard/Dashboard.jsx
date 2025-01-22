import { Button } from "@/components/ui/button";
import SideNavbar from "@/elements/SideBar/SideBar";
import SideBar from "@/elements/SideBar/SideBar";
import { UpcomingTasks } from "@/elements/UpcomingTasks/UpcomingTasks";
import React from "react";
import { BsArrowUpRight, BsPlusLg } from "react-icons/bs";

function Dashboard() {
  return (
    <>
      <SideBar />

      <div className="h-screen p-0 sm:p-4 sm:ml-64 bg-slate-50">
        <div className="p-0 sm:p-2 md:mt-5">
          <div className="mx-auto max-w-screen-xl px-6 bg-slate-50">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 sm:space-y-0 sm:space-x-4">
              <div className="text-center sm:text-left flex-1">
                <p className="text-2xl font-bold self-center whitespace-nowrap dark:text-white">
                  Upcoming Tasks<span className="text-emerald-600">.</span>
                </p>

                <p className="text-base text-gray-500 dark:text-gray-400 hidden sm:block">
                  Stay on top of your plant care with these upcoming tasks
                  tailored to keep your plants thriving!
                </p>
              </div>

              {/* ADD TASK SECTION */}
              <div className="mt-4 sm:mt-0 sm:ml-4">
                <Button
                  size="sm"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 border-primary rounded-full text-white text-base sm:text-sm"
                >
                  <BsPlusLg className="h-5 w-5" /> Add Task
                </Button>
              </div>
            </div>
            <UpcomingTasks />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
