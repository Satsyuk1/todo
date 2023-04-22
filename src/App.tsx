import GlobalStyle from "./global";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import CategoriePage from "./Pages/Categorie";
import { useAppDispatch } from "./Redux/store";
import { useSelector } from "react-redux";
import { selectIsFetchingUser } from "./Redux/auth/auth-selectors";
import { useEffect } from "react";
import { getCurrentUser } from "./Redux/auth/auth-operations";
import Register from "./Pages/Register";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();
  const isFetchingUser = useSelector(selectIsFetchingUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {isFetchingUser ? (
        <div></div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute component={<Home />} redirectTo="/login" />}
          />
          <Route
            path="/login"
            element={<PublicRoute component={<Login />} redirectTo="/" />}
          />
          <Route
            path="/register"
            element={<PublicRoute component={<Register />} redirectTo="/" />}
          />
          <Route
            path="/categorie/:name"
            element={
              <PrivateRoute component={<CategoriePage />} redirectTo="/login" />
            }
          ></Route>
        </Routes>
      )}

      <GlobalStyle />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
