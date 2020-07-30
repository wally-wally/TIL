const INCREASE = 'counter/increase';
const DECREASE = 'counter/decrease';

// export const 변수 = () => (action 객체);
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const initialState = {
  number: 0
};

function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1
      };
    case DECREASE:
      return {
        number: state.number - 1
      };
    default: 
      return state;
  }
}

export default counter;