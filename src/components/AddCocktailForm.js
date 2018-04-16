import React from 'react'
import FormProportions from './FormProportions'

class AddCocktailForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      form: {
        name: '',
        description: '',
        instructions: '',
        proportions: [
          {
            ingredient_name: '',
            amount: ''
          },
        ]
      },
      // proportIngreionsNum: 1
    }
  }

  renderProportions = () => {
    let proportionsNum = this.state.proportionsNum
    let allProportions = []
    for(let i = 0; i < proportionsNum; i++){
      allProportions.push(<FormProportions onChange={this.handleProportionInputChange}/>)
    }
    return allProportions
  }

  addAnotherProportion = (e) => {
    e.preventDefault()
    this.setState({
      proportions: this.state.form.proportions.push({ ingredient_name: '',
      amount: '' }),
    })
    console.log(this.state.form.proportions)
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

  // handleProportionInputChange = (e) => {
  //   // console.log(this.state.form.proportions)
  //   this.setState({
  //     proportions: [
  //       ...this.state.proportions,
  //       [e.target.name]: e.target.value
  //     ]
  //   }, () => console.log(this.state.form.proportions))
  // }

  handleProportionInputChange = (idx) => (evt) => {
    const newProportions = this.state.form.proportions.map((proportion, sidx) => {
      if (idx !== sidx) return proportion;
      return { ...proportion, [evt.target.name]: evt.target.value };
    });

    this.setState({form: {...this.state.form, proportions: newProportions }}, () => console.log(this.state.form));
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
            {this.state.form.proportions.map((proportion, idx) => (
          <div className="proportion">
            <input
              name="ingredient_name"
              type="text"
              placeholder={`proportion #${idx + 1} name`}
              value={this.state.form.proportions.ingredient_name}
              onChange={this.handleProportionInputChange(idx)}
            />
            <input
              name="amount"
              type="text"
              placeholder={`proportion #${idx + 1} amount`}
              value={this.state.form.proportions.amount}
              onChange={this.handleProportionInputChange(idx)}
            />
          </div>
        ))}
          </div>
          <button onClick={this.addAnotherProportion}>+</button>
          <input type='submit' text="Create Cocktail"/>
        </form>
      </div>
    )
  }
}


export default AddCocktailForm
