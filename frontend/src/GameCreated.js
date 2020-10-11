import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { cyan } from '@material-ui/core/colors';

class GameCreated extends Component {

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                       <Grid container item justify="center">
                            <Typography variant="h4" align="center">
                                Thanks for using Adventura!
                            </Typography>
                       </Grid>
                    </Toolbar>
                </AppBar>
                <Grid container direction="column" fullWidth>
                    <Grid container item justify="center">
                        <Box m={4} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h6.fontSize">
                            Thanks! Your game's ID is: 
                        </Box>
                    </Grid>
                    <Grid container item justify="center">
                        <TextField id="input-with-icon-grid" label="Game ID" value={this.props.gameId} variant="outlined" disabled style={{marginBottom: "24pt"}}/>
                    </Grid>
                    <Button component={Link} to={``} startIcon={<HomeIcon />} variant="contained" size="small" color="primary" style={{marginRight: "12pt", marginLeft:"12pt", backgroundColor: cyan[900]}}>Go to home page</Button>
                </Grid>
            </div>
        )
    }
}

export default GameCreated;