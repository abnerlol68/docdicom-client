import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

export default function Landing(props) {
  document.documentElement.dir = "ltr";

  return (
    <div className="flex h-full w-full">
      <button className="rounded-xl border-2 border-blue-500 px-5 py-3 text-base font-medium text-blue-500 transition duration-200 hover:bg-blue-600/5 active:bg-blue-700/5 dark:border-blue-400 dark:bg-blue-400/10 dark:text-white dark:hover:bg-blue-300/10 dark:active:bg-blue-200/10">
        Landing Page
      </button>
    </div>
  );
}
