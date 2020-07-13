// (5-1) WaitingContainer 만들기
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as waitingActions from '../store/modules/waiting';
import WaitingList from '../components/WaitingList';

class WaitingListContainer extends Component {
  // input change event
  handleChange = e => {
    const { WaitingActions } = this.props;
    WaitingActions.changeInput(e.target.value);
  }
  // create event
  handleSubmit = e => {
    e.preventDefault();
    const { WaitingActions, input } = this.props;
    WaitingActions.create(input); // 대기자 등록
    WaitingActions.changeInput(''); // input value initialization
  }

  // enter event
  handleEnter = id => {
    const { WaitingActions } = this.props;
    WaitingActions.enter(id);
  }

  // leave event
  handleLeave = id => {
    const { WaitingActions } = this.props;
    WaitingActions.leave(id);
  }

  render() {
    const { input, list } = this.props;
    return (
      <WaitingList
        input={input}
        waitingList={list}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onEnter={this.handleEnter}
        onLeave={this.handleLeave}
      />
    );
  }
}

const mapStateToProps = ({ waiting }) => ({
  input: waiting.input,
  list: waiting.list,
})

const mapDispatchToProps = dispatch => ({
  WaitingActions: bindActionCreators(waitingActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingListContainer);