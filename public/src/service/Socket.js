import {toast} from "react-toastify"
const socket = window.socket;

console.log("IM HERE")
socket.on("test",(data) => {
    console.log(data)
})


export function sendMessage(){
    socket.emit("chat message","123")
    console.log("123")
}

export function setUser(user) {
    if ("phoneNumber" in user) {
        socket.emit("set",user["phoneNumber"])
    }
}

export function logoutUser(user) {
    if ("phoneNumber" in user) {
        socket.emit("logout",user["phoneNumber"])
    }
}