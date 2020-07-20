import React from 'react';
import { render } from 'react-dom';
import 'css/popPanel.scss';

class PopupPanel extends React.Component {
    state = {
        component: null,
        active: false,
        func: () => {}
    }

    // Open a popup panel
    open = (options) => {
        const { component, func, user, product } = options;
        // create a time stamp that used to re-render the child component everytime when the Panel component opened
        const _key = new Date().getTime();
        // create a renderable component in the Panel component with close function, a time stamp and a ser object
        const _component = React.createElement(component, { close: this.close, key: _key, user: user, product: product });  
        this.setState({
            component: _component,
            active: true,
            func: func
        })
    }

    // Close the popup panel
    close = (data) => {
        this.setState({
            active: false
        });
        this.state.func(data);
    }

    render() {
        return (
            <div className={ this.state.active === true ? 'panel-wrapper active' : 'panel-wrapper'}>     
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

// Let the Panel component be a independent component
const _popUpPanel = render(<PopupPanel />, _div);

export default _popUpPanel;