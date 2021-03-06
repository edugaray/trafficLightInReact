import React, { Component } from 'react'
class Button extends Component {
  render() { 
    return (<button className={this.props.className} onClick={this.props.onClick}>
      {this.props.label}
    </button>);
  }
}
 
export default Button;