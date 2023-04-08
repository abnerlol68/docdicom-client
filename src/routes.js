import React from "react";

// Dashboard Imports
import Home from 'app/views/dashboard/home';
import CreateUsers from 'app/views/dashboard/create-users';
import SignupRequests from 'app/views/dashboard/signup-requests';
import UpDeUsers from 'app/views/dashboard/upde-users';

// Icon Imports
import {
  MdHome,
  MdPerson,
  MdPersonAdd,
  MdOutlinePersonAddDisabled,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/dashboard",
    path: "home",
    icon: <MdHome className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: "Crear Usuarios",
    layout: "/dashboard",
    path: "create-users",
    icon: <MdPerson className="h-6 w-6" />,
    component: <CreateUsers />,
  },
  {
    name: "Peticiones de Registro",
    layout: "/dashboard",
    path: "signup-requests",
    icon: <MdPersonAdd className="h-6 w-6" />,
    component: <SignupRequests />,
  },
  {
    name: "Acciones Sobre Usuarios",
    layout: "/dashboard",
    path: "upde-users",
    icon: <MdOutlinePersonAddDisabled className="h-6 w-6" />,
    component: <UpDeUsers />,
  },
];
export default routes;
