import React, { Component } from 'react';

class PhoneForm extends Component {
  input = React.createRef()

  state = {
    name: '',
    phone: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault() // 등록 버튼 눌렀을 때 새로고침 되는 현상 방지
    this.props.onCreate(this.state)
    // 등록 후 input 값 초기화
    this.setState({
      name: '',
      phone: '',
    });
    this.input.current.focus();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          placeholder="이름"
          onChange={this.handleChange}
          value={this.state.name}
          ref={this.input}
        />
        <input
          name="phone"
          placeholder="전화번호"
          onChange={this.handleChange}
          value={this.state.phone}
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default PhoneForm;