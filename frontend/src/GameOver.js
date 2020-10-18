import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { cyan, purple } from '@material-ui/core/colors';

class GameOver extends Component {
    render() {
        return (
            <Grid container direction="column">
                <Grid item>
                    <AppBar position="static">
                        <Toolbar>
                            <Grid container item justify="center">
                                <Typography variant="h4" align="center">
                                    Adventura
                                </Typography>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Grid>

                <Grid item>
                    <Box boxShadow={3} m={4}>
                        <Typography variant="h6" align="center">
                            {this.props.gameOverText}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Button component={Link} to={`/`} variant="contained" size="small" color="primary" style={{ marginRight: "12pt", backgroundColor: cyan[900] }} fullWidth>Continue</Button>
                </Grid>
            </Grid>
        )
    }
}

export default GameOver;