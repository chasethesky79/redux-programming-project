import React from 'react';

import MessageInput from './MessageInput';

class Thread extends React.PureComponent {
    render() {
        const { thread: { id, messages }, handleFormSubmit, handleMessageClick } = this.props;
        const handleMessageInput = text =>  handleFormSubmit(id, text);
        return (
            <div className='ui center aligned basic segment'>
                <div className='ui comments'>
                    {messages.length > 0 && messages.map((message, index) =>
                        <div style={{ margin: '10px 0' }} key={index} onClick={() => handleMessageClick(id, message.text)}>
                            <span>{message.text}@{message.timestamp}</span>
                        </div>)
                    }                   
                </div>
                <MessageInput handleMessageInput={handleMessageInput}/>
            </div>
        )
    }
}

export default Thread;