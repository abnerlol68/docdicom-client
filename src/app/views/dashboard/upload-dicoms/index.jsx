import { useState, useEffect } from "react";

import SelectField from "components/fields/SelectField";

import { API_URL as url } from "config";

export default function UploadDicoms(props) {
  // const [fileTest, setFileTest] = useState();
  const [institutes, setInstitutes] = useState({});
  const [categories, setCategories] = useState({});
  const [medicalStudyFields, setMedicalStudyFields] = useState({
    ms_date_study: "",
    ms_mi_id: "",
    ms_cs_id: "",
    ms_description: "",
    dicoms: [],
  });

  useEffect(() => {
    const getMedicalDate = async () => {
      const reqInstitutes = await fetch(`${url}api/get/institute/all`);
      const reqCategories = await fetch(`${url}api/get/categorias/all`);
      const resInstitutes = await reqInstitutes.json();
      const resCategories = await reqCategories.json();
      const institutesSet = {};
      const categoriesSet = {};
      resInstitutes["Institutos"].forEach(
        (ins) => (institutesSet[ins.mi_id] = ins.mi_institute)
      );
      resCategories["Categorias"].forEach(
        (cat) => (categoriesSet[cat.cs_id] = cat.cs_name)
      );
      setInstitutes(institutesSet);
      setCategories(categoriesSet);
    };
    getMedicalDate();
  }, []);

  const handleMedicalStudyFields = (evt) => {
    const { target } = evt;
    const { name, value, files } = target;

    const newValuesForm = {
      ...medicalStudyFields,
      [name]: files || value,
    };

    setMedicalStudyFields(newValuesForm);
  };

  const handleSummit = async (evt) => {
    evt.preventDefault();

    const medicalStudyWithoutDicoms = JSON.parse(
      JSON.stringify(medicalStudyFields)
    );
    delete medicalStudyWithoutDicoms.dicoms;
    const { dicoms } = medicalStudyFields;

    console.log({ "With dicoms": medicalStudyFields });
    console.log({ "Without dicoms": medicalStudyWithoutDicoms });
    console.log({ "Dicoms to upload": dicoms });

    const reqWithoutDicoms = await fetch(`${url}api/register/medical_study`, {
      // const reqWithoutDicoms = await fetch(`http://127.0.0.1:5050/api/dicom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicalStudyWithoutDicoms),
    });

    const resWithDicoms = await reqWithoutDicoms.json();
    console.log(resWithDicoms);
    const { medical_study_id } = resWithDicoms;

    [...dicoms].forEach(async (dicom) => {
      const dicomUp = new FormData();
      dicomUp.append("dicom", dicom, dicom.name);
      console.log({ "dicom to Upload": dicomUp });
      const reqUploadDicoms = await fetch(
        `${url}api/register/medical_study_dicom/${medical_study_id}`,
        {
          method: "POST",
          body: dicomUp,
        }
      );
      const resUploadDicoms = await reqUploadDicoms.json();
      console.log(resUploadDicoms);
    });
  };

  return (
    <div className="mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-6 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <form onSubmit={handleSummit}>
          <div className="mb-3 flex flex-col">
            <label
              htmlFor="ms_date_study"
              className={`ml-1.5 text-2xl font-medium text-navy-700 dark:text-white`}
            >
              Fecha de cita medica
            </label>
            <input
              id="ms_date_study"
              name="ms_date_study"
              type="date"
              value={medicalStudyFields.ms_date_study}
              onChange={handleMedicalStudyFields}
              className="file-input file-input-bordered file-input-primary w-full max-w-xs bg-white/0 p-3 pl-2 outline-none dark:bg-navy-900"
            />
          </div>
          <SelectField
            id="ms_mi_id"
            label="Selecciona un instituto"
            extra="mb-3"
            variant="auth"
            name="ms_mi_id"
            change={handleMedicalStudyFields}
            options={institutes}
          />
          <SelectField
            id="ms_cs_id"
            label="Selecciona un categoria"
            extra="mb-3"
            variant="auth"
            name="ms_cs_id"
            change={handleMedicalStudyFields}
            options={categories}
          />
          <div>
            <label
              htmlFor="ms_description"
              className={`ml-1.5 text-2xl font-medium text-navy-700 dark:text-white`}
            >
              Descripción de la cita médica
            </label>
            <textarea
              id="ms_description"
              name="ms_description"
              cols="30"
              rows="10"
              value={medicalStudyFields.ms_description}
              onChange={handleMedicalStudyFields}
              className="mt-2 flex w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm text-gray-800 outline-none"
            ></textarea>
          </div>
          <div className="mb-3">
            <label
              htmlFor="dicoms"
              className={`ml-1.5 text-2xl font-medium text-navy-700 dark:text-white`}
            >
              Selecciona un archivo dicom
            </label>
            <input
              id="dicoms"
              name="dicoms"
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              onChange={handleMedicalStudyFields}
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
