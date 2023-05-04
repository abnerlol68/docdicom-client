import { useState } from "react";

import InputField from "components/fields/InputField";
import SelectField from "components/fields/SelectField";
import Alert from "components/alerts/Alert";

import { API_URL as url } from "config";

export default function CreateUsers(props) {
  const [valuesForm, setValuesForm] = useState({
    u_email: "",
    u_name: "",
    u_last_name: "",
    u_last_m_name: "",
    u_password: "",
    u_phone: "",
    u_status_p: "A",
    u_s_id: "",
  });

  const [typeUser, setTypeUser] = useState("10000002");

  const [formAlert, setFormAlert] = useState({
    enable: false,
    type: "info",
    message: "",
  });

  const handleSummit = async (evt) => {
    evt.preventDefault();

    let req = null;

    if (typeUser === "10000002") {
      const bodyReq = { ...valuesForm };
      delete bodyReq.u_s_id;

      req = await fetch(`${url}api/register/10000002`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyReq),
      });
    } else if (typeUser === "10000000" || typeUser === "10000001") {
      req = await fetch(`${url}api/register/${typeUser}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(valuesForm),
      });
    }

    const res = await req.json();

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

    const newValuesForm = {
      ...valuesForm,
      [name]: value,
    };

    setValuesForm(newValuesForm);
  };

  const handleTypeUser = (evt) => {
    const { target } = evt;
    const { value } = target;

    setTypeUser(value);
  };

  return (
    <div className="mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <Alert
          enable={formAlert.enable}
          type={formAlert.type}
          message={formAlert.message}
        />
        <SelectField
          id="type_user"
          label="Tipo de usuario"
          extra="mb-3"
          variant="auth"
          name="type_user"
          val={typeUser}
          change={handleTypeUser}
          options={{
            10000002: "Paciente",
            10000001: "Médico",
            10000000: "Adiministrador",
          }}
        />
        <form onSubmit={handleSummit}>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Nombre"
            placeholder="Nombre"
            id="u_name"
            name="u_name"
            type="text"
            val={valuesForm.u_name}
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
            val={valuesForm.u_last_name}
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
            val={valuesForm.u_last_m_name}
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
            val={valuesForm.u_email}
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
            val={valuesForm.u_password}
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
            val={valuesForm.u_phone}
            change={handleChange}
          />
          <SelectField
            id="u_status_p"
            label="Estado"
            extra="mb-3"
            variant="auth"
            name="u_status_p"
            val={valuesForm.u_status_p}
            change={handleChange}
            options={{ A: "Activo", D: "Inactivo" }}
          />
          {/* Conditional render for user specialty */}
          {typeUser !== "10000002" && (
            <SelectField
              id="u_s_id"
              label="Especialidad"
              extra="mb-3"
              variant="auth"
              name="u_s_id"
              val={valuesForm.u_s_id}
              change={handleChange}
              options={{
                10000000: "Cardiología Clínica",
                10000001: "Cirugía Pediátrica",
                10000002: "Cirugía General",
                10000003: "Gastroenterología",
                10000004: "Hematología",
                10000005: "Neumología",
                10000006: "Ortopedia",
                10000007: "Otorrinolaringología",
                10000008: "Radiología e Imagen",
                10000009: "Cirugía Oncológica",
              }}
            />
          )}

          {/* Button Submit */}
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
