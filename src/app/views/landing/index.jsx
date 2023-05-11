import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";

import Img01 from "assets/img/app/landing/01.jpg";

export default function Landing(props) {
  return (
    <main className="min-h-screen px-12">
      <h1 className="text-center text-4xl font-semibold text-gray-800 dark:text-white">
        La solución para el manejo de imágenes médicas DICOM
      </h1>
      <div className="my-5 flex justify-center">
        <img src={Img01} alt="Landing Dicom" />
      </div>
      <p className="text-center">
        Texto de introducción: Bienvenido a DICOMNet, la plataforma de gestión
        de imágenes médicas DICOM líder en el mercado. Si trabajas en un entorno
        médico, sabes lo complicado que puede ser manejar grandes cantidades de
        imágenes médicas, ya sea para diagnóstico, investigación o simplemente
        almacenamiento. Con DICOMNet, podemos ayudarte a simplificar y agilizar
        este proceso. Nuestra plataforma permite subir, almacenar y compartir
        imágenes DICOM con facilidad y seguridad, lo que te permite enfocarte en
        lo que realmente importa: el bienestar de tus pacientes.
      </p>
      <div className="flex justify-center my-6">
        <Link to={`/signup`}>
          <button className="w-52 rounded-xl border-2 border-brand-500 px-5 py-3 text-base font-medium text-brand-500 transition duration-200 hover:bg-brand-600/5 active:bg-brand-700/5 dark:border-brand-400 dark:bg-brand-400/10 dark:text-white dark:hover:bg-brand-300/10 dark:active:bg-brand-200/10">
            Registrate
          </button>
        </Link>
      </div>
    </main>
  );
}

export function LandingHeader(props) {
  return (
    <header
      className={
        true
          ? "sticky top-0 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d] mb-2"
          : ""
      }
    >
      <nav className="flex w-99p items-center justify-between p-8">
        <div className={`flex items-center`}>
          <div className="font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
            <a>DOCDICOM</a>
          </div>
        </div>
        <div className="flex gap-3">
          <Link to={`/login`}>
            <button className="rounded-xl border-2 border-brand-500 px-5 py-3 text-base font-medium text-brand-500 transition duration-200 hover:bg-brand-600/5 active:bg-brand-700/5 dark:border-brand-400 dark:bg-brand-400/10 dark:text-white dark:hover:bg-brand-300/10 dark:active:bg-brand-200/10">
              Log in
            </button>
          </Link>
          <Link to={`/signup`}>
            <button className="flex flex-row items-center rounded-xl bg-brand-500 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              Sign Up <MdChevronRight className="text-lg" />
            </button>
          </Link>
        </div>
      </nav>
      <hr className="invisible my-0 mx-auto h-[1px] w-20p border-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </header>
  );
}
