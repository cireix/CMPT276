import React from 'react';   
import Products from 'components/Products';
import Layout from 'Layout';
import Driver from "components/Driver";

const App = (props) => {
    const user = global.auth.getUser();

    return(
        <Layout>
            <div data-test="app-wrapper">
                {user.type !== 2 && <Products user = {user}/>}
                {user.type === 2 && <Driver user = {user}/>}
            </div>
        </Layout>
    );

}

export default App;