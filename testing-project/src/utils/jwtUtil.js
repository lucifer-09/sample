export const isTokenValid = (token) => {
    if (!token) return false;
    
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expiration = decodedToken.exp * 1000;
    
    return Date.now() < expiration;
  };
  
  export const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token;
  };
  