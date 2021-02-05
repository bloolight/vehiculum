import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Avatar, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { initChat, sendMessage } from '../../store/reducers/chat';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: '#f1f1f1'
  },
  form: {
    maxWidth: '760px',
    margin: '0 auto',
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
  },
  layout: {
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    backgroundColor: '#ffffff',
    padding: '24px',
    boxShadow: 'inset 0px -2px 3px #efefef'
  },
  actionWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: '#fdfdfd'
  },
  sendButton: {
    width: '120px',
    marginLeft: '20px'
  },
  bubbleBot: {
    display: 'flex',
    alignItems: 'end',
    margin: '5px 0'
  },
  bubbleUser: {
    display: 'flex',
    alignItems: 'end',
    flexDirection: 'row-reverse',
    margin: '5px 0'
  },
  messageBot: {
    background: '#f2f6f9',
    margin: '0',
    padding: '11px',
    marginLeft: '10px',
    borderRadius: '10px',
    maxWidth: '480px',
    textAlign: 'left'
  },
  messageUser: {
    background: '#daf4fd',
    margin: '0',
    padding: '11px',
    marginRight: '10px',
    borderRadius: '10px',
    maxWidth: '480px',
    textAlign: 'left'
  }
}));

const ChatBubble = (props) => {
  const { history, index } = props;
  const classes = useStyles();
  const isBot = history.from === 'bot';

  return (
    <div className={isBot ? `${classes.bubbleBot}` : `${classes.bubbleUser}`} style={ index === 0 ? { marginTop:'auto'} : {}}>
      <Avatar alt={history.from} src={isBot ? '/img/bot.png' : '/img/user.png'}/>
      <p className={isBot ? `${classes.messageBot}` : `${classes.messageUser}`}>{history.message}</p>
    </div>
  )
};

export const Chat = () => {
  const dispatch = useDispatch();
  const [ message, setMessage ] = useState('');
  const [ available, setAvailable ] = useState(false);
  const chatHistory = useSelector((state) => state.chat.chatHistory);
  const isInitialized = useSelector((state) => state.chat.isInitialized);
  const classes = useStyles();

  const handleInputChange = (event) => {
    setMessage(event.target.value);
    if (event.target.value !== '') {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  };

  const handleMessageSend = () => {
    if (message === '')
      return;

    dispatch(sendMessage(message));
    setMessage('');
    setAvailable(false);
  };

  const onKeyDown = (event) => {
    if(event.keyCode === 13) {
      handleMessageSend();
    }
  };

  const messagesEndRef = React.createRef();

  useEffect(() => {
    dispatch(initChat());
  }, []);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className={classes.root}>
      <h2>Chat Room</h2>
      <div className={classes.form}>
        <div className={classes.layout}>
          {chatHistory.map((history, index) => {
            return <ChatBubble key={index} index={index} history={history}/>
          })}
          <div ref={messagesEndRef}/>
        </div>
        <div className={classes.actionWrapper}>
          <TextField
              id="message"
              placeholder="Type message here..."
              fullWidth
              value={message}
              onKeyDown={onKeyDown}
              onChange={handleInputChange}/>
          <Button
              className={classes.sendButton}
              variant="contained"
              color="primary"
              disabled={!isInitialized || !available}
              onClick={handleMessageSend}>Send</Button>
        </div>
      </div>
    </div>
  );
};
