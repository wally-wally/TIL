import React, { Component } from 'react';
import './ProblemInput.css';

class ProblemInput extends Component {
  state = {
    number: '',
    title: '',
  }

  inputProblemInfo = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addProblem = (e) => {
    e.preventDefault();
    if (this.state.number >= 1000 && this.state.number <= 18944) {
      this.props.onCreate(this.state)
      this.setState({
        number: '',
        title: '',
      })
    } else {
      alert('해당 문제가 없습니다.')
    }
  }

  render() {
    return (
      <form onSubmit={this.addProblem}>
        <div className="problem-info">
          <div className="problem-input-box">
            <input
              name="number"
              placeholder="문제번호"
              onChange={this.inputProblemInfo}
              value={this.state.number}
              type="number"
              id="question-number"
            />
          </div>
          <div className="problem-input-box">
            <input
              name="title"
              placeholder="제목"
              onChange={this.inputProblemInfo}
              value={this.state.title}
              type="text"
              id="question-title"
            />
          </div>
        </div>
        <div className="btn-wrapper">
          <button type="submit">Add</button>
        </div>
      </form>
    );
  }
}

export default ProblemInput;