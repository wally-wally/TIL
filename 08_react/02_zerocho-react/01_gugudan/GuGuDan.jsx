const React = require('react');
const { useState, useRef, Fragment } = React;

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  const onSumbitForm = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult((prevResult) => {
        return `정답: ${value}`
      });
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
    } else {
      setResult('땡');
      setValue('');
    }
    inputRef.current.focus();
  }

  return (
    <Fragment>
      <div>{first} 곱하기 {second}는?</div>
      <form onSubmit={onSumbitForm}>
        <input ref={inputRef} onChange={onChangeInput} value={value} />
        <button>입력!</button>
      </form>
      <div id="result">{result}</div>
    </Fragment>
  );
}

module.exports = GuGuDan;