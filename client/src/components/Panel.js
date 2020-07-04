import React from 'react';
import { render } from 'react-dom'

class Panel extends React.Component {
    state = {
        component: null,
        active: false,
        callback: () => {}
    }

    // Open a popup panel
    open = (options) => {
        const { component, callback, user } = options;
        const _key = new Date().getTime();
        const _component = React.createElement(component, { close: this.close, key: _key, user: user });  
        this.setState({
            component: _component,
            active: true,
            callback: callback
        })
    }

    // Close the popup panel
    close = (data) => {
        this.setState({
            active: false
        });
        this.state.callback(data);
    }

    render() {
        const _class = {
            true: 'panel-wrapper active',
            false: 'panel-wrapper'
        }

        return (
            <div className={ _class[this.state.active] }>     
                <div className="over-layer" onClick={ this.close }></div>      
                <div className="panel">       
                    <div className="panel-head">    
                        <i className="far fa-times-circle close" onClick={ this.close }></i> 
                    </div>
                    <div className="panel-body">
                        { this.state.component }    
                    </div>
                </div>
            </div>       
        )
    }
}

const _div = document.createElement('div');
document.body.appendChild(_div);


const _panel = render(<Panel />, _div);

export default _panel;