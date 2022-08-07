import React, { Component } from 'react';
import './App.css';
import { Screen } from './Screen';
import { ButtonBox } from './ButtonBox';
import { Button } from './Button';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenNum: null,
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
          index == 0 ? this.resetClickHandler() :
          index == 1 ? this.posNegNumHandler() :
          index == 2 ? this.percentClickHandler() :
            index == 3 || index == 7 || index == 11 || index == 15 ? this.operatorClickHandler(value) :
                index == 18 ? this.equalClickHandler() :
                  index == 17 ? this.decimalClickHandler() : this.numClickHandler(value);
        }}
        value={(value)}
        key={index}
      />
    );
    return btnHtml;
  }

  decimalClickHandler() {
    // When the screenNum already have ".", return and do nothing
    if (this.state.screenNum.toString().includes(".")) {
      return;
    }
    else {
      if (!this.state.secondNum) {
        const currentScreenNum = this.state.screenNum;
        this.setState({
          screenNum: currentScreenNum + '.',
          firstNum: currentScreenNum + '.'
        })
      }
      else {
        const currentScreenNum = this.state.screenNum;
        this.setState({
          screenNum: currentScreenNum + '.',
          secondNum: currentScreenNum + '.'
        })
      }

    }
  }

  numClickHandler(btnValue) {
    if (!this.state.firstNum || !this.state.operator) {
      if (this.state.firstNum == null) {
        this.setState({ screenNum: btnValue, firstNum: btnValue })
      }
      else if (this.state.screenNum.length < 13) {
        const currentScreenNum = this.state.screenNum;
        this.setState({
          screenNum: currentScreenNum + btnValue,
          firstNum: currentScreenNum + btnValue
        });
      }
    }
    else {
      if (!this.state.secondNum) {
        this.setState({ screenNum: btnValue, secondNum: btnValue });
      }
      else {
        const currentScreenNum = this.state.screenNum;
        this.setState({
          screenNum: currentScreenNum + btnValue,
          secondNum: currentScreenNum + btnValue
        })
      }
    }

  }

  operatorClickHandler(btnValue) {
    if (this.state.screenNum && !this.state.firstNum){
      this.setState({ firstNum: this.state.screenNum });
    }else if (!this.state.firstNum){
      return;
    }
    //If you press the third operator while there have firstNum and secondNum, we will calc the prep answer first
    if(this.state.firstNum && this.state.secondNum){
      let answer = 0;
      switch (this.state.operator) {
        case '+':
          answer = Number.parseFloat(parseFloat(this.state.firstNum) + parseFloat(this.state.secondNum));
          if (answer.toString().length > 9) {
            answer = parseFloat((answer).toFixed(9));
          }
          this.setState({ screenNum: answer, firstNum: answer, secondNum: null, operator: null });
          break;
        case '-':
          answer = Number.parseFloat(parseFloat(this.state.firstNum) - parseFloat(this.state.secondNum));
          if (answer.toString().length > 9) {
            answer = parseFloat((answer).toFixed(9));
          }
          this.setState({ screenNum: answer, firstNum: answer, secondNum: null, operator: null });
          break;
        case 'x':
          answer = Number.parseFloat(parseFloat(this.state.firstNum) * parseFloat(this.state.secondNum));
          if (answer.toString().length > 9) {
            answer = parseFloat((answer).toFixed(9));
          }
          this.setState({ screenNum: answer, firstNum: answer, secondNum: null, operator: null });
          break;
        case '÷':
          answer = Number.parseFloat(parseFloat(this.state.firstNum) / parseFloat(this.state.secondNum));
          if (answer.toString().length > 9) {
            answer = parseFloat((answer).toFixed(9));
          }
          this.setState({ screenNum: answer, firstNum: answer, secondNum: null, operator: null });
          break;
      }
    }
    this.setState({
      operator: btnValue
    });
  }

  equalClickHandler() {
    let answer = 0;
    if (!this.state.firstNum || !this.state.secondNum || !this.state.operator){
      return;
    }
    switch (this.state.operator) {
      case '+':
        answer = Number.parseFloat(parseFloat(this.state.firstNum) + parseFloat(this.state.secondNum));
        if (answer.toString().length > 9) {
          answer = parseFloat((answer).toFixed(9));
        }
        this.setState({ screenNum: answer, firstNum: null, secondNum: null, operator: null });
        break;
      case '-':
        answer = Number.parseFloat(parseFloat(this.state.firstNum) - parseFloat(this.state.secondNum));
        if (answer.toString().length > 9) {
          answer = parseFloat((answer).toFixed(9));
        }
        this.setState({ screenNum: answer, firstNum: null, secondNum: null, operator: null });
        break;
      case 'x':
        answer = Number.parseFloat(parseFloat(this.state.firstNum) * parseFloat(this.state.secondNum));
        if (answer.toString().length > 9) {
          answer = parseFloat((answer).toFixed(9));
        }
        this.setState({ screenNum: answer, firstNum: null, secondNum: null, operator: null });
        break;
      case '÷':
        answer = Number.parseFloat(parseFloat(this.state.firstNum) / parseFloat(this.state.secondNum));
        if (answer.toString().length > 9) {
          answer = parseFloat((answer).toFixed(9));
        }
        this.setState({ screenNum: answer, firstNum: null, secondNum: null, operator: null });
        break;
    }
  }
  
  // AC button reset number
  resetClickHandler() {
    this.setState({
      screenNum: null,
      firstNum: null,
      operator: null,
      secondNum: null
    })
  }

  //switch number between positive and negative numbers 
  posNegNumHandler() {
    if (Math.sign(this.state.screenNum) == -1) {
      if (!this.state.secondNum) {
        this.setState({ screenNum: Math.abs(this.state.firstNum), firstNum: Math.abs(this.state.firstNum) })
      } else {
        this.setState({ screenNum: Math.abs(this.state.secondNum), secondNum: Math.abs(this.state.secondNum) })
      }
    } else if (Math.sign(this.state.screenNum) == 1) {
      if (!this.state.secondNum) {
        this.setState({ screenNum: -Math.abs(this.state.firstNum), firstNum: -Math.abs(this.state.firstNum) })
      } else {
        this.setState({ screenNum: -Math.abs(this.state.secondNum), secondNum: -Math.abs(this.state.secondNum) })
      }
    }
  }

  // screenNum/100
  percentClickHandler() {
    const currentScreenNum = this.state.screenNum;
    if (!this.state.secondNum) {
      const answer = currentScreenNum / 100;
      if (answer.toString().length > 9) {
        this.setState({
          screenNum: parseFloat((answer).toFixed(9)),
          firstNum: parseFloat((answer).toFixed(9))
        })
      }
      else {
        this.setState({
          screenNum: answer,
          firstNum: answer
        })
      }
    }
    else {
      const answer = currentScreenNum / 100;
      if (answer.toString().length > 9) {
        this.setState({
          screenNum: parseFloat((answer).toFixed(9)),
          secondNum: parseFloat((answer).toFixed(9))
        })
      }
      else {
        this.setState({
          screenNum: answer,
          secondNum: answer
        })
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