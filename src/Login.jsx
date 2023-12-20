import axios from "axios";
import React, { useState } from "react";

export const Input = ({
  onLoginHandler,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onLoginHandler}>로그인</button>
    </>
  );
};

const onLoginApi = async (userData) => {
  try {
    const res = axios.post("https://prac.dev/api/login", userData);
    if (res.status === 200) {
      return res.data.message;
    }
  } catch (err) {
    console.error(err);
  }
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userData = { username: username, password: password };

  const onLoginHandler = async () => {
    await onLoginApi(userData);
    alert(onLoginApi);
  };

  return (
    <>
      <Input
        onLoginHandler={onLoginHandler}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </>
  );
}

export default Login;
