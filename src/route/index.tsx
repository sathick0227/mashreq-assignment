import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../screens/login";
import Dashboard from "../screens/dashboard";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
