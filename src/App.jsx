import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./Component/SideBar";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Dashboard from "./Screens/Dashboard";
import NavBar from "./Component/NavBar";

function Layout() {
  const location = useLocation();
  const hideSidebarRoutes = ["/", "/register"];

  return (
    <div className="flex">
      <div className="flex1">
        {/* {!hideSidebarRoutes.includes(location.pathname) && <NavBar />} */}
        {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}

        {/* <div className="flex-1 p-6"> */}
        {/* <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes> */}
        {/* </div> */}
      </div>
      <div className="flex2">
        {!hideSidebarRoutes.includes(location.pathname) && <NavBar />}
        {/* {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />} */}

        {/* <div className="flex-1 p-6"> */}
        {/* <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes> */}
        {/* </div> */}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
