// nazl create userData context to store user token
import { createContext, useState } from 'react';
// ufs 3shan a5od el token w ast5dmha fe ay mkan fel app
// export userData context
export let userData = createContext();
// create userData provider to wrap the app
export function UserDataProvider(props) {
  const [Token, setToken] = useState(localStorage.getItem('token'));
  return (
    <userData.Provider value={{ Token, setToken }}>
      {props.children}
    </userData.Provider>
  );
}
