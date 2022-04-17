import React from 'react';

import Tab from '@mui/material/Tab';
import MessageInput from './MessageInput';

class MessageView extends React.PureComponent {
    render() {
        const { thread , handleMessageClick, handleFormSubmit } = this.props;
        const { messages, title } = thread;
        console.log(`MESSAGES ${JSON.stringify(thread)}`);
        const listView = {
          border: '1px solid black', 
          marginBottom: '10px'
        };
        return (
            <Tab label={title}>
                {messages.length > 0 && 
                <div style={listView}>
                    {messages.map((message, index) => 
                    <div onClick={() => handleMessageClick(message.id)} style={{ margin: '10px 0' }} key={index}>
                        <span>{message.text}@{message.timestamp}</span>
                    </div>)}
                </div>}
                <MessageInput handleFormSubmit={handleFormSubmit}/>
            </Tab>
        )
    }
}

export default MessageView;