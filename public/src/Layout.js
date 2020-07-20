import React from 'react'
import Header from 'components/Header'

const Layout = (props) => {
    const user = global.auth.getUser();
    console.log(user);
    return (
        <div className="main">
            <Header user={user} />
            {props.children}
        </div>
    )
}

export default Layout;