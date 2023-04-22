import React, { useState } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../Redux/store";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../Redux/auth/auth-selectors";
import { login } from "../../Redux/auth/auth-operations";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const notify = () => toast.error("Incorrect email or password");
  const isLoading = useSelector(selectIsLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(login({ email, password })).then((data) => {
      if (data.meta.requestStatus === "rejected") {
        notify();
        setPassword("");
      }
    });
  }

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <S.Page>
      <S.LeftSide>
        <S.Img src={Logo}></S.Img>
      </S.LeftSide>
      <S.RightSide>
        <S.Title>Welcome to Tasker</S.Title>
        <S.Subtitle>
          Please, insert your informations to access your tasks.
        </S.Subtitle>
        {isLoading && <S.Subtitle>LOADING...</S.Subtitle>}
        <form onSubmit={handleLogin}>
          <S.FieldName>Email</S.FieldName>
          <S.InputField
            value={email}
            id="email"
            onChange={handleEmail}
            placeholder="Insert your email"
            type="email"
            required
          ></S.InputField>
          <S.FieldName>Password</S.FieldName>
          <S.InputField
            value={password}
            id="password"
            onChange={handlePassword}
            placeholder="Insert your password"
            type="password"
            required
          ></S.InputField>

          <S.SignIn>Sign In</S.SignIn>
        </form>

        <S.Subtitle>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </S.Subtitle>
      </S.RightSide>
    </S.Page>
  );
};

export default Login;
