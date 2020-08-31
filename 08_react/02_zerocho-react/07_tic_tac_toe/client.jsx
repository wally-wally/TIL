import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import TicTacToc from './TicTacToc';

const Hot = hot(TicTacToc);

ReactDOM.render(<Hot />, document.querySelector('#root'));