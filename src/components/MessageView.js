import React from 'react';

class MessageView extends React.PureComponent {
    render() {
        const { messages, handleMessageClick } = this.props;
        const listView = {
          border: '1px solid black', 
          marginBottom: '10px'
        };
        return (
          <div>
            <h1>Message View</h1>
            {messages.length > 0 && <div style={listView}>
                {messages.map((message, index) => <div onClick={() => handleMessageClick(message.id)} style={{ margin: '10px 0' }} key={index}>
                    <span>{message.text}@{message.timestamp}</span>
                </div>)}
            </div>}
          </div>
        )
    }
}

export default MessageView;