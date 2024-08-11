// import { getCookie,setCookie } from "cookies-next";
// import dayjs from "dayjs";

const setToken = (userToken)=>{
    return localStorage.setItem("access_token",userToken);
};

const removeToken = (userToken)=>{
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_info");
    return localStorage.removeItem('access_token');
};

const getToken = ()=>{
    return  (localStorage.getItem('access_token') !== "undefined"|| localStorage.getItem('access_token') !== null)?JSON.parse(localStorage.getItem('access_token')):null
};

const setRefreshToken = (refreshToken)=>{
    return localStorage.setItem("refresh_token",refreshToken);
};

const getRefreshToken = ()=>{
    return  (localStorage.getItem('refresh_token') !== "undefined"|| localStorage.getItem('refresh_token') !== null)?JSON.parse(localStorage.getItem('refresh_token')):null
};

const setAccessTokenExpiry =(time) =>{
    const milliseconds = Date.parse(time).toString();
    localStorage.setItem("access_token_expiration", milliseconds);
    return milliseconds;
}

const setRefreshTokenExpiry =(time) =>{
    const milliseconds = Date.parse(time).toString();
    localStorage.setItem("refresh_token_expiration", milliseconds);
    return milliseconds;
}

const setUser = (userData)=>{
    return localStorage.setItem("user_info",userData);
};

const  getUser = ()=>{
    return localStorage.getItem('user_info')
};


export default {setToken,getToken,removeToken,setUser,getUser,setRefreshToken,getRefreshToken, setAccessTokenExpiry, setRefreshTokenExpiry};
