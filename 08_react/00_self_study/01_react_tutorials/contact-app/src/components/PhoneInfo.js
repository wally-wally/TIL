import React, { Component, Fragment } from 'react';

class PhoneInfo extends Component {

  state = {
    editing: false, // 수정모드 설정 관련 변수
    name: '',
    phone: ''
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    return this.props.info !== nextProps.info;
  }
  

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }

  handleToggleEdit = () => {
    const { info, onUpdate } = this.props;
    // editing 값이 true => false (if 문)
    // onUpdate로 부모 컴포넌트에게 알린다.
    // editing 값이 false => true (else 문)
    // props로 받은 info의 name과 phone 값을 이 컴포넌트의 state의 name과 phone에 각각 넣어준다.
    if (this.state.editing) {
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone,
      })
    } else {
      this.setState({
        name: info.name,
        phone: info.phone,
      })
    }
    this.setState({
      editing: !this.state.editing,
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { name, phone } = this.props.info;
    const { editing } = this.state;
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    }
    return (
      <div style={style}>
        {/* state의 editing 값에 따라 input box 또는 div 태그로 보여진다. */}
        {
          editing ? (
            <Fragment>
              <div>
                <input
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </div>
              <div>
                <input
                  name="phone"
                  onChange={this.handleChange}
                  value={this.state.phone}
                />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div><b>{name}</b></div>
              <div>{phone}</div>
            </Fragment>
          )
        }
        <button onClick={this.handleRemove}>삭제</button>
        <button onClick={this.handleToggleEdit}>
          { editing ? '적용' : '수정 '}
        </button>
      </div>
    );
  }
}

export default PhoneInfo;