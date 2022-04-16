import React from 'react';

import { createStore } from 'redux';
import MessageView from './components/MessageView';
import MessageInput from './components/MessageInput';
import {v4 as uuidv4} from 'uuid';

function reducer(state, action) {
  switch(action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, { id: uuidv4(), timestamp: Date.now(), message: action.text }]};
    case 'DELETE_MESSAGE': {
      const { messages } = state;
      return { ...state, messages: messages.filter(message => message.id !== action.id )};
    }
    default:
      return state;
  }
}

const initialState = {
  messages: []
};

const store = createStore(reducer, initialState);

class App extends React.PureComponent {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate())
  }
  render() {
      const { messages } = store.getState();
      const handleFormSubmit = (text) => store.dispatch({ type: 'ADD_MESSAGE', text });
      const handleMessageClick = (id) => store.dispatch({ type: 'DELETE_MESSAGE', id });
      return (
      <div>
        <MessageView handleMessageClick={handleMessageClick} messages={messages}/>
        <MessageInput handleFormSubmit={handleFormSubmit}/>
      </div>
    )
  }
}
export default App;
