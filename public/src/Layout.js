import React from 'react'
import Header from './components/Header'
import { getUser } from './globalFunc/auth';
const Layout = (props) => {
    const user = getUser();
    return (
        <div className="main">
            <Header user={user} />
            {props.children}
        </div>
    )
}

export default Layout;
