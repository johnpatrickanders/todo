function useToken(token, setToken) {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }


  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    return userToken;
  };

  function removeToken() {
    console.log("removing token...");
    localStorage.removeItem('token');
    // setToken(null);
  }

  return {
    saveToken,
    getToken,
    removeToken
  }

}

export default useToken;


// import { useState } from 'react';

// function useToken() {
//   const [token, setToken] = useState(getToken());

//   function getToken() {
//     const userToken = localStorage.getItem('token');
//     return userToken && userToken
//   }


//   function saveToken(userToken) {
//     localStorage.setItem('token', userToken);
//     setToken(userToken);
//   };

//   function removeToken() {
//     console.log("removing token...");
//     localStorage.removeItem('token');
//     setToken(null);
//   }

//   return {
//     setToken: saveToken,
//     token,
//     removeToken
//   }

// }

// export default useToken;
