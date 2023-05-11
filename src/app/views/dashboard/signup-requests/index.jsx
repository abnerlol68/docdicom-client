import { useEffect, useState } from "react";

import { API_URL } from "config";

export default function SignupRequests(props) {
  const [users, setUsers] = useState([]);
  const [usersToActive, setUsersToActive] = useState([]);

  useEffect(() => {
    const reqUsers = async () => {
      const req = await fetch(`${API_URL}api/get/usuarios/all`);
      const { usuarios } = await req.json();
      setUsers(usuarios.filter((user) => user.isActive === "D"));
    };
    reqUsers();
  }, []);

  const handleSetActive = async (userId) => {
    const req = await fetch(`${API_URL}api/update/activate/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ m_by_user: userId }),
    });
    console.log(userId);
    const res = await req.text();
    console.log(res);
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="pt-2">
      {/* <button onClick={() => console.log(users)}>users</button> */}
      <div className="mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
        <div className="mt-4 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0">
          <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
            <table
              className="w-full"
              variant="simple"
              color="gray-500"
              mb="24px"
            >
              <thead>
                <tr>
                  <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                    Primer apellido
                  </th>
                  <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                    Segundo apellido
                  </th>
                  <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                    Email
                  </th>
                  <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                    Role
                  </th>
                  <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => {
                  return (
                    <tr
                      className="text-sm text-gray-800 dark:text-white"
                      key={i}
                    >
                      <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                        {user.last_name}
                      </td>
                      <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                        {user.last_m_name}
                      </td>
                      <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                        {user.email}
                      </td>
                      <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                        {user.role_name}
                      </td>
                      <td>
                        {/* <select
                          className="select select-bordered w-full max-w-xs rounded-xl border bg-white/0 p-3 outline-none dark:bg-navy-900"
                          defaultValue={user.isActive}
                          onChange={handleSetActive}
                          name={`statusOf${user.id}`}
                          id={`statusOf${user.id}`}
                        >
                          <option value="D">Inactivo</option>
                          <option value="A">Activo</option>
                        </select> */}
                        <button
                          className="rounded-xl bg-blue-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-300 dark:active:bg-blue-200"
                          onClick={() => handleSetActive(user.id)}
                        >
                          Activar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
