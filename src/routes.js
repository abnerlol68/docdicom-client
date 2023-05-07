import React from "react";

// Dashboard Imports
import Home from "app/views/dashboard/home";
import CreateUsers from "app/views/dashboard/create-users";
import SignupRequests from "app/views/dashboard/signup-requests";
import UpDeUsers from "app/views/dashboard/upde-users";
import UploadDicoms from "app/views/dashboard/upload-dicoms";

// Icon Imports
import {
  MdHome,
  MdPerson,
  MdPersonAdd,
  MdOutlinePersonAddDisabled,
  MdFileUpload,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/dashboard",
    path: "home",
    access: [10000000, 10000001, 10000002],
    icon: <MdHome className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: "Subir Dicoms",
    layout: "/dashboard",
    path: "upload-dicoms",
    access: [10000000, 10000001],
    icon: <MdFileUpload className="h-6 w-6" />,
    component: <UploadDicoms />,
  },
  {
    name: "Crear Usuarios",
    layout: "/dashboard",
    path: "create-users",
    access: [10000000],
    icon: <MdPerson className="h-6 w-6" />,
    component: <CreateUsers />,
  },
  {
    name: "Peticiones de Registro",
    layout: "/dashboard",
    path: "signup-requests",
    access: [10000000],
    icon: <MdPersonAdd className="h-6 w-6" />,
    component: <SignupRequests />,
  },
  {
    name: "Acciones Sobre Usuarios",
    layout: "/dashboard",
    path: "upde-users",
    access: [10000000],
    icon: <MdOutlinePersonAddDisabled className="h-6 w-6" />,
    component: <UpDeUsers />,
  },
];
export default routes;
