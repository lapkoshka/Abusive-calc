import React from 'react';


class Button extends React.Component {
    constructor(props) {
        super (props);

        this.clickHandler = this.clickHandler.bind(this);
    };

    clickHandler() {
        this.props.onClick(this.props.text);
    };

    render() {
        return (
            <div className = {'calc-button ' + this.props.color}
                onClick = {this.clickHandler}>
                <span>
                    {this.props.text}
                </span>
            </div>
        );
    }
};

export default Button;
