import { useEffect, useState } from "react";

import Alert from "components/alerts/Alert";
import InputField from "components/fields/InputField";
import SelectField from "components/fields/SelectField";

import { API_URL as url } from "config";

export default function UpDeUsers(props) {
  const [usersList, setUsersList] = useState([]);
  const [users, setUsers] = useState({});
  const [isUserSelected, setIsUserSelected] = useState("disabled");
  const [userToUpDe, setUserToUpDe] = useState("");
  const [isGettedUserVal, setIsGettedUserVal] = useState(false);
  const [valUser, setValUser] = useState({
    u_email: "",
    u_name: "",
    u_last_name: "",
    u_last_m_name: "",
    u_password: "",
    u_phone: "",
    u_status_p: "A",
    u_s_id: "",
    u_r_id: "",
    u_id: "",
  });
  const [formAlert, setFormAlert] = useState({
    enable: false,
    type: "info",
    message: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      const req = await fetch(`${url}api/get/usuarios/all`);
      const res = await req.json();
      const usersSet = {};
      setUsersList(res["usuarios"]);
      res["usuarios"].forEach(
        (us) =>
          (usersSet[us.id] = `${us.last_m_name} ${us.last_name} - ${us.id}`)
      );
      setUsers(usersSet);
    };
    getUsers();
  }, []);

  const handleUserSelect = (evt) => {
    const { target } = evt;
    const { value } = target;
    setIsGettedUserVal(false);
    setFormAlert({
      enable: false,
      type: "info",
      message: "",
    });
    setUserToUpDe(value);
    setIsUserSelected("");
  };

  const handleUserToUpDe = (evt) => {
    evt.preventDefault();
    const userData = usersList.filter((user) => user.id == userToUpDe)[0];
    setValUser({
      u_name: userData.name,
      u_email: userData.email,
      u_last_name: userData.last_name,
      u_last_m_name: userData.last_m_name,
      u_password: userData.password || "",
      u_phone: userData.phone,
      u_status_p: userData.isActive,
      u_r_id: userData.role_id,
      u_s_id: userData.speciality_id,
      u_id: userToUpDe,
    });
    setIsGettedUserVal(true);
  };

  const handleChange = (evt) => {
    const { target } = evt;
    const { name, value } = target;

    const newValuesForm = {
      ...valUser,
      [name]: value,
    };

    setValUser(newValuesForm);
  };

  const handleSummit = async (evt) => {
    evt.preventDefault();

    const req = await fetch(`${url}api/update/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valUser),
    });
    if (req.ok) {
      setFormAlert({
        enable: true,
        type: "success",
        message: "Petición de actualización exitosa",
      });
    }
  };

  const handleDelete = async (evt) => {
    evt.preventDefault();
    const req = await fetch(`${url}api/delete/user/${userToUpDe}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "m_by_user": JSON.parse(localStorage.getItem("user")).id_user
      }),
    })
    if (req.ok) {
      setFormAlert({
        enable: true,
        type: "success",
        message: "Petición de eliminación exitosa",
      });
    }
  }

  return (
    <div className="mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-6 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0">
        <Alert
          enable={formAlert.enable}
          type={formAlert.type}
          message={formAlert.message}
        />
        {/* Select user to update or delete */}
        <form
          className="row-span-1 flex items-center"
          onSubmit={handleUserToUpDe}
        >
          <SelectField
            id="appointment_id"
            label="Selecciona un usuario"
            extra="mb-3"
            variant="auth"
            name="appointment_id"
            change={handleUserSelect}
            options={users}
            extraLabel="!text-xl"
            extraSelect="my-3"
          />
          <button
            type="submit"
            id="btnSummit"
            className={`relative top-2 ml-12 h-14 ${
              isUserSelected === ""
                ? "rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white  dark:hover:bg-brand-300 dark:active:bg-brand-200"
                : "rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
            }`}
            disabled={isUserSelected}
          >
            Solicitar
          </button>
        </form>
        {/* User fields */}
        <form
          onSubmit={handleSummit}
          className="flex flex-col rounded-lg bg-white p-4 dark:bg-navy-700 dark:text-white"
        >
          <div className="grid pb-3 lg:grid-cols-2 lg:gap-4">
            <SelectField
              id="type_user"
              label="Tipo de usuario"
              extra="mb-3"
              variant="auth"
              name="type_user"
              val={valUser.u_r_id}
              change={handleChange}
              disabled={!isGettedUserVal}
              options={{
                10000002: "Paciente",
                10000001: "Médico",
                10000000: "Adiministrador",
              }}
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Nombre"
              placeholder="Nombre"
              id="u_name"
              name="u_name"
              type="text"
              val={valUser.u_name}
              change={handleChange}
              disabled={!isGettedUserVal}
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Primer Apellido"
              placeholder="Primer Apellido"
              id="u_last_name"
              name="u_last_name"
              type="text"
              val={valUser.u_last_name}
              change={handleChange}
              disabled={!isGettedUserVal}
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Segundo Apellido"
              placeholder="Segundo Apellido"
              id="u_last_m_name"
              name="u_last_m_name"
              type="text"
              val={valUser.u_last_m_name}
              change={handleChange}
              disabled={!isGettedUserVal}
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Correo Electronico"
              placeholder="mail@simmmple.com"
              id="u_email"
              name="u_email"
              type="email"
              val={valUser.u_email}
              change={handleChange}
              disabled={!isGettedUserVal}
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Contraseña"
              placeholder="zom3P455"
              id="u_password"
              name="u_password"
              type="password"
              val={valUser.u_password}
              change={handleChange}
              disabled={!isGettedUserVal}
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Telefono"
              placeholder="7749087645"
              id="u_phone"
              name="u_phone"
              type="tel"
              val={valUser.u_phone}
              change={handleChange}
              disabled={!isGettedUserVal}
            />
            <SelectField
              id="u_status_p"
              label="Estado"
              extra="mb-3"
              variant="auth"
              name="u_status_p"
              val={valUser.u_status_p}
              change={handleChange}
              disabled={!isGettedUserVal}
              options={{ A: "Activo", D: "Inactivo" }}
            />
            {/* Conditional render for user specialty */}
            {valUser.u_r_id !== "10000002" && valUser.u_r_id !== "" && (
              <SelectField
                id="u_s_id"
                label="Especialidad"
                extra="mb-3"
                variant="auth"
                name="u_s_id"
                val={valUser.u_s_id}
                change={handleChange}
                disabled={!isGettedUserVal}
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
          </div>
          {/* Button Submit */}
          <button
            type="submit"
            id="btnSummit"
            className={
              !isGettedUserVal
                ? "btn !text-gray-200"
                : "rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            }
            disabled={!isGettedUserVal}
          >
            Actualizar
          </button>
        </form>
        {/* Delete user */}
        <form
          onSubmit={handleDelete}
          className="flex flex-col rounded-lg bg-white p-4 dark:bg-navy-700 dark:text-white"
        >
          <button
            type="submit"
            id="btnDelete"
            className={
              !isGettedUserVal
                ? "btn !text-gray-200"
                : "rounded-xl bg-red-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
            }
            disabled={!isGettedUserVal}
          >
            Eliminar
          </button>
        </form>
      </div>
    </div>
  );
}
