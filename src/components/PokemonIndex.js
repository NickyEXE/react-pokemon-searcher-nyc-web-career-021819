import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemon: {},
    search: ""
}

  componentDidMount(){
    this.fetchAllPokemon()
  }


  fetchAllPokemon(){
    fetch ("http://localhost:3000/pokemon")
    .then(response => response.json())
    .then(response => this.setState({pokemon: response}))
  }

  searchFilter = (e, value) => this.setState({search: value.value})

  filteredPokemon = () => this.state.pokemon.filter(pokemon => pokemon.name.includes(this.state.search))

  addNewPokemon = (state) => fetch("http://localhost:3000/pokemon", {
    method: 'post',
    mode: 'cors',
    headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        name: state.name,
        stats:[{name: "hp", value: state.hp}],
        sprites: {front: state.frontUrl, back: state.backUrl}
      }
    )
  })
    .then(response =>response.json())
    .then(response => this.fetchAllPokemon())

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.searchFilter, 500)} showNoResults={false} />
        <br />
        {this.state.pokemon.length > 0 ? <PokemonCollection pokemon={this.filteredPokemon()} /> : "Pokemon loading or absent"}
        <br />
        <PokemonForm addNewPokemon={this.addNewPokemon} />
      </div>
    )
  }
}

export default PokemonPage
