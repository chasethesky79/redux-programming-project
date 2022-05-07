import React from 'react';

import { createStore } from 'redux';
import {v4 as uuidv4} from 'uuid';
import Thread from '../src/components/Thread';
import ThreadTabs from '../src/components/ThreadTabs';

function reducer(state, action) {
  const { threadId, text } = action;
  switch(action.type) {
    case 'ADD_MESSAGE': {
      return { ...state, threads: state.threads.map(thread => thread.id === threadId 
        ? { ...thread, messages: [...thread.messages, { id: uuidv4(), timestamp: Date.now(), text }]}
        : thread)};
    }
    case 'DELETE_MESSAGE': {
      return { ...state, threads: state.threads.map(thread => thread.id === threadId 
        ? { ...thread, messages: thread.messages.filter(message => message.text !== text) }
        : thread)};
    }
    case 'OPEN_THREAD': {
      return { ...state, activeThreadId: threadId }
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
      const handleFormSubmit = (threadId, text) => store.dispatch({ type: 'ADD_MESSAGE', threadId, text });
      const handleMessageClick = (threadId, text) => store.dispatch({ type: 'DELETE_MESSAGE', threadId, text });
      const handleTabClick = (threadId) => store.dispatch({ type: 'OPEN_THREAD', threadId });
      const { activeThreadId, threads } = store.getState();
      const activeThread = threads.find(thread => thread.id === activeThreadId);
      const tabs = threads.map(({ title, id }) => ({ title, active: id === activeThreadId, id }));
      return (
        <div className='ui segment'>
          <ThreadTabs tabs={tabs} handleTabClick={handleTabClick}/>
          <Thread thread={activeThread} handleFormSubmit={handleFormSubmit} handleMessageClick={handleMessageClick}/>
        </div>)
  }
}

export default App;
