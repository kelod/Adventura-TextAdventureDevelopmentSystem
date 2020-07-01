import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import CreatePage from './CreatePage';
import PlayPage from './PlayPage';
import ParticularRoomEdit from './ParticularRoomEdit';
import RoomCreatePage from './RoomCreatePage';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import GeneralCreatePage from './GeneralCreatePage';
import GameCreated from './GameCreated';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

var selectedItem = 'Settings';

const homeButtonPressed = (event) => {
    selectedItem = "Settings";
}

function CreatePageHeader() {
    //Menu
    const options = [
        "General",
        "Rooms",
        "Items",
        "Enemies",
        "Etc..."
    ]
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
        selectedItem = event.target.name;
    };


    var items = options.map((option, index) => (
        <MenuItem component={Link} to={`/create/${option.toLowerCase()}`} key={index} value={option} name={option} onClick={handleClose}>
            {option}
        </MenuItem>
    ))

    //Dialogs
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);

    const handleDialogClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleDialogClickOpen1 = () => {
        setOpen1(true);
    };

    const handleDialogClose1 = () => {
        setOpen1(false);
    };
    
    return (
        <Grid container direction="row" alignItems="flex-start">
            <Grid container item>
                <AppBar position="static">
                    <Toolbar variant="dense">
                                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={menuOpen}
                                    onClose={handleClose}
                                >
                                    {items}
                                </Menu>
                                <Typography variant="h6" color="inherit">
                                    {selectedItem}
                                </Typography>
                                <Grid container item justify="right">
                                        <IconButton
                                            component={Link}
                                            to={`/create`}
                                            aria-label="create page"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            color="inherit"
                                            onClick={homeButtonPressed}
                                        >
                                            <SettingsIcon />
                                        </IconButton>
                                </Grid>
                                <IconButton
                                 //   component={Link}
                                  //  to={`/`}
                                    aria-label="home page"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={handleDialogClickOpen1}
                                >
                                    <HomeIcon />
                                </IconButton>

                                <Dialog
                                    open={open1}
                                    onClose={handleDialogClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Clicking this button will navigate you out of the creation phase, and every change will be deleted.
                                            If you want to finish your game, please click the "Finish game" button on the Settings tab.
                                                </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleDialogClose1} color="primary">
                                            Cancel
                                        </Button>
                                        <Button component={Link} to={`/`}  color="primary" autoFocus>
                                            Continue
                                       
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <IconButton
                                   // component={Link}
                                    //to={`/about`}
                                    aria-label="about"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={handleDialogClickOpen}
                                >
                                    <HelpIcon />
                                </IconButton>

                                <Dialog
                                    open={open}
                                    onClose={handleDialogClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Clicking this button will navigate you out of the creation phase, and every change will be deleted.
                                            If you want to finish your game, please click the "Finish game" button on the Settings tab.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleDialogClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button component={Link} to={`/about`} color="primary" autoFocus>
                                            Continue
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                    </Toolbar>
                </AppBar>
            </Grid>
        </Grid>
    )
}

class App extends Component {
    state = {
        createdGameId: '',
        gameToCreate: {
            name: '',
            description: '',
            rooms: []
        }
    }

    constructor(props) {
        super(props);
        this.setGameProperty = this.setGameProperty.bind(this);
        this.submitGame = this.submitGame.bind(this);
        this.addRoom = this.addRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
        this.setRoomName = this.setRoomName.bind(this);
        this.setRoomDescription = this.setRoomDescription.bind(this);
        this.setPassageBetweenRooms = this.setPassageBetweenRooms.bind(this);
        this.hasPassageBetweenRooms = this.hasPassageBetweenRooms.bind(this);
    }

    setGameProperty = (event) => {
        const { name, value } = event.target;
        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                [name]: value
            }
        })
    }

    setRoomName = (index, event) => {
        
        const { value } = event.target;
        var _rooms = this.state.gameToCreate.rooms;
        _rooms[index].name = value;

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                rooms: _rooms
            }
        })
    }

    setPassageBetweenRooms = (roomFrom, roomTo) => {
        var _rooms = this.state.gameToCreate.rooms;

        const newPassage = {
            from: roomFrom,
            to: roomTo
        }

        const passageResult = this.hasPassageBetweenRooms(roomFrom, roomTo);

        if (passageResult) {
            _rooms[_rooms.indexOf(roomFrom)].passages.splice(_rooms[_rooms.indexOf(roomFrom)].passages.indexOf(passageResult), 1);
        }
        else {
            _rooms[_rooms.indexOf(roomFrom)].passages = [..._rooms[_rooms.indexOf(roomFrom)].passages, newPassage];
        }
        
        
        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                rooms: _rooms
            }
        })
    }

    hasPassageBetweenRooms = (roomFrom, roomTo) => {
        const _rooms = this.state.gameToCreate.rooms;
        const _roomFrom = _rooms[_rooms.indexOf(roomFrom)];
        
        for (var i = 0; i < _roomFrom.passages.length; ++i) {
            if (_roomFrom.passages[i].to === roomTo) {
                return _roomFrom.passages[i];
            }
        }
        return null;
    }

    setRoomDescription = (index, event) => {

        const { value } = event.target;
        var _rooms = this.state.gameToCreate.rooms;
        _rooms[index].description = value;

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                rooms: _rooms
            }
        })
    }

    async submitGame() {
        const response = await axios.post('/create', this.state.gameToCreate);
        this.setState({
            createdGameId: response.data.id
        });
    }

    addRoom = (room) => {
        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                rooms: [ ...this.state.gameToCreate.rooms, room ]
            }
        });
    }

    deleteRoom = (index) => {
        var _rooms = this.state.gameToCreate.rooms;
        _rooms.splice(index, 1);

        if (index > -1) {
            this.setState({
                gameToCreate: {
                    ...this.state.gameToCreate,
                    rooms: _rooms
                }
            })
        }
    }

    render() {
        return (
            <Router>
                <Route exact path="/" component={WelcomePage} />
                <Route path="/create" component={CreatePageHeader} />
                <Route exact path="/create" render={(props) => <CreatePage {...props} submitGame={this.submitGame} />} />
                <Route exact path="/created" render={(props) => <GameCreated {...props} gameId={this.state.createdGameId} />} />
                <Route exact path="/play" component={PlayPage} />
                <Route exact path="/create/rooms" render={(props) => <RoomCreatePage {...props} addRoom={this.addRoom} deleteRoom={this.deleteRoom} rooms={this.state.gameToCreate.rooms} />} />
                <Route exact path="/create/rooms/:roomIndex" render={(props) => <ParticularRoomEdit {...props} rooms={this.state.gameToCreate.rooms} setRoomName={this.setRoomName} setRoomDescription={this.setRoomDescription} setPassageBetweenRooms={this.setPassageBetweenRooms} hasPassageBetweenRooms={this.hasPassageBetweenRooms} />} />
                <Route exact path="/create/general" render={(props) => <GeneralCreatePage {...props} setGameProperty={this.setGameProperty} gameToCreate={this.state.gameToCreate} />} />
            </Router>
        );
    }
}

export default App;
