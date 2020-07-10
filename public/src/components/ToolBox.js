import React, { Component } from 'react'

class ToolBox extends Component {
    state = {
        searchString: ''
    }

    // Search the string in search box
    searchHandle = e => {
        const string = e.target.value;
        this.setState({
            searchString: string
        })
        this.props.search(string);
    }

    // Clear search box
    clearSearch = () => {
        this.setState({
            searchString: ''
        })
        this.props.search('');
    }

    render() {
        return (
            <div className="tool-box">
                <div className="logo-text">STORE</div>
                <div className="search-box">
                    <div className="field has-addons">
                        <div className="control">
                            <input 
                                className="input search-input" 
                                type="text" 
                                placeholder="Search Product"
                                onChange={this.searchHandle}
                                value={this.state.searchString} />
                        </div>
                        <div className="control">
                            <button 
                                className="button"
                                onClick={this.clearSearch}>X</button>
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