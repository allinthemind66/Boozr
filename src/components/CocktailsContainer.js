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
      currentCocktail: '',
      cocktailClicked: false,
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

  addDrinkToList = (drink) => {
  
    this.setState({
      cocktails: [...this.state.cocktails, drink]
    },   console.log(this.state.cocktails[this.state.cocktails.length - 1]))

  }



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
          <AddCocktailForm addDrinkToList={this.addDrinkToList} state={this.state} /*handleNestedInputChange={this.handleNestedInputChange} /*handleInputChange={this.handleInputChange}*/ /*handleSubmitForm={this.handleSubmitForm}*//>
        </div>
      </div>
    )
  }
}

export default CocktailsContainer
