import React from 'react'

// const FormProportions = (props) => {
//   // debugger
//   return(
//     <div>
//       <label>Ingredient Name</label>
//       <input type='text' onChange={props.onChange} />
//       <label>Quantity</label>
//       <input type='text' onChange={props.onChange}/>
//     </div>
//   )
// }

class FormProportions extends React.Component {
  constructor(){
    super()
    this.state = {
      ingredient_name: '',
      quantity: ''
    }
  }

  handleInputChange = (e) => {
    console.log(this.state)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

    render(){
      return(
        <div>
           <label>Ingredient Name</label>
           <input type='text' name="ingredient_name" value={this.state.ingredient_name} onChange={this.handleInputChange}/>
           <label>Quantity</label>
           <input type='text' name="quantity" value={this.state.quantity} onChange={this.handleInputChange}/>
         </div>
      )
  }
}

export default FormProportions
