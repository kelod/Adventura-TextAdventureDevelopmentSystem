import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, purple, blue } from '@material-ui/core/colors';
import { spacing } from '@material-ui/system';
import { sizing } from '@material-ui/system';


const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);



class WelcomePage extends Component {

    state = {
        gameId: '',
        gameCreationId: ''
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.queryGame = this.queryGame.bind(this);
    }

    handleChange(event) {
        const { name,value } = event.target;
        this.setState({
            [name]: value
        })
    }

    async queryGame(id){
        const response = await axios.get(`/create/postman/${id}`);
        this.props.setGameState(response.data);
        this.props.history.push('/create');
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Typography variant="h3" align="center">
                        Welcome to Adventura!
                        </Typography>
                </AppBar>

                <Box m={6}>
                    <Grid container direction='row' alignItems="fill" spacing={3}>
                        <Grid item xs={6}>
                            <Card style={{ height: '100%' }} variant="outlined">
                                        <CardContent>
                                            <Typography color="textSecondary" gutterBottom>
                                                Create a new game
                                                </Typography>
                                            <Typography variant="h5" component="h2" >
                                                To create a new game, please click the button below!
                                                </Typography>

                                            <Box mt={2}>
                                                <TextField
                                                    name="gameCreationId"
                                                    id="outlined-required"
                                                    label="Game reation ID"
                                                    placeHolder="Enter game code here..."
                                                    variant="outlined"
                                                    onChange={this.handleChange}
                                                />
                                            </Box>
                                        </CardContent>
                                <CardActions>
                                    <ColorButton size="small" variant="contained" color="primary" /*href="/create"*/ onClick={() => { this.queryGame(this.state.gameCreationId) }}>Load game</ColorButton>
                                    <ColorButton size="small" variant="contained" color="primary" href="/create">Create new game</ColorButton>
                                        </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card style={{ height: '100%' }} variant="outlined">
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Play game, have fun
                                        </Typography>
                                    <Typography variant="h5" component="h2">
                                        To play a game, please type the code of the game below, and press Start!
                                        </Typography>
                                    <Box mt={2}>
                                        <TextField
                                            required
                                            name="gameId"
                                            id="outlined-required"
                                            label="Required"
                                            placeHolder="Enter game code here..."
                                            variant="outlined"
                                            onChange={this.handleChange}
                                        />
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary" size="small">Start!</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={6} align="center">
                    <Button size="small" variant="contained" color="primary" href="/about">About Adventura</Button>
                </Box>
            </div>
        )
    }
    
}

export default WelcomePage
