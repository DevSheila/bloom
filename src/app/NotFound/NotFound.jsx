import React from "react";

function NotFound() {
  return (
    <>
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <img
            src="/plantcare.svg"
            className="mx-auto w-1/2 sm:w-1/3 lg:w-1/4"
            alt="Logo"
          />
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </h1>

          <p className="mt-4 text-gray-500">
            This page has wilted away—let’s get you back to greener pastures 🌿.
          </p>
 
          <a
            href="/"
            class="mt-6 inline-block rounded-full bg-emerald-700 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-500 focus:bg-emerald-500 focus:outline-none focus:ring"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </>
  );
}

export default NotFound;
