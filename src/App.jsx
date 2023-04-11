import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import ErrorLayout from "layouts/error";

const App = () => {
    return (
        <Routes>
            <Route path="auth/*" element={<AuthLayout/>}  />
            <Route path="admin/*" element={<AdminLayout/>}/>
            <Route path="rtl/*" element={<RtlLayout/>}/>
            <Route path="error/*" element={<ErrorLayout/>}/>
            <Route path="/" element={<Navigate to="/admin" replace/>}/>
            <Route path="*" element={<ErrorLayout/>}/>
        </Routes>
    );
};

export default App;
