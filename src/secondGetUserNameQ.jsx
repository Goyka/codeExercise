import { useEffect, useState } from "react";
import axios from "axios";

/**
 * 요청서
 * 1. api 요청을 파라미터로 전달하고, results의 수는 페이지 당 10개로 동적으로 할당한다.
 * 2. results를 state에 저장한다.
 * 3. state를 UI로 그려낸다.
 * 4. UserCard 컴포넌트를 생성하여 해당 정보를 보여준다. [ name, email, picture, location ]
 * 5. 배열 메소드 map을 이용하여 UserCard 리스트를 보여준다.
 * 6. 카드 삭제 버튼을 구현 한다.
 * 7. 10개의 UserCard를 더 불러올 수 있도록 하는 버튼을 만든다.
 */

const UserCard = (userData, setCount, deleteUserInfo) => {
  const { picture, name, email, location } = userData;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <button
          onClick={() => {
            setCount((prev) => prev + 10);
            getUsersInfo();
          }}
        >
          fetch more
        </button>
      </div>
      <div style={{ display: "grid" }}>
        <img src={picture} alt="profile" />
        <h3>{name}</h3>
        <p>{email}</p>
        <p>{location}</p>
        <button
          onClick={() => {
            deleteUserInfo();
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};

const getUsersInfo = async (count) => {
  try {
    const res = await axios.get("https://randomuser.me/api/?results=${count}");
    if (res.status === 200) {
      return res.data.results;
    }
  } catch (error) {
    console.error(error);
  }
};

export default function App() {
  const [count, setCount] = useState(10);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData(count);
  }, []);

  const fetchData = async () => {
    try {
      const response = await getUsersInfo(count);
      setUserData(...userData, () => {
        response.map((data, index) => ({
          picture: data.picture.medium,
          name: data.name.first + " " + data.name.last,
          email: data.email,
          location: data.location.city,
        }));
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUserInfo = (index) => {
    let target = [...userData];
    target.splice(index, 1);
    setUserData(target);
  };

  return (
    <>
      <UserCard
        userData={userData}
        setCount={setCount}
        deleteUserInfo={deleteUserInfo}
      />
    </>
  );
}
