import React from "react";
import { Link } from "react-router-dom";

import FixedPlugin from "components/fixedPlugin/FixedPlugin";

import { Login as LoginView } from "app/views/login";

export default function Login(props) {
  document.documentElement.dir = "ltr";

  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className={`mx-auto min-h-screen`}>
          {/* Header */}

          {/* Main */}
          <Link to="/" className="mt-0 w-max lg:pt-10">
            <div className="flex h-fit w-fit hover:cursor-pointer">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                  fill="#A3AED0"
                />
              </svg>
              <p className="ml-3 text-sm text-gray-600">Back to Dashboard</p>
            </div>
          </Link>
          <LoginView />

          {/* Footer */}
        </main>
      </div>
    </div>
  );
}
