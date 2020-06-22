import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';


const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

function PageBody(props) {
 
    return (
        <div>
            <Typography variant="h6" color="inherit">
                <Box textAlign="center" m={2} fontWeight="fontWeightMedium" fontFamily="Monospace">
                    Create your own game using the menu options on the top left corner. If you have finished click the "finish game" button below!
                </Box>    
            </Typography>
            <Card variant="outlined" align="center">
                  <Grid container justify="center">
                        <Grid item>
                        <CardActions>
                            <ColorButton component={Link} to={`/created`} startIcon={<SaveIcon />} variant="contained" size="small" onClick={props.submitGame}>Finish game!</ColorButton>
                            <Button component={Link} to={`/`} startIcon={<DeleteIcon />} variant="contained" size="small" color="secondary">Back to main page</Button>
                             </CardActions>
                        </Grid>
                  </Grid>
            </Card>
                
        </div>
    )
}

class CreatePage extends Component {

    state = {
        gameId: '',
        game: {
            name: 'default'
        }
    }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.state.game.name);
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            game: {
                [name]: value
            }
        })
    }

    setGameName = (event) => {
        const { value } = event.target;
        this.setState({
            game: {
                name: value
            }
        })
        console.log('set Game name meghivodik');
    }

    async handleSubmit() {
        const { game } = this.state;
        const res =  await axios.post('/create/', game);
        this.setState({
            gameId: res.data.id
        })
        

    }

    


    render() {
        return (
            <div>
                <PageBody submitGame={this.props.submitGame} />
            </div>
        )
    }
}

export default CreatePage;