export function NotFound() {
  return (
    <>
      <h2 className="mb-8 text-9xl font-extrabold dark:text-gray-600">
        <span className="sr-only">Error</span>
        <span className="text-gray-900 dark:text-gray-100">4</span>
        <span className="text-gray-600">0</span>
        <span className="text-gray-900 dark:text-gray-100">4</span>
      </h2>
      <p className="text-2xl font-semibold dark:text-gray-200 md:text-3xl">
        Lo sentimos,
      </p>
      <p className="mt-4 mb-8 dark:text-gray-400">
        No pudimos encontrar el recurso que buscabas pero puedes regresar a las
        páginas que ya están preparadas para ti
      </p>
    </>
  );
}
