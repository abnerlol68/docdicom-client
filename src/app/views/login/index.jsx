import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import InputField from "components/fields/InputField";
import { UserCtx } from "app/context/UserCtx";

import { API_URL as url } from "config";

export function Login(props) {
  const { setIsLogged } = useContext(UserCtx);

  const [credentials, setCredentials] = useState({
    u_email: "",
    u_password: "",
  });

  const handleChange = (evt) => {
    const { target } = evt;
    const { name, value } = target;

    const newCredential = {
      ...credentials,
      [name]: value,
    };

    setCredentials(newCredential);
  };

  const handleSummit = async (evt) => {
    evt.preventDefault();

    const req = await fetch(`${url}api/validate/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const res = await req.json();
    const userRes = res.usuario;

    if (userRes) {
      localStorage.setItem("user", JSON.stringify(userRes));
      setIsLogged(true);
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <form onSubmit={handleSummit}>
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Login
          </h4>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Ingrese su correo y contraseña
          </p>
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Correo Electronico"
            placeholder="mail@simmmple.com"
            id="u_email"
            name="u_email"
            type="email"
            val={credentials.u_email}
            change={handleChange}
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Contraseña"
            placeholder="zom3P455"
            id="u_password"
            name="u_password"
            type="password"
            val={credentials.u_password}
            change={handleChange}
          />
          <button
            type="submit"
            id="btnSummit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Sign In
          </button>
          <div className="mt-4">
            <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
              ¿Aun no te has registrado?
            </span>
            <Link
              to="/signup"
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Solicita tu resgistro
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
