import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { shadows } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { cyan, purple } from '@material-ui/core/colors';

class PlayPageWelcome extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container item justify="center">
                            <Typography variant="h4" align="center">
                                Adventura
                            </Typography>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Grid container direction="column" fullWidth>
                    <Grid container item>
                        <Box m={4} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h6.fontSize">
                            <TextField id="input-with-icon-grid" label="Session ID" value={this.props.gameToPlay.id} variant="outlined" disabled/>
                        </Box>
                    </Grid>
                    <Grid container item justify="center">
                        <Box m={4} boxShadow={3} fullWidth xs={10}>
                            <Box m={3} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h4.fontSize" fullWidth xs={10}>
                                {this.props.gameToPlay.name}
                            </Box>
                            <Box m={3} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h6.fontSize" fullWidth xs={10}>
                                {this.props.gameToPlay.description}
                            </Box>
                        </Box>
                    </Grid>
                    <Button component={Link} to={`/play`} variant="contained" size="small" color="primary" style={{ marginRight: "12pt", marginLeft: "12pt", backgroundColor: cyan[900] }}>Play</Button>
                </Grid>
            </div>
        )
    }
}

export default PlayPageWelcome;