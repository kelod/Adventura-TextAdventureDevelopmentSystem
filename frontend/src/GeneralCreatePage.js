import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

/*export default function GeneralCreatePage(props) {
    return (
        <TextField required id="game-name" label="Name of the game" placeHolder="Type here..." onChange={props.setGameName} value='vmiValue'/>
    )
}*/

class GeneralCreatePage extends Component {

    

    constructor(props) {
        super(props);
    }

    setName = (event) => {
        const { value } = event.target;
        this.setState({
            gameName: value
        })
        console.log(this.state.gameName);
    }

    render() {
        const { setGameProperty } = this.props;
        return (
            <div>
                <Grid container direction="column">
                    <Grid container item justify="center">
                        <Box m={4} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h6.fontSize">
                            Here you can add some general data about your game
                        </Box>  
                    </Grid>
                    <Grid item>
                        <Box mb={3} ml={1}>
                            <TextField required id="game-name" name="name" label="Name of the game" defaultValue={this.props.gameToCreate.name} onChange={setGameProperty} />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box mb={3} ml={1}>
                            <TextField
                                id="game-description"
                                name="description"
                                label="Description"
                                multiline
                                rows={16}
                                variant="outlined"
                                defaultValue={this.props.gameToCreate.description}
                                onChange={setGameProperty}/>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default GeneralCreatePage;