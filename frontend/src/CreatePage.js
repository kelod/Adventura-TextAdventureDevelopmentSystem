import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';


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
                            <Button component={Link} to={`/created`} startIcon={<UpdateIcon />} variant="contained" size="small" disabled={!props.gameToCreate.id} onClick={props.updateGame} color="primary">Update game</Button>
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
    }

    async handleSubmit() {
        const { game } = this.state;
        const res = await axios.post('/create/', game);
        this.setState({
            gameId: res.data.id
        })
        

    }

    


    render() {
        return (
            <div>
                <PageBody submitGame={this.props.submitGame} updateGame={this.props.updateGame} gameToCreate={this.props.gameToCreate} />
            </div>
        )
    }
}

export default CreatePage;