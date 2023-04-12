import { Link, Routes, Route, Navigate } from "react-router-dom";
import routes from "routes.js";

export default function Error() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/error") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div>
      <div className="!bg-gray-250 relative float-right h-full min-h-screen w-full dark:!bg-navy-900">
        {/* <FixedPlugin /> */}
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              {/* <E404 /> */}
              <section className="flex h-full items-center p-16 dark:bg-navy-900 dark:text-gray-100">
                <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
                  <div className="max-w-md text-center">
                    <Routes>
                      {getRoutes(routes)}

                      <Route
                        path="/"
                        element={<Navigate to="/error" replace />}
                      />
                    </Routes>
                    <Link to="/admin" className="mt-0 w-max lg:pt-10">
                      <div className="rounded bg-gray-900 px-8 py-3 text-2xl font-semibold text-white dark:bg-blue-900 dark:text-gray-100">
                        Regresar
                      </div>
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
