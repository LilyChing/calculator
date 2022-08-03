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
      ['AC', '+/-', '%', '÷'],
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
          index == 0 ? this.resetClickHandler():
          index == 1 ? this.posNegNumHandler():
          index == 2 ? this.percentClickHandler():
          index == 3 || index == 7 || index == 11 || index == 15? this.operatorClickHandler(value) :
            index == 18 ? this.equalClickHandler() : this.numClickHandler(value);
        }}
        value={(value)}
        key={index}
      />
    );
    return btnHtml;
  }

  numClickHandler(btnValue) {
    // When the screenNum already have ".", return and do nothing
    if(this.state.screenNum.toString().includes(".") && btnValue == "."){
      return;
    }
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
    //If you press the third operator while there have firstNum and secondNum, we will calc the prep answer first
    if(this.state.firstNum && this.state.secondNum){
      this.equalClickHandler();
    }
    this.setState({
      operator: btnValue
    });
  }

  equalClickHandler() {
    let answer = 0;
    switch (this.state.operator) {
      case '+':
        answer = Number.parseFloat((this.state.firstNum + this.state.secondNum).toFixed(14));
        this.setState({ screenNum: answer, firstNum: answer,secondNum: null});
        break;
      case '-':
        answer = Number.parseFloat((this.state.firstNum - this.state.secondNum).toFixed(14));
        this.setState({ screenNum: answer, firstNum: answer,secondNum: null});
        break;
      case 'x':
        answer = Number.parseFloat((this.state.firstNum * this.state.secondNum).toFixed(14));
        this.setState({ screenNum: answer, firstNum: answer,secondNum: null});
        break;
      case '÷':
        if (this.state.secondNum == 0){
          answer = 0;
        }else{
          answer = Number.parseFloat((this.state.firstNum / this.state.secondNum).toFixed(14));
        }
        this.setState({ screenNum: answer, firstNum: answer,secondNum: null});
        break;
    }
    this.setState({})
  }
  
  // AC button reset number
  resetClickHandler() {
    this.setState({
      screenNum: 0,
      firstNum: null,
      operator: null,
      secondNum: 0
    })
  }

  // screenNum/100
  percentClickHandler() {
    const currentScreenNum = this.state.screenNum;
    if (!this.state.secondNum) {
      this.setState({
        screenNum: parseFloat((currentScreenNum / 100).toFixed(14)),
        firstNum: parseFloat((currentScreenNum / 100).toFixed(14))
      })
    }
    else {
      this.setState({
        screenNum: parseFloat((currentScreenNum / 100).toFixed(14)),
        secondNum: parseFloat((currentScreenNum / 100).toFixed(14))
      })
    }
  }

  //switch number between positive and negative numbers 
  posNegNumHandler() {
    if (Math.sign(this.state.screenNum) == -1){
      if (!this.state.secondNum) {
        this.setState({ screenNum: Math.abs(this.state.firstNum), firstNum: Math.abs(this.state.firstNum) })
      }else{
        this.setState({ screenNum: Math.abs(this.state.secondNum), secondNum: Math.abs(this.state.secondNum) })
      }
    }else if (Math.sign(this.state.screenNum) == 1){
      if (!this.state.secondNum) {
        this.setState({ screenNum: -Math.abs(this.state.firstNum), firstNum: -Math.abs(this.state.firstNum) })
      }else{
        this.setState({ screenNum: -Math.abs(this.state.secondNum), secondNum: -Math.abs(this.state.secondNum) })
      }
    }
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