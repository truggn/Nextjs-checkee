import cookie from 'js-cookie';


export const setCookie = (key: string, value: {}) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1,
            path: '/'
        });
    }
};


export const removeCookie = (key: string) => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};


export const getCookie = (key: string) => {
    return getCookieFromBrowser(key)
};


const getCookieFromBrowser = (key:string ) => {
    let result = JSON.parse(decodeURIComponent(cookie.get(key)));
    return result
};
