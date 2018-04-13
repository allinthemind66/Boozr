import React from 'react'
import CocktailCard from './CocktailCard'
import CocktailInfoPage from './CocktailInfoPage'
import AddCocktailForm from './AddCocktailForm'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
class CocktailsContainer extends React.Component {
  constructor(){
    super()
    this.state = {
      cocktails: [],
      currentCocktail: [],
      cocktailClicked: false,
      form: {
        name: '',
        description: '',
        instructions: '',
        // proportions: [
        //   {
        //     ingredient_name: '',
        //     ingredient_proportion: ''
        // }
        // ]
      }
      }
    }




  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/cocktails')
    .then(resp => resp.json())
    .then(json => this.setState({
      cocktails: json
    }))
  }

  renderCocktailsToPage = () => {
    return this.state.cocktails.map(cocktail => {
    return  <CocktailCard key={cocktail.name} handleIndividualCocktail={this.handleIndividualCocktail} cocktailDetails={cocktail} />
    })
  }

  handleIndividualCocktail = (cocktail) => {
    // debugger
    let cocktailId = cocktail.id
    fetch(`http://localhost:3000/api/v1/cocktails/${cocktailId}`)
    .then(resp => resp.json())
    .then(json => this.setState({

      currentCocktail: json,
      cocktailClicked: true
    }))
  }

  renderCurrentCocktailToPage = () => {
    return <CocktailInfoPage cocktail={this.state.currentCocktail} />
  }

  // handleSubmitForm = (e) => {
  //   e.preventDefault()
  //   debugger
  //   console.log(this.props.state.form)
  //   console.log("im inside of handle submit form!!")
  // //   fetch('http://localhost:3000/api/v1/cocktails',
  // //     method: "POST",
  // //     body: JSON.stringify(this.props.state.form),
  // //     headers: ({
  // //   'Content-Type': 'application/json'
  // // })
  // // )
  // }

  // handleInputChange = (e) => {
  //   // console.log(this.state.form)
  //   this.setState({
  //     form: {
  //       ...this.state.form,
  //       [e.target.name]: e.target.value
  //     }
  //   })
  // }

  // handleNestedInputChange = (e) => {
  //   // console.log(this.state.form.proportions)
  //   this.setState({
  //     form: {
  //       ...this.state.form,
  //       proportions: [
  //         ...this.state.form.proportions,
  //         [e.target.name]: e.target.value
  //       ]
  //     }
  //   })
  // }

  render(){
    return(
      <div className="wrapper">
          <div className="sideBar one">
            {this.renderCocktailsToPage()}
          </div>
          <Router>
          <div className="two">
          {this.state.cocktailClicked ? this.renderCurrentCocktailToPage() : null}
        </div>
        </Router>
        <div className="three">
          <AddCocktailForm state={this.state} /*handleNestedInputChange={this.handleNestedInputChange} /*handleInputChange={this.handleInputChange}*/ /*handleSubmitForm={this.handleSubmitForm}*//>
        </div>
      </div>
    )
  }
}

export default CocktailsContainer
