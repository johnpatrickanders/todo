const useToken = {
  getToken: () => {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  },
  saveToken: (userToken) => {
    localStorage.setItem('token', userToken);
    return userToken;
  },
  removeToken: () => {
    localStorage.removeItem('token');
  }
}

export default useToken;
