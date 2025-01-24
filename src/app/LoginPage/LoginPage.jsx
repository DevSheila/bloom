import { LoginForm } from "@/components/login-form";
import React from "react";
import { SignIn as ClerkSignIn, useUser } from "@clerk/clerk-react";
import SpinLoader from "@/elements/Loaders/SpinLoader";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
  const { isLoaded } = useUser();
  const location = useLocation();
  const from = location.state?.from || "/";

  if (!isLoaded) {
    return <SpinLoader />;
  }

  return (
    <>
      <section class="bg-white">
        <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section class="relative flex h-32 items-end bg-emerald-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="/login/login_1.jpg"
              class="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div class="hidden lg:relative lg:block lg:p-12">
              <a class="block text-white" href="#">
                <span class="sr-only">Home</span>
              </a>

              <h2 class="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Bloom.
              </h2>

              <p class="mt-4 leading-relaxed text-white/90">
                Unlock the full potential of your plants. With Bloom, experience
                personalized care, expert diagnoses, and growth plans tailored
                just for your green friends.
              </p>
            </div>
          </section>

          <main class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div class="max-w-xl lg:max-w-3xl">
              <div class="relative -mt-16 block lg:hidden">
                <a
                  class="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                  href="/"
                >
                  <span class="sr-only">Home</span>

                  <img
                    src="/logo.svg"
                    className="h-6 me-3 sm:h-7"
                    alt=" Logo"
                  />
                </a>

                <h1 class="mt-2 text-2xl font-bold text-emerald-900 sm:text-3xl md:text-4xl">
                  Welcome to Bloom
                </h1>

                <p class="mt-4 leading-relaxed ">
                  Nurture your plants to perfection with Bloom. AI-driven
                  advice, diagnoses, and care plans to help your plants thrive
                  and bloom like never before.
                </p>
              </div>

              <ClerkSignIn
                afterSignInUrl={from}
                redirectUrl={from}
                routing="path"
                path="/login"
                signUpUrl="/login"
              />
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
