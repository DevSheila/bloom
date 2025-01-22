import React from "react";

function SpinLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500 border-solid border-opacity-50"></div>
    </div>
  );
}

export default SpinLoader;
