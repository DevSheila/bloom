import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

function NavBar() {
  const { user, isSignedIn } = useUser();
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <header className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 text-slate-700 md:mx-auto md:flex-row md:items-center">
        <a
          href="#"
          className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black"
        >
          <span className="mr-2 text-4xl text-green-500">
            <a href="#" className="flex items-center ">
              <img src="/logo.svg" className="h-6 me-3 sm:h-7" alt=" Logo" />
              <span className="text-2xl font-bold self-center  whitespace-nowrap dark:text-white">
                <span className="text-emerald-600">Bloom</span>.
              </span>
            </a>
          </span>
        </a>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-7 cursor-pointer md:hidden"
          for="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start"
        >
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <Link to={"/"}>
              <li
                className={`hover:text-emerald-700 hover:font-bold  transition-all cursor-pointer  md:mr-12  ${
                  path == "/" && "text-green-700 font-bold"
                }`}
              >
                Home
              </li>
            </Link>

            <Link to={"/dashboard"}>
              <li
                className={`hover:text-emerald-700 hover:font-bold  transition-all cursor-pointer  md:mr-12  ${
                  path == "/dashboard" && "text-green-700 font-bold"
                }`}
              >
                Dashboard
              </li>
            </Link>

            <li className="md:mr-12">
              {isSignedIn ? (
                <div>
                  <UserButton />
                </div>
              ) : (
                <Link to={"/login"}>
                  <button className="rounded-full border-2 border-green-500 px-6 py-1 text-green-600 transition-colors hover:bg-green-500 hover:text-white">
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
