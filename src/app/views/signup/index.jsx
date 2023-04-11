import { useState } from "react";

import InputField from "components/fields/InputField";
import Alert from "components/alerts/Alert";

import { API_URL as url } from "config";

export function SignUp() {
  const [values, setValues] = useState({
    u_email: "",
    u_name: "",
    u_last_name: "",
    u_last_m_name: "",
    u_password: "",
    u_phone: "",
  });

  const [formAlert, setFormAlert] = useState({
    enable: false,
    type: "info",
    message: "",
  });

  const handleSummit = async (evt) => {
    evt.preventDefault();

    const req = await fetch(`${url}api/register/10000002`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const res = await req.json();

    console.log(res);

    if (res.mensaje === "Usuario registrado.") {
      setFormAlert({
        enable: true,
        type: "success",
        message: "Petición de registro exitosa",
      });
    }
  };

  const handleChange = (evt) => {
    const { target } = evt;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <Alert enable={formAlert.enable} type={formAlert.type} message={formAlert.message} />
        <form onSubmit={handleSummit}>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Nombre"
            placeholder="Nombre"
            id="u_name"
            name="u_name"
            type="text"
            val={values.u_name}
            change={handleChange}
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Primer Apellido"
            placeholder="Primer Apellido"
            id="u_last_name"
            name="u_last_name"
            type="text"
            val={values.u_last_name}
            change={handleChange}
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Segundo Apellido"
            placeholder="Segundo Apellido"
            id="u_last_m_name"
            name="u_last_m_name"
            type="text"
            val={values.u_last_m_name}
            change={handleChange}
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Correo Electronico"
            placeholder="mail@simmmple.com"
            id="u_email"
            name="u_email"
            type="email"
            val={values.u_email}
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
            val={values.u_password}
            change={handleChange}
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Telefono"
            placeholder="7749087645"
            id="u_phone"
            name="u_phone"
            type="tel"
            val={values.u_phone}
            change={handleChange}
          />
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
