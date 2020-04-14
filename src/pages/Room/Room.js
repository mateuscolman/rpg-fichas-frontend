import React, { Component } from 'react'
import axios from 'axios'
import './Room.css'

export default class Room extends Component {
    state = {
        id: '',
        name: '',
        reference: '',
        players: []
    }

    loggedPlayer(player){
        if(player = localStorage.getItem('email')) 
        console.log(player)
        return ''
    }

    async componentDidMount(){
        const {id}  = this.props.match.params;
        
        axios.get(`http://localhost:3008/room/${id}`)
        .then(res => {
            const game = res
            console.log(game.data[0].name)
            this.setState({
                id: game.data[0]._id,
                name: game.data[0].name,
                reference:  game.data[0].reference,
                players:  game.data[0].players
            })            
        })
    }

    render()
    {
        const game = this.state
        return (
            <>
                <header>
                    <h1>{game.name}</h1>
                </header>
                {game.players.map(player =>
                    <div key={player._id}>
                        <h1>{this.loggedPlayer(player.email)}</h1>
                    </div>)}
            </>
        )
    }
}
