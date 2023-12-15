import React, { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `https://prac.dev/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

const loginApi = async ({ setIsToken, setErrMessage }) => {
  try {
    const res = await api.post({
      username,
      password,
    });
    if (res.status === 200) {
      res.cookie("access", accessToken);
      setIsToken((prev) => !prev);
    } else {
      setErrMessage(res.message);
    }
  } catch (error) {
    console.error(error);
  }
};

function customHooks02() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [isToken, setIsToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isToken) {
      alert("이미 로그인 된 유저입니다. 메인으로 이동합니다.");
      navigate("/");
    }
  }, []);

  const onLoginHandler = async () => {
    setIsLoading(true);
    try {
      await loginApi({ setIsToken, setErrMessage });
      alert("로그인에 성공하였습니다!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
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
      {errMessage && <span>{{ errMessage }}</span>}
      <button onClick={onLoginHandler}>Login</button>
      {isLoading && <Spinner />}
    </>
  );
}

export default customHooks02;
