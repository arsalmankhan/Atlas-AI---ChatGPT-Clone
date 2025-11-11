import React from "react";
import { Link } from "react-router-dom";

const AuthRequired = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-gray-200 px-4 animate-fadeIn">
      <div className="bg-[#111111]/70 backdrop-blur-xl border border-[#222] rounded-2xl p-8 w-full max-w-md shadow-[0_0_30px_rgba(0,0,0,0.4)]">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#1f1f1f] border border-[#333] flex items-center justify-center text-lg font-semibold">
            🔒
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-3 text-white">
          Login Required
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          You must be signed in to access this page.  
          Please log in to continue.
        </p>

        {/* Button */}
        <Link
          to="/login"
          className="
            block w-full text-center px-4 py-2 
            bg-white text-black font-medium rounded-lg
            hover:bg-[#e7e7e7] transition 
          "
        >
          Go to Login →
        </Link>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px bg-[#333] flex-1"></div>
          <span className="text-xs text-gray-500 uppercase tracking-wide">OR</span>
          <div className="h-px bg-[#333] flex-1"></div>
        </div>

        {/* Tiny Message */}
        <p className="mt-4 text-center text-[12px] text-gray-500">
          No account yet?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthRequired;
