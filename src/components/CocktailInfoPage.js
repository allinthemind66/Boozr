import React from 'react'

const CocktailInfoPage = (props) => {
  // debugger
  // console.log(props.cocktail.proportions)
  return(
    <div className="cocktailInfo">
      <h1>{props.cocktail.name}</h1>
      <p>{props.cocktail.description}</p>
      <p>{props.cocktail.instructions}</p>
      <h2>Ingredients</h2>
      <ul>
        {props.cocktail.proportions.map(proportion => {
          return <p>-<strong>{proportion.amount}</strong> - {proportion.ingredient_name}</p>
        })}
      </ul>
    </div>
  )
}

export default CocktailInfoPage
