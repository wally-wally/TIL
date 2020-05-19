import React, { Component } from 'react';
import Header from './components/common/Header/Header';
import ProblemInput from './components/Problems/ProblemInput/ProblemInput';
import ProblemList from './components/Problems/ProblemList/ProblemList';
import bojImg from './assets/images/baekjoon.png'

class App extends Component {
  id = 0

  state = {
    problems: [],
    keyword: ''
  }

  addProblem = (data) => {
    const { problems } = this.state;
    this.setState({
      problems: problems.concat({
        ...data,
        id: this.id++
      })
    })
  }

  removeProblem = (id) => {
    const { problems } = this.state;
    this.setState({
      problems: problems.filter(problem => problem.id !== id)
    })
  }

  updateProblem = (id, problem) => {
    const { problems } = this.state;
    this.setState({
      problems: problems.map(
        problemInfo => {
          if (problemInfo.id === id) {
            return {
              id,
              ...problem
            };
          }
          return problemInfo;
        }
      )
    })
  }

  render() {
    const bojImgStyle = {
      display: 'block',
      margin: '0 auto',
      width: '400px'
    }

    return (
      <div className="app">
        <Header />
        <img src={bojImg} alt="baekjoon-main-image" style={bojImgStyle}/>
        <ProblemInput onCreate={this.addProblem} />
        <ProblemList
          data={this.state.problems}
          onRemove={this.removeProblem}
          onUpdate={this.updateProblem}
        />
      </div>
    );
  }
}

export default App;