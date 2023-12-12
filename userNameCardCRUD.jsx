import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://randomuser.me/api",
  headers: {
    "Content-Type": "application/json",
  },
});

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

/** --------------------------------------------------------------------
 *              UserCard에 api로 받은 users state를 가져와 map              *
-----------------------------------------------------------------------*/
export default function App() {
  const [count, setCount] = useState(10);
  // 커스텀 훅을 사용, 반환하는 값(상태와 함수)을 구조분해 할당을 통해 다른 컴포넌트에서 사용할 수 있다.
  const { users, getUserInfos, onRemove } = useGetRandomUsers(count);

  useEffect(() => {
    getUserInfos(count);
  }, []);

  return (
    <>
      <input value={count} onChange={(e) => setCount(e.target.value)} />
      <button onClick={getUserInfos}>fetch more</button>
      {users.length &&
        users.map((user, index) => {
          return (
            <UserCard
              {...user}
              // ...user를 prop으로 전달하기 때문에, UserCard에서 데이터를 바로 참조할 수 있다
              onRemove={() => {
                onRemove(index);
              }}
            />
          );
        })}
    </>
  );
}
/** --------------------------------------------------------------------
 *                         UserCard 컴포넌트                             *
-----------------------------------------------------------------------*/
const UserCard = ({ name, email, picture, location, onRemove }) => {
  return (
    <>
      <div className="user-card-container">
        <img source={picture} alt="user image" />
        <p>{name}</p>
        <p>{email}</p>
        <p>{location}</p>
        <button onClick={onRemove}>remove user</button>
      </div>
    </>
  );
};
/** --------------------------------------------------------------------
 *               useGetRandomUsers Custom Hooks 생성                     *
-----------------------------------------------------------------------*/
export const useGetRandomUsers = (count) => {
  const getUserInfos = async (count) => {
    const [users, setUsers] = useState([]);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onRemove = (index) => {
      const clone = [...users];
      clone.splice(index, 1);
      setUsers(clone);
    };

    if (loading) {
      return (
        <div>
          <p>loading...</p>
        </div>
      );
    }

    if (showError) {
      return (
        <div>
          <p>error happened ...</p>
        </div>
      );
    }
    setLoading(true);
    const res = await api.get(`/?results=${count}`);
    try {
      if (res.status === 200) {
        const users = res.data.results;
        setUsers([
          ...users,
          ...users.map((user) => ({
            photo: user.picture.medium,
            name:
              user.name.title + " " + user.name.first + " " + user.name.last,
            email: user.email,
            location: user.location.country + ", " + user.location.city,
          })),
        ]);
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };
  return { users, getUserInfos, onRemove };
};

/** --------------------------------------------------------------------
 *                              api 내용                                *
-----------------------------------------------------------------------*/

/**
 * https://randomuser.me/api?results=10

{
results: [
{
gender: "male",
name: {
title: "Mr",
first: "Phillip",
last: "Roberts"
},
location: {
street: {
number: 3870,
name: "Highfield Road"
},
city: "Mullingar",
state: "Dún Laoghaire–Rathdown",
country: "Ireland",
postcode: 58889,
coordinates: {
latitude: "-2.2015",
longitude: "-2.6473"
},
timezone: {
offset: "-1:00",
description: "Azores, Cape Verde Islands"
}
},
email: "phillip.roberts@example.com",
login: {
uuid: "cc665a38-815b-4bf4-ab27-8f79e52e8a15",
username: "blackkoala563",
password: "really",
salt: "GhuTR0p3",
md5: "c5f263cbb674f875933f697c7992575a",
sha1: "ce1a0903304ec32a87c218f270e055de11a7944f",
sha256: "2758f9b207af4ea78877df8720377b006bf2facae7ba0f26db91d5fce948161f"
},
dob: {
date: "1998-09-19T20:50:26.641Z",
age: 25
},
registered: {
date: "2011-01-21T16:53:27.963Z",
age: 12
},
phone: "071-318-5603",
cell: "081-457-7850",
id: {
name: "PPS",
value: "1416302T"
},
picture: {
large: "https://randomuser.me/api/portraits/men/60.jpg",
medium: "https://randomuser.me/api/portraits/med/men/60.jpg",
thumbnail: "https://randomuser.me/api/portraits/thumb/men/60.jpg"
},
nat: "IE"
}
],
info: {
seed: "5b767e98f3bc0471",
results: 1,
page: 1,
version: "1.4"
}
}
 */
