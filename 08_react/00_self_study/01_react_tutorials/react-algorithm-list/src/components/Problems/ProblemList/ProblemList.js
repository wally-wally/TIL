import React, { Component } from 'react';
import './ProblemList.css';
import ProblemItem from '../ProblemItem/ProblemItem';

class ProblemList extends Component {
  static defaultProps = {
    data: []
  }

  render() {
    const { data, onRemove, onUpdate } = this.props;
    const problemInfo = data.map(
      problem => (
        <ProblemItem
          onRemove={onRemove}
          onUpdate={onUpdate}
          problem={problem}
          key={problem.id}
        />
      )
    )
    return (
      <div className="problem-items-wrapper">
        {problemInfo}
      </div>
    );
  }
}

export default ProblemList;