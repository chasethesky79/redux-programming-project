import React from 'react';

import { createStore } from 'redux';
import {v4 as uuidv4} from 'uuid';
import Thread from '../src/components/Thread';
import ThreadTabs from '../src/components/ThreadTabs';

function reducer(state, action) {
  switch(action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, { id: uuidv4(), timestamp: Date.now(), text: action.text }]};
    case 'DELETE_MESSAGE': {
      const { messages } = state;
      return { ...state, messages: messages.filter(message => message.id !== action.id )};
    }
    default:
      return state;
  }
}

const initialState = {
  activeThreadId: '1-fca2',
  threads: [
     {
       id: '1-fca2',
       title: 'Buzz Aldrin',
       messages: [
         {
           text: 'Twelve minutes to ignition',
           timestamp: Date.now(),
           id: uuidv4()
         }
       ]
     },
     {
       id: '2-be91',
       title: 'Michael Collins',
       messages: []
     }
  ]
};

const store = createStore(reducer, initialState);

class App extends React.PureComponent {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate())
  }
  render() {
      const { activeThreadId, threads } = store.getState();
      const activeThread = threads.find(thread => thread.id === activeThreadId);
      const tabs = threads.map(({ title, id }) => ({ title, active: id === activeThreadId }));
      return (
        <div className='ui segment'>
          <ThreadTabs tabs={tabs}/>
          <Thread thread={activeThread}/>
        </div>)
  }
}

export default App;
