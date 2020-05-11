import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {

  // 배열의 각 원소를 랜더링 할 대 key 값으로 고유값이 필요하다.
  // 참고로 id는 랜더링해서 보여주는 값이 아니므로 굳이 state에 넣을 필요가 없다.
  id = 0

  state = {
    information: [],
  }

  handleCreate = (data) => {
    // react의 불변성 특징을 유지하기 위해 배열에 데이터를 삽입할 때는
    // 기존 배열을 수정하는 .push() 대신에 .concat()을 사용한다.
    // 기존의 배열이나 객체는 유지한 채 새로 들어오는 배열이나 객체를 주입해줘야한다.
    const { information } = this.state
    this.setState({
      // 방법(1)
      // information: information.concat({
      //   ...data,
      //   id: this.id++
      // })

      // 방법(2)
      // information: information.concat({
      //   name: data.name,
      //   phone: data.phone,
      //   id: this.id++
      // })

      // 방법(3)
      information: information.concat(Object.assign({}, data, {
        id: this.id++
      }))
    })
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => {
          if (info.id === id) {
            return {
              id,
              ...data
            };
          }
          return info;
        }
      )
    });
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        {/* {JSON.stringify(this.state.information)} */}
        <PhoneInfoList
          data={this.state.information}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        /> 
      </div>
    );
  }
}

export default App;