import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class MessageInput extends React.PureComponent {
    state = {
        message: ''
    }
    render() {
    const { handleMessageInput } = this.props;
    const { message } = this.state;
    return (
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            marginTop: '10px'
            }}
            noValidate
            autoComplete="off"
        >
            <TextField value={message} onChange={(evt) => this.setState({ message: evt.target.value })} id="outlined-basic" label="Outlined" variant="outlined" />
            <Button variant="contained" onClick={() => { 
                handleMessageInput(message);
                this.setState({ message: '' });
            }}>Submit</Button>
        </Box>
      )
    }
}

export default MessageInput;