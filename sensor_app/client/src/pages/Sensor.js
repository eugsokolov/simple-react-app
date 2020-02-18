import React, { Component } from 'react';
import '../App.css';

class Sensor extends Component {
  intervalID;

  constructor(props) {
    super(props);
    this.userInput = React.createRef();
    this.state = { ma: '' };
  }

  callAPI() {
    fetch('http://localhost:9000/testAPI/sensor1', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: this.userInput.current.value,
        time: new Date()
      })
    })
      .then(res => res.text())
      .then(res => {
        this.setState({ ma: res });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    try {
      setInterval(async () => {
        this.callAPI();
      }, 5000);
    } catch (e) {
      console.log('error', e);
    }
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">Moving Average: {this.state.ma}</p>
        <div className="App-container">
          <p>Input:</p>
          <input type="text" ref={this.userInput} defaultValue="1" />
        </div>
      </div>
    );
  }
}

export default Sensor;
