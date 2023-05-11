import React from "react";

import FixedPlugin from "components/fixedPlugin/FixedPlugin";

import LandingView, { LandingHeader as HeaderLD } from "app/views/landing";

export default function Landing(props) {
  document.documentElement.dir = "ltr";

  return (
    <div className="flex h-full w-full">
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <FixedPlugin />
        {/* Header */}
        <HeaderLD />

        <LandingView />
      </div>
    </div>
  );
}
