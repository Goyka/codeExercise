import React from "react";
import axios from "axios";

const onRegisterUserApi = async (prop) => {
  try {
    const res = await axios.post(`https://prac.dev/api/${prop}`);
    if (res.status === 200) {
      alert("회원가입이 완료 되었습니다.");
    }
  } catch (err) {
    console.error(err);
  }
};

export const Input = () => {
  const onSubmit = async () => {
    try {
      await onRegisterUserApi("register");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={() => onSubmit()}>
        {!isUsernameOk ? (
          <>
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={setUsername}
            />
            <button onClick={() => setIsUsernameOk(true)}>중복확인</button>
          </>
        ) : (
          <>
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button>사용가능</button>
          </>
        )}
        <label htmlFor="password">비밀번호</label>\
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="chkPassword">비밀번호 확인</label>
        <input
          type="password"
          id="chkPassword"
          value={chkPassword}
          onChange={(e) =>
            setChkPassword(e.target.value, () => {
              if (password === chkPassword) {
                setIsPasswordOk(true);
              }
            })
          }
        />
        {isPasswordOk && (
          <>
            <span>비밀번호가 일치합니다.</span>
          </>
        )}
        <label htmlFor="name">성명</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="phoneNumber">연락처</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {!isEmailSent ? (
          <>
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={() => setIsEmailSent(true)}>
              이메일 인증 요청
            </button>
          </>
        ) : (
          <>
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button>인증 요청 발송</button>
            <label htmlFor="code">이메일 인증번호</label>
            <input
              type="text"
              id="code"
              value={valCode}
              onChange={(e) => setValCode(e.target.value)}
            />
            <button
              onClick={() => {
                if (res.data.validate) {
                  setIsCodeOk(true);
                }
              }}
            >
              인증 번호 등록
            </button>
          </>
        )}
        {isCodeOk && (
          <>
            <span>인증번호가 확인 되었습니다.</span>
          </>
        )}
        <button>회원가입</button>
      </form>
    </>
  );
};

function Join() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [chkPassword, setChkPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [valCode, setValCode] = useState("");
  const [isUsernameOk, setIsUsernameOk] = useState(false);
  const [isPasswordOk, setIsPasswordOk] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isCodeOk, setIsCodeOk] = useState(false);

  return (
    <>
      <Input
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        chkPassword={chkPassword}
        setChkPassword={setChkPassword}
        name={name}
        setName={setName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        email={email}
        setEmail={setEmail}
        valCode={valCode}
        setValCode={setValCode}
        isUsernameOk={isUsernameOk}
        setIsUsernameOk={setIsUsernameOk}
        isPasswordOk={isPasswordOk}
        setIsPasswordOk={setIsPasswordOk}
        isEmailSent={isEmailSent}
        setIsEmailSent={setIsEmailSent}
        isCodeOk={isCodeOk}
        setIsCodeOk={setIsCodeOk}
      />
    </>
  );
}

export default Join;
