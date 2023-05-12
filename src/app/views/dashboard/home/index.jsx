import { useEffect, useState } from "react";

import SelectField from "components/fields/SelectField";

import { API_URL as url } from "config";
import { FcRemoveImage } from "react-icons/fc";

export default function Home(props) {
  const [medicalStudies, setMedicalStudies] = useState({});
  const [msImgDicomReq, setMsImgDicomReq] = useState("");
  const [imgDicoms, setImgDicoms] = useState(null);

  useEffect(() => {
    const getMedicalStudies = async () => {
      const req = await fetch(`${url}api/get/medic_study/all`);
      const res = await req.json();
      const serialAndDate = {};
      res["Estudios"].forEach(
        (ms) =>
          (serialAndDate[ms.ma_mi_id] = `${ms.ma_date_study} - ${ms.ma_mi_id}`)
      );
      setMedicalStudies(serialAndDate);
    };
    getMedicalStudies();
  }, []);

  const handleMsImgDicomReq = (evt) => {
    const { target } = evt;
    const { value } = target;
    setMsImgDicomReq(value);
  };

  const handleSummit = async (evt) => {
    evt.preventDefault();
    const req = await fetch(`${url}api/get/images/${msImgDicomReq}`);
    const res = await req.json();
    setImgDicoms(res.length !== 0 ? res : null);
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:items-center lg:justify-start">
      <div className="mt-5 w-full grid grid-cols-1 grid-rows-3 md:pl-4 lg:pl-0">
        <form className="flex items-center row-span-1" onSubmit={handleSummit}>
          <SelectField
            id="appointment_id"
            label="Selecciona un estudio"
            extra="mb-3"
            variant="auth"
            name="appointment_id"
            change={handleMsImgDicomReq}
            options={medicalStudies}
            extraLabel="!text-xl"
            extraSelect="my-3"
          />
          <button
            type="submit"
            id="btnSummit"
            className="relative top-2 ml-12 h-14 rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white  dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Solicitar
          </button>
        </form>
        {!imgDicoms ? (
          <div className="flex flex-col items-center min-h-max row-span-2 py-16">
            <FcRemoveImage className="w-28 h-28" />
            <span>Sin imágenes asociadas</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 place-items-center gap-4 row-span-2 sm:grid-cols-2 md:grid-cols-4">
            {imgDicoms.map((img) => {
              return (
                <img
                  src={`data:image/png;base64,${img.imagen}`}
                  key={img.id}
                  className="w-[256px]"
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
