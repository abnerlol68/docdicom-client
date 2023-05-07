import { useState } from "react";

import { API_URL as url } from "config";

export default function UploadDicoms(props) {
  const [dicomFiles, setDicomFiles] = useState(null);

  const handleDicomFiles = (evt) => {
    const { target } = evt;
    const { files } = target;

    if (files) {
      setDicomFiles(files);
    }
  };

  const handleSummit = (evt) => {
    evt.preventDefault();

    if (!dicomFiles) {
      console.error("Need a dicom");
      return;
    }

    const dicoms = new FormData();
    const files = dicomFiles ? [...dicomFiles] : [];
    files.forEach((file, i) => {
      dicoms.append(`dicom-${i}`, file, file.name);
    });

    let req = null;

    // req = await fetch(`${url}api/register/guardar/dicoms/10000004`)
  };

  return (
    <div className="mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-6 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <form onSubmit={handleSummit}>
          <div className="mb-3">
            <label
              className={`ml-1.5 text-2xl font-medium text-navy-700 dark:text-white`}
            >
              Fecha de cita medica
            </label>
            <input
              type="date"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs pl-2 bg-white/0 p-3 outline-none dark:bg-navy-900"
            />
          </div>

          <div className="mb-3">
            <label
              // htmlFor={id}
              className={`ml-1.5 text-2xl font-medium text-navy-700 dark:text-white`}
            >
              Selecciona un archivo dicom
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              onChange={handleDicomFiles}
              multiple
            />
          </div>

          <button
            type="submit"
            id="btnSummit"
            className="rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
