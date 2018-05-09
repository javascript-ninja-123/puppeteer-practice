import React,{Component} from 'react';
import Login from './login/login';
import Message from './success/success';

 class APP extends Component {

   state = {
     complete:false,
     firstName:'',
     startWars:''
   }

   async componentDidMount() {
     const res = await fetch('https://swapi.co/api/people/1/')
     const result = await res.json();
     this.setState({startWars:result})
   }

   onSubmit = (e,data) => {
     if(document.cookie.includes('JWT')){
         this.setState({complete:!this.state.complete, firstName:e.target[0].value})
     }
     document.cookie = `firstName=${e.target[0].value}`
   }

    render() {
        return (
            <div className="APP">
                <h1 data-testid='h1'>Hello World</h1>
                <nav className='navbar' role='navigation' data-testid='navbar'>
                  <ul>
                   <li className='nav-li' data-testid='navBarLi'><a href='#'>Home</a></li>
                   <li className='nav-li' data-testid='navBarLi'><a href='#'>About</a></li>
                   <li className='nav-li' data-testid='navBarLi'><a href='#'>Skills</a></li>
                   <li className='nav-li' data-testid='navBarLi'><a href='#'>Works</a></li>
                  </ul>
                </nav>
                {
                  !this.state.complete  ? <Login onSubmit={this.onSubmit}/>
                  : <Message header='this is a header' message='this is a message'/>
                }
                <h3 data-testid='starWars'>{this.state.startWars.url ? 'Recevied it' : "Something wrong"}</h3>
            </div>
        );
    }
}

export default APP
