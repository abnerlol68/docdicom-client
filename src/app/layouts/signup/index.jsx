import React from "react";
import { Link } from "react-router-dom";

import FixedPlugin from "components/fixedPlugin/FixedPlugin";

import { SignUp as SignUpView } from "app/views/signup";

export default function Signup(props) {

  document.documentElement.dir = "ltr";

  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className={`mx-auto min-h-screen`}>
          {/* Header */}

          {/* Main */}
          <Link to="/" className="mt-0 w-max lg:pt-10">
            Go back
          </Link>
          <SignUpView />

          {/* Footer */}
        </main>
      </div>
    </div>
  );
}
