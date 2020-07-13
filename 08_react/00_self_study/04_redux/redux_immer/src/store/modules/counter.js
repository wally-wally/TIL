import produce from 'immer';

const CHANGE_COLOR = 'counter/CHANGE_COLOR';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

export const changeColor = color => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

const initialState = {
  color: 'red',
  number: 0,
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      return produce(state, draft => {
        draft.color = action.color
      });
    case INCREMENT:
      return produce(state, draft => {
        draft.number++;
      });
    case DECREMENT:
      return produce(state, draft => {
        draft.number--;
      });
    default:
      return state;
  }
}