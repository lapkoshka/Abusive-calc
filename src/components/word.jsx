import React from 'react';


class Word extends React.Component {
    constructor (props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    };

    clickHandler() {
        this.props.onClick(this.props.id);
    };

    render() {
        return (
            <div 
                className={`word ${this.props.color}${this.props.isPlayingNow ? ' playing' : ''}`} 
                onClick={this.clickHandler}>
                    {this.props.text}
            </div>
        );
    };
};

export default Word;