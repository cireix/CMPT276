import axios from "axios";

export function getAllUsers() {
  return axios.post("api/users/allUsers");
}

export function login(param) {
  return axios.post("api/users/login", param);
}

export function getOngoing(param) {
  return axios.post("api/orders/getOngoing", param);
}

export function getPrevious(param) {
  return axios.post("api/orders/getPrevious", param);
}

export function register1(param) {
  return axios.post("api/users/register", param);
}

export function register2(param) {
  return axios.post("api/users/register2", param);
}


export function forgotpw(param) {
  return axios.post("api/users/forgotpw", param);
}

export function forgotpw2(param) {
  return axios.post("api/users/forgotpw2", param);
}