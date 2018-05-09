import React,{Component} from 'react';
import { Message } from 'semantic-ui-react'


 const MESSAGE = ({header,message}) => (
   <Message positive data-testid="success-message">
      <Message.Header>{header}</Message.Header>
      <p>{message}</p>
    </Message>
)

export default MESSAGE
