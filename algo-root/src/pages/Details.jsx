import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";

const Details = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <Navbar />

      <div className="flex flex-1">
        
        <div
          className={`fixed md:relative md:flex transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>

        
        <main className="flex-1 p-6 md:p-8">
          
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden fixed top-4 left-4 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md"
          >
            {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          </button>

          <DataTable />
        </main>
      </div>
    </div>
  );
};

export default Details;
