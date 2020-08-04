import { setToken, getUser, logOut } from "../../globalFunc/auth";


describe("test auth utils", () => {

    it("setToken test", () => {
        const myToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6IlNlYW4iLCJwaG9uZU51bWJlciI6IisxMjM2ODg3MDY1NCIsInR5cGUiOjEsImlhdCI6MTU5NjUwMjM2NSwiZXhwIjoxNjI4MDU5MjkxfQ.ZJpvLs3fpygvGBA3T8k53XPZnU3OMwqojnvBazEvcHQ';
        setToken(myToken);
        expect(localStorage.getItem('store_token_id')).toBe(myToken);
    });

    it("getUser test", () => {
        const myToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6IlNlYW4iLCJwaG9uZU51bWJlciI6IisxMjM2ODg3MDY1NCIsInR5cGUiOjEsImlhdCI6MTU5NjUwMjM2NSwiZXhwIjoxNjI4MDU5MjkxfQ.ZJpvLs3fpygvGBA3T8k53XPZnU3OMwqojnvBazEvcHQ';
        setToken(myToken);
        const u = getUser();
        expect(u.phoneNumber).toBe('+12368870654');
    });

    it("logOut test", () => {
        const myToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6IlNlYW4iLCJwaG9uZU51bWJlciI6IisxMjM2ODg3MDY1NCIsInR5cGUiOjEsImlhdCI6MTU5NjUwMjM2NSwiZXhwIjoxNjI4MDU5MjkxfQ.ZJpvLs3fpygvGBA3T8k53XPZnU3OMwqojnvBazEvcHQ';
        setToken(myToken);
        expect(localStorage.getItem('store_token_id')).toBe(myToken);
        logOut();
        expect(localStorage.getItem('store_token_id')).toBe(null);
    });
});
