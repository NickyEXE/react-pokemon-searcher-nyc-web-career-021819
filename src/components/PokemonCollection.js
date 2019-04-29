import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {


  renderPokemon = () => this.props.pokemon.map((pokemon, idx) => <PokemonCard {...pokemon} key={idx}/>)

  render() {
    console.log("in pokemon collection", this.props)
    return (
      <Card.Group itemsPerRow={6}>
        {this.renderPokemon()}
      </Card.Group>
    )
  }
}

export default PokemonCollection
