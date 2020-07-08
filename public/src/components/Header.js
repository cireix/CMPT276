import React from 'react';
import { Link, withRouter } from 'react-router-dom';   
import PopupPanel from 'components/PopupPanel'; 
import UserProfile from 'components/UserProfile'; 

const Header = (props) => {
    // Open the UserProfile popup panel when nickname is clicked
    const toProfile = () => {
        PopupPanel.open({
            component: UserProfile,
            user: props.user,
            // This callback function is used to route to another page depending on data passed from the child component of the Panel component
            func: data => {
                if ( data === 'logout' ) {
                    props.history.go(0);   
                }
                if ( data === 'allusers' ) {
                    props.history.push('/allusers');
                }
            }
        })
    }

    return (
        <div className="header">
        <div className="grid">

            <div className="start">     
                <Link to="/">HOME</Link>
            </div>
            <div className="end">
                { props.user.nickname ? (
                    <React.Fragment>      
                        <i className="far fa-user icon" onClick={toProfile}></i>
                        <span className="nickname" onClick={toProfile}>
                            { props.user.nickname }
                        </span>
                    </React.Fragment>
                ) : (
                    <React.Fragment>    
                        <Link to="/login">LOGIN</Link>      
                        <Link to="/signup">SIGN UP</Link>
                    </React.Fragment>
                )}
            </div>
        </div>
    </div>
    )   
}

export default withRouter(Header)