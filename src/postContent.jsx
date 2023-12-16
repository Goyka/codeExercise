import React, { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `https://prac.dev/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

const usePost = () => {
  const [resp, setResp] = useState();
  const onPostHandler = async (prop, contents, setContents) => {
    try {
      const res = await api.post(`/${prop}`, contents);
      if (res.status === 200) {
        setResp(res.data.message);
        setContents({ title: "", content: "" });
      }
    } catch (error) {
      console.error(error);
    }
    return { resp, onPostHandler };
  };
};

export default function PostContent() {
  const [contents, setContents] = useState({
    title: "",
    content: "",
  });
  const { resp, onPostHandler } = usePost();
  const prop = "write";

  const sendPostData = async () => {
    try {
      await onPostHandler(prop, contents, setContents);
      alert(resp);
    } catch (error) {
      alert("문제가 생겼습니다.");
    }
  };

  return (
    <>
      <label htmlFor="posting">새로운 글 등록하기</label>
      <input
        type="text"
        id="title"
        value={contents.title}
        onChange={(e) => setContents({ ...contents, title: e.target.value })}
      />
      <textarea
        id="content"
        cols="30"
        rows="10"
        value={contents.content}
        onChange={(e) => setContents({ ...contents, content: e.target.value })}
      />
      <button onClick={() => sendPostData()}>등록하기</button>
      <button>뒤로가기</button>
    </>
  );
}
