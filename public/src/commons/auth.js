import decode from 'jwt-decode';

// store jowtoken locally
const setToken = token => {
    localStorage.setItem('store_token_id', token);
}

// Retrun the jwtoken from local storage
const getToken = () => (
    localStorage.getItem('store_token_id')
);

// check if the token is expired
const isTokenExpired = token => {
    try {
        const _info = decode(token);
        if (_info.exp < Date.now() / 1000) {
            return true;
        } else return false;
    } catch (error) {
        return false;
    }
}

// check login status
const isLogin = () => {
    var status = false;
    const jwt = getToken();
    if (jwt != null) {
        if (!isTokenExpired(jwt)) status = true;
    };
    return status;
}

// return a list of all users
const getUser = () => {
    if(isLogin()) {
        const jwt = getToken();
        const user = decode(jwt);
        return user;
    } else {
        return {};
    }
}

// remove the jwtoken stored locally
const logOut = () => {
    localStorage.removeItem('store_token_id');
}

global.auth = {
    setToken,
    getUser,
    logOut
}