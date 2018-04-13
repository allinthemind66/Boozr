import React from 'react'

const CocktailCard = (props) => {
  // console.log(props.cocktailDetails)
  return(
    <div>
      <h4 onClick={() => props.handleIndividualCocktail(props.cocktailDetails)}>{props.cocktailDetails.name}</h4>
      <hr/>
    </div>
  )
}

export default CocktailCard
