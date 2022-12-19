import {useState} from 'react';

export default function useToken() {
  const getToken = () => {
    return localStorage.getItem('user_id')
  };
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('user_id', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}