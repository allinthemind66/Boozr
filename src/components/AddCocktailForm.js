import React from 'react'
import FormProportions from './FormProportions'

class AddCocktailForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      description: '',
      instructions: '',
      proportionsNum: 1
    }
  }

  renderProportions = () => {
    
  }

  addAnotherProportion = (e) => {
    e.preventDefault()
    this.setState({
      proportions: [...this.state.proportions, <FormProportions state={this.props.state.form} onChange={this.props.handleProportionInputChange}/>]
    })
  }

  handleInputChange = (e) => {
    console.log(this.state)
    this.setState({

        [e.target.name]: e.target.value
    })
  }

  handleProportionInputChange = (e) => {
    // console.log(this.state.form.proportions)
    this.setState({
    [e.target.name]: e.target.value
    })
  }

  handleSubmitForm = (e) => {
    e.preventDefault()
    console.log(this.state.proportions[0])
    console.log("im inside of handle submit form!!")
  //   fetch('http://localhost:3000/api/v1/cocktails',
  //     method: "POST",
  //     body: JSON.stringify(this.props.state.form),
  //     headers: ({
  //   'Content-Type': 'application/json'
  // })
  // )
  }



  render(){
    return(
      <div>
        <h2>Create A Cocktail</h2>
        <form >
          <label>Name</label>
          <br/>
          <input onChange={this.handleInputChange} type='text' name='name' value={this.state.name}/>
          <br/>
          <label>Description</label>
          <br/>
          <textarea onChange={this.handleInputChange} type='text' name='description' value={this.state.description}/>
          <br/>
          <label>Instructions</label>
          <br/>
          <textarea onChange={this.handleInputChange} type='text' name='instructions' value={this.state.instructions}/>
          <br/>
          <h3>Proportions</h3>
          <div>
            {this.renderProportions()}
          </div>
          <button onClick={this.addAnotherProportion}>+</button>
          <input onClick={this.handleSubmitForm} type='submit' text="Create Cocktail"/>
        </form>
      </div>
    )
  }
}


export default AddCocktailForm
