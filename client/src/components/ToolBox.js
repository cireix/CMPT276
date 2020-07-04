import React, { Component } from 'react'

class ToolBox extends Component {
    render() {
        return (
            <div className="tool-box">
                <div className="logo-text">STORE</div>
                <div className="search-box">
                    <div className="field has-addons">
                        <div className="control">
                            <input className="input search-input" type="text" placeholder="Search Product" />
                        </div>
                        <div className="control">
                            <button className="button is-static">X</button>
                        </div>    
                    </div>       
                </div>
                <div className="cart-box">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-num">(0)</span>
                </div>
            </div>
            
        );
    }
}

export default ToolBox;