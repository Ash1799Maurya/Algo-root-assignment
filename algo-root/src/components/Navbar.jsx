import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, User as UserIcon, Trash2 } from "lucide-react";
import logo from "../assets/algoroot_logo-BvclIMjb.png";

const Navbar = () => {
  const { user, signOut, deleteAccount } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-3 flex justify-between items-center w-full fixed top-0 left-0 z-50">
      
      <div className="flex items-center">
        <img src={logo} alt="Algo Root Logo" className="h-8 w-auto sm:h-10" />
      </div>

      
      {user && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 transition focus:outline-none"
          >
            <UserIcon className="h-6 w-6 text-gray-700 sm:h-7 sm:w-7" />
          </button>

        
          {showDropdown && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-50"
              style={{ minWidth: "10rem" }}
            >
              <button
                onClick={signOut}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </button>
              <button
                onClick={deleteAccount}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete Account
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
