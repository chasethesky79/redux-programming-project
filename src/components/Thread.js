import React from 'react';

import MessageInput from './MessageInput';

class Thread extends React.PureComponent {
    render() {
        const { thread: { messages }} = this.props;
        return (
            <div className='ui center aligned basic segment'>
                <div className='ui comments'>
                    {messages.length > 0 && messages.map((message, index) =>
                        <div style={{ margin: '10px 0' }} key={index}>
                            <span>{message.text}@{message.timestamp}</span>
                        </div>)
                    }                   
                </div>
                <MessageInput/>
            </div>
        )
    }
}

export default Thread;