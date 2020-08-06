import React, {useState} from 'react'
import '../css/userprofile.scss';
import { getUser, logOut } from '../globalFunc/auth';
import { logoutUser } from "../service/Socket";
import { getNotifications } from "../service/service";
export default function UserProfile(props) {
    const [notifs, setNotifs] = useState([])
    const user = getUser();
    console.log(user);
    getNotifications({user:user.phoneNumber}).then((data)=>{
        console.log(data.data["notifs"]);
        setNotifs(data.data["notifs"])
    });

    const logout = () => {
        logoutUser(user);
        logOut();
        // Since this component doesn't have access to Route, pass the string "logout" to the Header component to reload the page
        props.close("logout");
    }

    return (
        <div className="user-profile">
            <p className="title has-text-centered">User Profile</p>
            <fieldset disabled>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" defaultValue={props.user.nickname} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Phone Number</label>
                    <div className="control">
                        <input className="input" type="text" defaultValue={props.user.phoneNumber} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Type</label>
                    <div className="control">
                        <input
                        className="input"
                        type="text"
                        defaultValue={
                            props.user.type === 1 ? "Admin" :
                            [props.user.type === 2 ? "Driver" :
                            "General User"]} />
                    </div>
                </div>
            </fieldset>

            <br />
            <br />


                { props.user.type === 1 ? (
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button allUser" onClick={() => {props.close("allusers");}}>All Users</button>
                        </div>
                        <div className="control">
                            <button className="button is-danger Logout" onClick={logout}>Logout</button>
                        </div>
                    </div>
                ) : (
                    <div className="field">

                        <div className="control user-control">
                            <button className="button user-button PreviousOrder" onClick={() => {props.close("prevorder");}}>Previous Order</button>
                        </div>
                        <br />
                        {props.user.type === 0 &&
                            <div className="control user-control">
                                <button className="button user-button Ongoing" onClick={() => {props.close("ongoingorder");}}>Ongoing Order</button><br />
                            </div>
                        }
                        <br />
                        <div className="control user-control">
                            <button className="button is-danger user-button Logout" onClick={logout}>Logout</button>
                        </div>
                    </div>

                )}
                <br />
                <div className="notifications">
                    {notifs && notifs.length > 0 && 
                        <div className="nMessage">
                            <p class="n-o">1H8EGpIWCPZAHnFyWp1TPC7k</p>
                            <p class="n-m">Your order is on its way!</p>
                            <p class="n-t">2019-06-26 19:10:10</p>
                        </div>
                    }
                </div>
        </div>
    )
}
