import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(cb => cb());
  };

  const subscribe = (cb) => {
    listeners = [...listeners, cb]
  }

  return {
    getState,
    dispatch,
    subscribe
  };
}

function reducer(state, action) {
  switch(action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.message]};
    case 'DELETE_MESSAGE':
      return { ...state, messages: [...state.messages.slice(0, action.index), ...state.messages.slice(action.index + 1, state.messages.length)]};
    default:
      return state;
  }
}

const initialState = {
  messages: []
};

const store = createStore(reducer, initialState)
store.dispatch({ type: 'ADD_MESSAGE', message: 'How does it look Neil?' });
store.dispatch({ type: 'ADD_MESSAGE', message: 'Looking good' });
store.dispatch({ type: 'ADD_MESSAGE', message: 'Nice day' });
store.dispatch({ type: 'ADD_MESSAGE', message: 'Beautiful day' });
store.dispatch({ type: 'DELETE_MESSAGE', index: 2 });

class App extends React.PureComponent {
  state = {
    message: ''
  }
  componentDidMount() {
    store.subscribe(() => this.forceUpdate())
  }
  render() {
    const { messages } = store.getState();
    const listView = {
      border: '1px solid black', 
      marginBottom: '10px'
    };
    const { message } = this.state;
    return (
      <div>
      <h1>Message View</h1>
      <div style={listView}>
        {messages && <ul style={{listStyle: 'none' }}>{messages.map((message, index) => <li onClick={() => store.dispatch({ type: 'DELETE_MESSAGE', index })} style={{ margin: '10px 0' }} key={index}>{message}</li>)}</ul>}
      </div>
      <Box
        component="form"
        sx={{
          border: '1px solid black',
          '& > :not(style)': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField value={this.state.message} onChange={(evt) => this.setState({ message: evt.target.value })} id="outlined-basic" label="Outlined" variant="outlined" />
        <Button variant="contained" onClick={() => { 
          store.dispatch({ type: 'ADD_MESSAGE', message }); 
          this.setState({ message: '' })
        }}>Submit</Button>
      </Box>
      </div>
    )
    }
}
export default App;
