import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

/**
 * 1. call api with parameter -> 'results' with value of 10 ( dynamic ) on load of page
 * 2. store results into state
 * 3. display state on to screen
 * 4. make UserCard component displaying [ name, email, picture, location ]
 * 5. display list with .map array method
 * 6. create remove button on card to remove item from list
 * 7. make button to make request to add 10 ( dynamic ) more new randomusers to state
 *
 */

const api = axios.create({
  baseURL: "https://randomuser.me/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const useGetRandomUsers = (count) => {
  const [users, setUsers] = useState([]);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserInfos = async (count) => {
    setLoading(true);
    const res = await api.get(`/?results=${count}`);
    try {
      if (res.status === 200) {
        const users = res.data.results;
        setUserInfos([
          ...userInfos,
          ...user.map((user) => ({
            photo: user.picture.medium,
            name:
              user.name.title + " " + user.name.first + " " + user.name.last,
            email: user.email,
            location: user.location.country + " ," + user.location.city,
          })),
        ]);
      }
      throw new Error("something wnet wrong with request ...");
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
};

export default function App() {
  // 2.
  const [count, setCount] = useState(10);

  const { users, showError, loading, getUserInfos } = useGetRandomUsers(count);

  const UserCard = ({ name, email, picture, location, onRemove }) => {
    return (
      <>
        <div className="user-card-container">
          <img source={picture} alt="user name" />
          <p>{name}</p>
          <p>{email}</p>
          <p>{location}</p>
          <button onClick={onRemove}>remove user</button>
        </div>
      </>
    );
  };

  // 1.

  const onRemove = (index) => {
    const clone = [...userInfos];
    clone.splice(index, 1);
    setUserInfos(clone);
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

  return (
    <div>
      <input value={count} onChange={(e) => setCount(e.target.value)} />
      <button onClick={getUserInfos}>fetch more</button>
      {users.length &&
        user.map((user, index) => {
          return (
            <UserCard
              {...user}
              onRemove={() => {
                onRemove(index);
              }}
            />
          );
        })}
    </div>
  );
}

// https://axios-http.com/docs/res_schema
// https://randomuser.me/api?results=10
// https://jsonviewer.stack.hu/
// {
// results: [
// {
// gender: "male",
// name: {
// title: "Mr",
// first: "Phillip",
// last: "Roberts"
// },
// location: {
// street: {
// number: 3870,
// name: "Highfield Road"
// },
// city: "Mullingar",
// state: "Dún Laoghaire–Rathdown",
// country: "Ireland",
// postcode: 58889,
// coordinates: {
// latitude: "-2.2015",
// longitude: "-2.6473"
// },
// timezone: {
// offset: "-1:00",
// description: "Azores, Cape Verde Islands"
// }
// },
// email: "phillip.roberts@example.com",
// login: {
// uuid: "cc665a38-815b-4bf4-ab27-8f79e52e8a15",
// username: "blackkoala563",
// password: "really",
// salt: "GhuTR0p3",
// md5: "c5f263cbb674f875933f697c7992575a",
// sha1: "ce1a0903304ec32a87c218f270e055de11a7944f",
// sha256: "2758f9b207af4ea78877df8720377b006bf2facae7ba0f26db91d5fce948161f"
// },
// dob: {
// date: "1998-09-19T20:50:26.641Z",
// age: 25
// },
// registered: {
// date: "2011-01-21T16:53:27.963Z",
// age: 12
// },
// phone: "071-318-5603",
// cell: "081-457-7850",
// id: {
// name: "PPS",
// value: "1416302T"
// },
// picture: {
// large: "https://randomuser.me/api/portraits/men/60.jpg",
// medium: "https://randomuser.me/api/portraits/med/men/60.jpg",
// thumbnail: "https://randomuser.me/api/portraits/thumb/men/60.jpg"
// },
// nat: "IE"
// }
// ],
// info: {
// seed: "5b767e98f3bc0471",
// results: 1,
// page: 1,
// version: "1.4"
// }
// }
