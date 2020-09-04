import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { cyan, purple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: cyan[800],
        '&:hover': {
            backgroundColor: cyan[900],
        },
    },
}))(Button);

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
                    <Grid container item direction="row" justify="space-between">
                        <Grid item>
                            <Box mb={3} ml={1}>
                                <TextField required id="game-name" name="name" label="Name of the game" defaultValue={this.props.gameToCreate.name} onChange={setGameProperty} />
                            </Box>
                        </Grid>

                        <Grid item>
                            <Box m={1}>
                                <ColorButton component={Link} to={`/create/rooms`} size="small" variant="contained" startIcon={<MeetingRoomIcon />} endIcon={<ChevronRightIcon />}>Rooms</ColorButton>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Box mb={3} ml={1} mr={1}>
                            <TextField
                                id="game-description"
                                name="description"
                                label="Description"
                                multiline
                                rows={14}
                                variant="outlined"
                                defaultValue={this.props.gameToCreate.description}
                                fullWidth
                                onChange={setGameProperty}/>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default GeneralCreatePage;