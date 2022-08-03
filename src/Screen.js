import React from 'react';
export class Screen extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return <h1 className='screen' value={this.props.value}>{this.props.value}</h1>
    }
}