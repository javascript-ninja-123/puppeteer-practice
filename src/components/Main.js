import React,{Component} from 'react';
import { Button, Form } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Success from './success/success';

class Main extends Component {

    state = {
      firstName:'',
      lastName:'',
      complete:false
    }

    async componentDidMount() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const result = await res.json();
    }

    onSubmit = (e) => {
      this.setState({complete:!this.state.complete})
    }
    onChange = (e,text) => this.setState({[text]:e.target.value})

    render() {
        return (
            <div className="Main">
                <h1 data-testid='mainH1'>This is a main page</h1>
                <Link to='/' data-testid='linktoHome'>back to home</Link>
                <Form onSubmit={this.onSubmit}>
                <Form.Field>
                  <label>First Name</label>
                  <input placeholder='First Name'
                    value={this.state.firstName}
                    data-testid='firstName'
                    onChange={e => this.onChange(e,'firstName')}
                   />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input placeholder='Last Name'
                    value={this.state.lastName}
                    data-testid='lastName'
                    onChange={e => this.onChange(e,'lastName')}
                   />
                </Form.Field>
                <Button type='submit'  data-testid='submit'>Submit</Button>
              </Form>
              {
                this.state.complete ? <Success header='ddd' message='dsfads'/> : 'nothing'
              }
            </div>
        );
    }
}

export default Main
