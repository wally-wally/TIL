import React, { Component, Fragment } from 'react';
import './ProblemItem.css';

class ProblemItem extends Component {
  state = {
    editing: false,
    number: '',
    title: '',
    originalNumber: '',
    originalTitle: ''
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    return this.props.problem !== nextProps.problem;
  }

  removeProblem = () => {
    const { problem, onRemove } = this.props;
    onRemove(problem.id);
  }

  updateProblem = () => {
    const { problem, onUpdate } = this.props;
    if (this.state.editing) {
      if (this.state.number >= 1000 && this.state.number <= 18944) {
        onUpdate(problem.id, {
          number: this.state.number,
          title: this.state.title
        })
      } else {
        alert('해당 문제가 없습니다.')
        return
      }
    } else {
      this.setState({
        number: problem.number,
        title: problem.title,
        originalNumber: problem.number,
        originalTitle: problem.title,
      })
    }
    this.setState({
      editing: !this.state.editing
    })
  }

  cancelUpdateProblem = () => {
    this.setState({
      number: this.state.originalNumber,
      title: this.state.originalTitle,
      editing: false
    })
  }

  inputProblemInfo = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { number, title } = this.props.problem;
    const { editing } = this.state;
    const showEditBtn = !editing ? <i className="fas fa-edit" onClick={this.updateProblem}></i> : ''
    const showDeleteBtn = !editing ? <i className="fas fa-trash-alt" onClick={this.removeProblem}></i> : ''
    return (
      <div>
        <div className="problem-card">
          {
            editing ? (
              <Fragment>
                <input
                  name="number"
                  type="number"
                  placeholder="수정할 문제번호"
                  onChange={this.inputProblemInfo}
                  value={this.state.number}
                  className="problem-number"
                />
                <input
                  name="title"
                  type="text"
                  placeholder="수정할 제목"
                  onChange={this.inputProblemInfo}
                  value={this.state.title}
                  className="problem-title"
                />
              </Fragment>
            ) : (
              <Fragment>
                <div className="problem-number">{number}</div>
                <div className="problem-title">{title}</div>
              </Fragment>
            )
          }
          <div className="btn-group">
            <div className="btn-left">
              { showEditBtn }
              { showDeleteBtn }
            </div>
            <div className="btn-right">
              {
                editing ? (
                  <Fragment>
                    <button onClick={this.updateProblem}>수정하기</button>
                    <button onClick={this.cancelUpdateProblem}>수정취소</button>
                  </Fragment>
                ) : (
                  <button onClick={() => window.open(`https://www.acmicpc.net/problem/${number}`)}>GO BOJ</button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProblemItem;