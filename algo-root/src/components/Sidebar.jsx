import React, { useState, useEffect } from "react";
import { LayoutDashboard, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <>
      
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      
      <div
        className={`fixed lg:relative bg-gray-900 text-white w-64 min-h-screen p-6 flex flex-col transition-transform transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:flex z-50`}
      >
        <div className="text-2xl font-bold mb-6 tracking-wide">Dashboard</div>

        <div className="space-y-4">
          <button className="flex items-center space-x-3 px-4 py-3 w-full text-lg font-medium rounded-lg transition-all duration-200 bg-gray-800 hover:bg-gray-700">
            <LayoutDashboard className="h-6 w-6 text-indigo-400" />
            <span>Details</span>
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
