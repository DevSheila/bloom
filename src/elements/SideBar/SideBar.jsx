import React, { useEffect, useState } from "react";
// ICONS, IMAGES
import {
  SlEnvolope,
  SlHome,
  SlLogout,
  SlSettings,
  SlUser,
} from "react-icons/sl";
import { SlLayers } from "react-icons/sl";
import { SlDoc } from "react-icons/sl";
import { SlCamera } from "react-icons/sl";
import whitCurvedImg from "/pricing/white-curved.jpeg";
// CLERK
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

function SideNavbar() {
  const location = useLocation();

  const path = location.pathname;

  const { user, isLoaded, isSignedIn } = useUser();

  const [isOpen, setIsOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev); // Toggle the sidebar state
  };

  const closeSidebar = () => {
    setIsOpen(false); // Close sidebar
  };
  return (
    <>
      <div className="flex items-center justify-start rtl:justify-end sm:hidden bg-transparent py-2 bg-slate-50">
        <button
          onClick={toggleSidebar} // Add click event to toggle sidebar
          data-drawer-target="logo-sideNavbar"
          data-drawer-toggle="logo-sideNavbar"
          aria-controls="logo-sideNavbar"
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-emerald-600 hover:text-white hover:rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sideNavbar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <a href="/" className="flex py-2 pl-4">
          <img src="/logo.svg" className="h-6 me-3 sm:h-7" alt=" Logo" />
          <span className="text-2xl font-bold self-center  whitespace-nowrap dark:text-white">
            <span className="text-emerald-600">Bloom</span>
          </span>
        </a>
      </div>

      <aside
        id="logo-sideNavbar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-5 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white shadow-sm sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="SideNavbar"
      >
        <div className="h-full flex flex-col px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          {/* CLOSE ICON */}
          <div className="flex items-center mb-3 sm:hidden">
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5  inline-flex justify-center items-center w-6 h-6 text-emerald-900   pt-2"
              data-dismiss-target="#dropdown-cta"
              aria-label="Close"
              onClick={closeSidebar}
            >
              <span className="sr-only transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                Close
              </span>
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          {/* LOGO */}
          <a href="/" className="flex items-center ps-2.5 mb-10">
            <img src="/logo.svg" className="h-6 me-3 sm:h-7" alt=" Logo" />
            <span className="text-2xl font-bold self-center  whitespace-nowrap dark:text-white">
              <span className="text-emerald-600">Bloom</span>.
            </span>
          </a>
          {/* NAV ITEMS  */}
          <ul className="space-y-2 font-medium flex-grow">
            {[
              {
                name: "Resume Builder",
                href: "/resumebuilder",
                icon: SlDoc,
              },
              {
                name: "Mock Interview",
                href: "/mockinterview",
                icon: SlCamera,
              },
              {
                name: "Templates",
                href: "/templates",
                icon: SlLayers,
              },
            ].map((item) => (
              <li key={item.name}>
                <Link to={item.href}>
                  <div
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-emerald-600 hover:text-white hover:rounded-xl dark:hover:bg-gray-700 group transition-all ease-linear duration-100 ${
                      path == item.href &&
                      "bg-emerald-600 text-white rounded-xl"
                    } `}
                  >
                    <item.icon
                      className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white ${
                        path === item.href && "text-white"
                      }`}
                    />
                    <span className="ms-3">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* BOTTOM SECTION  */}
          <div className="mt-auto">
            <div
              className="p-4 rounded-xl bg-cover bg-center "
              style={{ backgroundImage: `url(${whitCurvedImg})` }}
            >
              <Button className="rounded-xl mb-3 w-full bg-emerald-800 hover:bg-emerald-700">
                <a href="/upgrade"> Upgrade to Pro</a>
              </Button>

              <p className="mb-3 text-sm text-emerald-800 dark:text-emerald-400 ">
              Unlock exclusive tools and advanced AI features with Bloom. Don’t settle for ordinary—let your plants thrive and bloom extraordinarily!
              </p>
            </div>

            <hr className="my-2 border-emerald-gray-50" />

            <div class=" flex justify-between items-center w-full mt-1">
              <div class="flex justify-center items-center  space-x-2">
                <div>
                  <UserButton />
                </div>
                <div class="flex justify-start flex-col items-start">
                  <p class="cursor-pointer text-sm leading-5 text-gray-900 capitalize ">
                    {/* {user.firstName ||"FirstName"} {user.lastName || "LastName"}  */} First Name
                  </p>
                  <p class="cursor-pointer text-xs leading-3 text-gray-700">
                    {/* {user?.emailAddresses?.[0]?.emailAddress ||
                      "No email available"} */}Email
                  </p>
                </div>
              </div>
              <SlSettings />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideNavbar;
