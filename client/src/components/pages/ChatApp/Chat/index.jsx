import React from 'react';

import Navbar from '../../../organisms/Navbar';
import ChatButton from '../../../molecules/ChatButton';
import Messages from '../../../organisms/Messages';

import Search from '../../../atoms/InputSearch';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container, Chats } from './styles';

const Chat = () => (
  <>
    <Chats>
      <Search />
      <ChatButton
        name="Francisco Gustavo"
        message="Hello friend in hard code"
        badge="16"
      />
      <ChatButton
        name="Francisco Gustavo"
        message="Hello friend in hard code"
        badge="1"
        active
      />
    </Chats>
    <Router>
      <Route exact path="/app/chat/:id" component={Messages} /> 
    </Router>
  </>
);

/*
const Chat = () => (
  <Container>
    <Navbar />

    
  </Container>
);
*/
export default Chat;