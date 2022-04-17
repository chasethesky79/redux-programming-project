import React from 'react';

import { createStore } from 'redux';
import MessageView from './components/MessageView';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {v4 as uuidv4} from 'uuid';

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
       id: 0,
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
       id: 1,
       title: 'Michael Collins',
       messages: []
     }
  ]
};

const store = createStore(reducer, initialState);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class App extends React.PureComponent {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate())
  }
  render() {
      const { activeThreadId, threads } = initialState;
      const handleFormSubmit = (text) => store.dispatch({ type: 'ADD_MESSAGE', text });
      const handleMessageClick = (id) => store.dispatch({ type: 'DELETE_MESSAGE', id });
      console.log(`THREADS ${JSON.stringify(threads)}`);
      return (
      <Box sx={{ width: '100%', float: 'center' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs aria-label="basic tabs example">
            {threads && threads.map((thread, index) => 
            <Tab label={thread.title}> 
              <TabPanel value={index} index={index}>
                  <MessageView handleMessageClick={handleMessageClick} thread={thread} handleFormSubmit={handleFormSubmit}/>
              </TabPanel>
            </Tab>)}
          </Tabs>
        </Box>
      </Box>
    )
  }
}

export default App;
