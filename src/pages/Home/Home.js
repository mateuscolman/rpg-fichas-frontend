import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Helmet} from 'react-helmet'
import bg from '../../img/background/home-player.png'
import './Home.css'

export default class Home extends Component {
    state = {
        search: '',
        games: []
    }

    handleClick(e){
        console.log(e)
    }


    updateSearch(event){
        this.setState({search: event.target.value})
    }

    componentDidMount() {
        axios.get('http://localhost:3008/game/list/'+localStorage.getItem('email'))
        .then(res => {
            this.setState({games: res.data})            
        })
    }

    render() {
       
        const bgHome = bg
        let filteredGames = this.state.games.filter(
            (game) => {
                return game.name.indexOf(this.state.search) !== -1;
            }
        )
        return(
        <>
             <Helmet bodyAttributes={{style:
                `   background: url(${bgHome});
                    -webkit-background-size: cover;
                    -moz-background-size: cover;
                    -o-background-size: cover;
                    background-size: cover;
                }`
        }}/>
        <div className="Global">
        <div className="Home-MyGames">
            <img src={require('../../img/icons/my-game.png')}
            alt="Home" 
            width="520"
            height="200" />
        </div>

        <div className="Home-Games" > 
        
            {filteredGames.map(games => 
                <Link className="Entry" to={`/room/${games._id}`}>
                <article key={games._id} className="Home-Game-List">
                    <strong className="Home-Game-Name">{games.name}</strong>
                    <p className="Home-Game-Reference" >{games.reference}</p>
                </article>
                </Link>)}


        </div>

        <div >            
            <input type="text"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
            placeholder='Buscar mesa...'
            /> </div>
        </div>
        </>
        )
    };
}