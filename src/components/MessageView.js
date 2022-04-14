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
            <div style={listView}>
                {messages && <ul style={{listStyle: 'none' }}>{messages.map((message, index) => <li onClick={() => handleMessageClick(index)} style={{ margin: '10px 0' }} key={index}>{message}</li>)}</ul>}
            </div>
          </div>
        )
    }
}

export default MessageView;