import React, { Component } from 'react';

export default function GameCreated(props) {
    const { gameId } = props;
    console.log(gameId);
    return (
        <div>
            Thanks! Your game ID is {gameId}
        </div>
    )
}