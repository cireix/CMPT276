import {toast} from "react-toastify"
const socket = window.socket;

socket.on("accepted",(data)=>{
    toast.success("Your order is on its way!")
})

export function sendAccepted(client){
    socket.emit("accepted",client)
}

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