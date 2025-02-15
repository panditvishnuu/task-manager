"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Menu, X, Home, ListChecks, Folder, Settings } from "lucide-react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "Tasks", icon: <ListChecks size={20} /> },
    { name: "Projects", icon: <Folder size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex w-60 bg-gradient-to-br from-black to-slate-900 text-white h-screen p-6 flex-col shadow-lg">
        <h2 className="text-xl font-bold tracking-wide mb-6"></h2>
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-300 ${
                active === item.name ? "bg-gray-800" : "hover:bg-gray-700"
              }`}
              onClick={() => setActive(item.name)}
            >
              {item.icon} <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg"
      >
        <Menu size={24} />
      </Button>

      {/* Sidebar for mobile */}
      {isOpen && (
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          exit={{ x: -250 }}
          className="fixed top-0 left-0 w-64 h-full bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6 flex flex-col z-50 shadow-xl"
        >
          <Button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 bg-gray-700 p-2 rounded-lg"
          >
            <X size={24} />
          </Button>
          <h2 className="text-xl font-bold tracking-wide mb-6">Task Manager</h2>
          <nav className="space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-300 ${
                  active === item.name ? "bg-gray-800" : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActive(item.name);
                  setIsOpen(false);
                }}
              >
                {item.icon} <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </motion.div>
      )}

      {/* Main content */}
      <div className="flex-1 flex-row p-6">
        <div className="max-w-4xl mx-auto p-6 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </div>
  );
}
