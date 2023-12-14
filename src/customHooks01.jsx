import { useState, useEffect } from "react";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://prac.dev/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 *  @desc : 데이터를 get하는 Custom Hooks.
 *          부모 컴포넌트에서 사용자가 선택한 값을 가져와 사용한다.
 *          (만약 prop으로 넘어오는 값이 없으면 "")
 */

export const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getDataApi = async ({ selected }) => {
    setIsLoading((prev) => !prev);
    try {
      const res = await api.get(`/${selected}`);
      if (res.status === 200) {
        setData(res.data);
      }
      setIsLoading((prev) => !prev);
    } catch (error) {
      setIsError((prev) => !prev);
      console.error(error);
    } finally {
      return { data, isLoading, isError, getDataApi };
    }
  };
};

/**
 * @param {*} item
 * @returns : useFetch를 통해 서버에서 받은 데이터를 부모 컴포넌트에게서
 *            받아, 버거 메뉴를 카드 형태로 보여주는 컴포넌트.
 */

export const MenuCards = (item) => {
  return (
    <>
      <img src={item.pic} alt="picture" />
      <p>
        <h4>{item.name}</h4>
        <span>{item.price}</span>
        <span>{item.desc}</span>
      </p>
    </>
  );
};

/**
 * @returns : 버거 매장의 태블릿 주문 메뉴를 가정하고 개발.
 *            유저가 선택한 버튼에 따라, 다른 메뉴 카테고리를 보여준다.
 */

function customHooks01() {
  const { data, isLoading, isError, getDataApi } = useFetch();
  const [selected, setSelected] = useState("");
  const options = [burgers, sideDishes, beverages, setMenus];

  useEffect(() => {
    getDataApi(selected);
  }, [selected]);

  const onOptionHandler = (e) => {
    setSelected(e.target.value);
  };
  return (
    <>
      <div>
        {options.map((categories) => {
          <button onClick={(e) => onOptionHandler(e.target.value)}>
            {categories}
          </button>;
        })}
      </div>
      <>{isLoading && <span>Data Loading...</span>}</>
      <>{isError && <span>Something Wrong! Please Wait...</span>}</>
      <div>
        {data.map((item) => {
          <MenuCards item={item} />;
        })}
      </div>
    </>
  );
}
export default customHooks01;
