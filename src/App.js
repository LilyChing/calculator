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
          index == 1 ? this.posNegNumHandler() :
            index == 3 || index == 7 || index == 11 || index == 15 ? this.operatorClickHandler(value) :
              index == 2 ? this.percentClickHandler() : index == 0 ? this.resetClickHandler() :
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
    // When the screenNum already have ".", return and do nothing

    if (!this.state.firstNum || !this.state.operator) {
      if (this.state.screenNum == null) {
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
    this.setState({
      operator: btnValue
    });
  }

  equalClickHandler() {
    let answer = 0;
    switch (this.state.operator) {
      case '+':
        answer = Number.parseFloat(parseFloat(this.state.firstNum) + parseFloat(this.state.secondNum));
        if (answer.toString().length > 9) {
          answer = answer.toFixed(9);
        }
        this.setState({ screenNum: answer, firstNum: answer, secondNum: null });
        break;
      case '-':
        answer = Number.parseFloat(parseFloat(this.state.firstNum) - parseFloat(this.state.secondNum));
        if (answer.toString().length > 9) {
          answer = answer.toFixed(9);
        }
        this.setState({ screenNum: answer, firstNum: answer, secondNum: null });
        break;
      case 'x':
        answer = Number.parseFloat(parseFloat(this.state.firstNum) * parseFloat(this.state.secondNum));
        if (answer.toString().length > 9) {
          answer = answer.toFixed(9);
        }
        this.setState({ screenNum: answer, firstNum: answer, secondNum: null });
        break;
      case '÷':
        answer = Number.parseFloat(parseFloat(this.state.firstNum) / parseFloat(this.state.secondNum));
        if (answer.toString().length > 9) {
          answer = answer.toFixed(9);
        }
        this.setState({ screenNum: answer, firstNum: answer, secondNum: null });
        break;
    }
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
  percentClickHandler() {
    const currentScreenNum = this.state.screenNum;
    if (!this.state.secondNum) {
      const answer = currentScreenNum / 100;
      if (answer.toString().length > 9) {
        this.setState({
          screenNum: answer.toFixed(9),
          firstNum: answer.toFixed(9)
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
          screenNum: answer.toFixed(9),
          secondNum: answer.toFixed(9)
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

  resetClickHandler() {
    this.setState({
      screenNum: null,
      firstNum: null,
      operator: null,
      secondNum: null
    })
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