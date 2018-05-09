import React,{Component} from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'


const Login = ({onSubmit,label1,label2}) => (
  <div className="Login">
  <Form onSubmit={onSubmit}>
    <Form.Field>
      <label>{label1}</label>
      <input placeholder='First Name' data-testid='firstName'/>
    </Form.Field>
    <Form.Field>
      <label>{label2}</label>
      <input placeholder='Last Name' data-testid='lastName'/>
    </Form.Field>
    <Button type='submit' data-testid='submit'>Submit</Button>
    </Form>
  </div>
)


export default Login
