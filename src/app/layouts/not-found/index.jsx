import React from "react";

import { NotFound as NotFoundView } from "app/views/not-found";
import { Link } from "react-router-dom";

export default function NotFound(props) {
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        {/* <FixedPlugin /> */}
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              {/* <E404 /> */}
              <section className="flex h-full items-center p-16 dark:bg-navy-900 dark:text-gray-100">
                <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
                  <div className="max-w-md text-center">
                    <NotFoundView />
                    <Link to="/" className="mt-0 w-max lg:pt-10">
                      <button className="rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                        Regresar
                      </button>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
