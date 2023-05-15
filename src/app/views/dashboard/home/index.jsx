import { useEffect, useState } from "react";

import SelectField from "components/fields/SelectField";

import { API_URL as url } from "config";
import { FcRemoveImage } from "react-icons/fc";

export default function Home(props) {
  const [medicalStudies, setMedicalStudies] = useState({});
  const [msImgDicomReq, setMsImgDicomReq] = useState("");
  const [imgDicoms, setImgDicoms] = useState(null);
  const [catGetImages, setCatGetImages] = useState("disabled");

  useEffect(() => {
    const getMedicalStudies = async () => {
      const req = await fetch(`${url}api/get/medic_study/all`);
      const res = await req.json();
      const serialAndDate = {};
      res["Estudios"].forEach(
        (ms) => (serialAndDate[ms.ma_id] = `${ms.ma_date_study} - ${ms.ma_id}`)
      );
      setMedicalStudies(serialAndDate);
    };
    getMedicalStudies();
  }, []);

  const handleMsImgDicomReq = (evt) => {
    const { target } = evt;
    const { value } = target;
    setMsImgDicomReq(value);
    setCatGetImages("");
  };

  const handleSummit = async (evt) => {
    evt.preventDefault();
    const req = await fetch(`${url}api/get/images/${msImgDicomReq}`);
    const res = await req.json();
    setImgDicoms(res.length !== 0 ? res : null);
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:items-center lg:justify-start">
      <div className="mt-5 grid w-full grid-cols-1 grid-rows-3 md:pl-4 lg:pl-0">
        <form className="row-span-1 flex items-center" onSubmit={handleSummit}>
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
            className={`relative top-2 ml-12 h-14 ${
              catGetImages === ""
                ? "rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white  dark:hover:bg-brand-300 dark:active:bg-brand-200"
                : "rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
            }`}
            disabled={catGetImages}
          >
            Solicitar
          </button>
        </form>
        {!imgDicoms ? (
          <div className="row-span-2 flex min-h-max flex-col items-center py-16">
            <FcRemoveImage className="h-28 w-28" />
            <span>Sin imágenes asociadas</span>
          </div>
        ) : (
          <div className="row-span-2 grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-4">
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
