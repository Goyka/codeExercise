import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://prac.dev/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const useFetch = () => {
  const getDataApi = async (props) => {
    try {
      const res = await api.get(`${props}`);
      if (res.status === 200) {
        // imp -> important
        const impDatas = res.data;
        return impDatas.map((data) => ({
          title: data.title,
          author: data.author,
          viewCount: data.viewCount,
          likes: data.likes,
          postId: data.postId,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };
  return { getDataApi };
};

export const Threads = ({ impDatas }) => {
  return (
    <>
      {impDatas.map((data) => (
        <div key={data.postId}>
          <h4 onClick={() => navigate(`/${data.postId}`)}>{data.title}</h4>
          <span>{data.author}</span>
          <span>{data.viewCount}</span>
          <span>{data.likes}</span>
        </div>
      ))}
    </>
  );
};

function Board() {
  const [impDatas, setImpDatas] = useState([]);
  const { getDataApi } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataApi("/");
      setImpDatas(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Threads impDatas={impDatas} />
    </>
  );
}
export default Board;
