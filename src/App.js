import React, { Component } from 'react';
import './App.css';
import { Screen } from './Screen';
import { ButtonBox } from './ButtonBox';
import { Button } from './Button';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screenNum: 0 };
  }

  genButton() {
    const btnValue = [
      ['AC', '+-', '%', '/'],
      [7, 8, 9, 'x'],
      [4, 5, 6, '-'],
      [1, 2, 3, '+'],
      [0, '.', '=']
    ];

    const btnHtml = btnValue.flat().map((value, index) =>
      <Button
        className={index < 3 ? "button-light" : index == 3 || index == 7 || index == 11 || index == 15 ? "button-orange" : index == 16 ? "button-zero" : "button"}
        onClick={() => {
          console.log(value);
        }}
        value={(value)}
        key={index}
      />
    );
    return btnHtml;
  }

  render() {
    return (
      <div className='main'>
        <Screen />
        <ButtonBox>
          {this.genButton()}
        </ButtonBox>
      </div>
    );
  }
}