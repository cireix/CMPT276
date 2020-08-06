import React from 'react';
import { render } from 'react-dom';
import '../css/orderInfoPanel.scss';

class OrderInfoPanel extends React.Component {
    state = {
        component: null,

        active: false
    }

    open = (options) => {
        const { component, details } = options;
        const _component = React.createElement(component, { close: this.close, details: details });
        this.setState({
            component: _component,
            active: true
        })
    }

    close = () => {
        this.setState({
            active: false
        })
    }

    render() {
        return (
            <div className={ this.state.active === true ? 'orderInfoPanel-wrapper orderActive' : 'orderInfoPanel-wrapper'}>
                <div className="order-overlayer" onClick={this.close}></div>
                <div className="orderInfoPanel">
                    <div className="orderInfoPanel-head">
                        <i className="far fa-times-circle close" onClick={ this.close }></i>
                    </div>
                    <div className="orderInfoPanel-body">
                        { this.state.component }
                    </div>
                </div>
            </div>
        )
    }
}

const _div = document.createElement('div');
document.body.appendChild(_div);

const _popUpPanel = render(<OrderInfoPanel />, _div);

export default _popUpPanel;