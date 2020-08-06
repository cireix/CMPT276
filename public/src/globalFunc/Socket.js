import {toast} from "react-toastify"
import socketIOClient from "socket.io-client"

export const socket = socketIOClient();

socket.on("accepted",(data)=>{
    toast.success("Your order is on its way!")
})
socket.on("almost",(data)=>{
    toast.success("Your order is "+data+" mins away!")
})
socket.on("here",(data)=>{
    toast.success("Your order is here!")
})


export function sendLocation(client,loc) {
    socket.emit("location",client,loc)
    console.log("location sent")
}
export function sendHere(client){
    socket.emit("here",client)
}
export function sendAlmost(client,eta){
    socket.emit("almost",client,eta)
}

export function sendAccepted(client){
    socket.emit("accepted",client)
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
// export socket;