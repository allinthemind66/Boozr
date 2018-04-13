import React from 'react'
import FormProportions from './FormProportions'

class AddCocktailForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      form: {
        name: '',
        description: '',
        instructions: ''
      },
      proportionsNum: 1
    }
  }

  renderProportions = () => {
    let proportionsNum = this.state.proportionsNum
    let allProportions = []
    for(let i = 0; i < proportionsNum; i++){
      allProportions.push(<FormProportions />)
    }
    return allProportions
  }

  addAnotherProportion = (e) => {
    e.preventDefault()
    this.setState({
      proportionsNum: this.state.proportionsNum + 1
    })
    console.log(this.state.proportionsNum)
  }

  handleInputChange = (e) => {
    console.log(this.state)
    this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value
        }
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
    let self = this.state.form
    // let addDrinkToListFunc = this.props.addDrinkToList()
    // console.log("im inside of handle submit form!!")
    // console.log(this.state.form)
    // this.props.addDrinkToList((json[json.length - 1]))
    fetch('http://localhost:3000/api/v1/cocktails', {
      method: "POST",
      body: JSON.stringify(self),
      headers: ({
        'Content-Type': 'application/json'
      })
    }
  ).then(resp => resp.json())
  .then(json => this.props.addDrinkToList(json[json.length-1]))
  }



  render(){
    return(
      <div>
        <h2>Create A Cocktail</h2>
        <form onSubmit={this.handleSubmitForm}>
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
          <input type='submit' text="Create Cocktail"/>
        </form>
      </div>
    )
  }
}


export default AddCocktailForm
