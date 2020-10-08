import React, { Component } from 'react';

class PlayPage extends Component {
    render() {
        return (
            <div>
                {this.props.gameToPlay.id}
                {this.props.gameToPlay.name}
                {this.props.gameToPlay.description}
            </div>
        )
    }
}

export default PlayPage;