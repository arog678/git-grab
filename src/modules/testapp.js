import { Component } from "react";


class ContactForm extends Component {
	state = {
	  firstName:"",
	  age: "0",
	  email: ""
	}
  
	setName(firstName) {
	   this.setState({firstName});
	}
  
	setAge(age) {
	  this.setState({age});
	  console.log(this.state.age);
	}
  
	setEmail(email) {
	  this.setState({email});
	}
  
	render() {
	  const validAge = parseInt(this.state.age) >= 14;
	  console.log(validAge)
	  return <div>
		{
		  <div>
			<input 
			name="firstName"
			value={this.state.firstName} 
			   type="text"
			onChange={(event) => this.setName(event)}></input>
			<input 
			name="age"
			 type="text"
			value={this.state.age} 
			onChange={(event) => this.setAge(event)}></input>
			{validAge ? 
			<input 
			name="email"
			   type="text"
			id="email"
			value={this.state.email} 
			onChange={(event) => this.setEmail(event)}></input>
			: null}
		  </div>
		}
	  </div>
	}
  }
  
export default ContactForm;
