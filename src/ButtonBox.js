import React, { Children } from 'react';
export class ButtonBox extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return <div className='buttonBox'>{this.props.children}</div>
    }
}