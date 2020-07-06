import React, { Component } from 'react';
import ToolBox from 'components/ToolBox';

class Products extends Component {
    
    render() {
        return (
            <div>
                <ToolBox />
                <div className="products"></div>
            </div>
        )
    }
}

export default Products;