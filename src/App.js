import React, { Component } from 'react';
import './App.css';
import { Screen } from './Screen';
import { ButtonBox } from './ButtonBox';
import { Button } from './Button';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenNum: 0,
      firstNum: null,
      operator: null,
      secondNum: null
    };
  }

  genButton() {
    const btnValue = [
      ['AC', '+-', '%', '/'],
      ['7', '8', '9', 'x'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '+'],
      ['0', '.', '=']
    ];

    const btnHtml = btnValue.flat().map((value, index) =>
      <Button
        className={index < 3 ? "button-light"
          : index == 3 || index == 7 || index == 11 || index == 15 ? "button-orange"
            : index == 16 ? "button-zero"
              : "button"}
        onClick={() => {
          index == 15 ? this.operatorClickHandler(value) :
            index == 18 ? this.equalClickHandler() : this.numClickHandler(value);
        }}
        value={(value)}
        key={index}
      />
    );
    return btnHtml;
  }

  numClickHandler(btnValue) {
    if (!this.state.firstNum || !this.state.operator) {
      if (this.state.screenNum == 0) {
        this.setState({ screenNum: btnValue, firstNum: Number.parseFloat(btnValue) })
      }
      else if (this.state.screenNum.length < 13) {
        const currentScreenNum = this.state.screenNum;
        this.setState({
          screenNum: currentScreenNum + btnValue,
          firstNum: Number.parseFloat(currentScreenNum + btnValue)
        });
      }
    }
    else {
      if (this.state.firstNum && !this.state.secondNum) {
        this.setState({ screenNum: btnValue, secondNum: Number.parseFloat(btnValue) });
      }
      else {
        const currentScreenNum = this.state.screenNum;
        this.setState({
          screenNum: currentScreenNum + btnValue,
          secondNum: Number.parseFloat(currentScreenNum + btnValue)
        })
      }
    }

  }

  operatorClickHandler(btnValue) {
    this.setState({
      operator: btnValue
    });
  }

  equalClickHandler() {
    switch (this.state.operator) {
      case '+':
        this.setState({ screenNum: this.state.firstNum + this.state.secondNum })

    }
    this.setState({})
  }



  render() {
    console.log(this.state);
    return (
      <div className='main'>
        <Screen value={this.state.screenNum} />
        <ButtonBox>
          {this.genButton()}
        </ButtonBox>
      </div>
    );
  }
}