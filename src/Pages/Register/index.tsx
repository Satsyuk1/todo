import React, { useState } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../Redux/store";
import { toast } from "react-toastify";
import { selectIsLoading } from "../../Redux/auth/auth-selectors";
import { useSelector } from "react-redux";
import { register } from "../../Redux/auth/auth-operations";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const notify = () => toast.error("A user with the same email already exists");
  const isLoading = useSelector(selectIsLoading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(register({ name, email, password })).then((data) => {
      if (data.meta.requestStatus === "rejected") {
        console.log("aboba");
        notify();
        setEmail("");
      }
    });
  }

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
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
          Please, create your account to access your tasks.
        </S.Subtitle>
        {isLoading && <S.Subtitle>LOADING...</S.Subtitle>}
        <form onSubmit={handleRegister}>
          <S.FieldName>Name</S.FieldName>
          <S.InputField
            value={name}
            id="name"
            onChange={handleName}
            placeholder="Insert your name"
            required
          ></S.InputField>
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

          <S.SignIn>Sign Up</S.SignIn>
        </form>

        <S.Subtitle>
          Already have an account? <Link to="/login">Sign In</Link>
        </S.Subtitle>
      </S.RightSide>
    </S.Page>
  );
};

export default Register;
