import React from 'react';
import Header from 'components/Header';    
import Products from 'components/Products';

const App = (props) => {
    const user = global.auth.getUser();

    return(
        <div className="main">
            <Header user={user} />
            <Products />
        </div>
    );

}

export default App;