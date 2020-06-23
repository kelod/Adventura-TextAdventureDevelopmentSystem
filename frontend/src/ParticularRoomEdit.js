import React, { Component } from 'react';

class ParticularRoomEdit extends Component {

    render() {
        const { match: { params } } = this.props;

        return (
            <div>
                {params.roomIndex}
            </div>
        )
    }

}

export default ParticularRoomEdit;