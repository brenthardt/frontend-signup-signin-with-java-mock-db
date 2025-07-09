import { Link, Route, Routes } from "react-router-dom";
import Users from "./Users.jsx";
import SignUp from "./signUp.jsx";
import SignIn from "./signIn.jsx";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "./notFound.jsx";
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const blockPage = ["/users"];
  useEffect(() => {
    if (blockPage.includes(location.pathname)) {
      if (localStorage.getItem("token") !== null) {
        navigate(location.pathname);
      } else {
        navigate("/notfound");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function deleteUser() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <>
      <div
        className={ " w-100 text-white p-2 gap-2 d-flex justify-content-center"}
      >
        <Link className={"btn btn-outline-dark"} to={"/users"}>
          Users
        </Link>
        <Link className={"btn btn-outline-dark"} to={"/signin"}>
          Sign In
        </Link>
        <Link className={"btn btn-outline-dark"} to={"/"}>
          Sign Up
        </Link>
        <button
          onClick={() => deleteUser()}
          className=" btn btn-danger text-red-500 "
        >
          Log Out
        </button>
      </div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/users" element={<Users />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
