import React from 'react';

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
store.subscribe(() => console.log(`STORE STATE ${JSON.stringify(store.getState())}`));
store.dispatch({ type: 'ADD_MESSAGE', message: 'How does it look Neil?' });
store.dispatch({ type: 'ADD_MESSAGE', message: 'Looking good' });
store.dispatch({ type: 'ADD_MESSAGE', message: 'Nice day' });
store.dispatch({ type: 'ADD_MESSAGE', message: 'Beautiful day' });
store.dispatch({ type: 'DELETE_MESSAGE', index: 2 });

function App() {
  return (
    <div className='App'>
      <h1>{JSON.stringify(store.getState())}</h1>
    </div>
  )
}
export default App;
