import React from "react";

function NavBar() {
  return (
    <>
      <header class="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 text-slate-700 md:mx-auto md:flex-row md:items-center">
        <a
          href="#"
          class="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black"
        >
          <span class="mr-2 text-4xl text-green-500">
            <a href="#" className="flex items-center ">
              <img src="/logo.svg" className="h-6 me-3 sm:h-7" alt=" Logo" />
              <span className="text-2xl font-bold self-center  whitespace-nowrap dark:text-white">
                <span className="text-emerald-600">Bloom</span>.
              </span>
            </a>
          </span>
        </a>
        <input type="checkbox" class="peer hidden" id="navbar-open" />
        <label
          class="absolute top-5 right-7 cursor-pointer md:hidden"
          for="navbar-open"
        >
          <span class="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
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
          class="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start"
        >
          <ul class="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li class="font-bold md:mr-12">
              <a href="/dashboard">Dashboard</a>
            </li>
            <li class="md:mr-12">
              <a href="#">Features</a>
            </li>
            <li class="md:mr-12">
              <a href="#">Support</a>
            </li>
            <li class="md:mr-12">
              <button class="rounded-full border-2 border-green-500 px-6 py-1 text-green-600 transition-colors hover:bg-green-500 hover:text-white">
                Login
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
