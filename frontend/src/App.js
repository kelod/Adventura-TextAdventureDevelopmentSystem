import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import CreatePage from './CreatePage';
import PlayPage from './PlayPage';
import ParticularRoomEdit from './ParticularRoomEdit';
import ParticularItemEdit from './ParticularItemEdit';
import RoomCreatePage from './RoomCreatePage';
import ItemCreatePage from './ItemCreatePage';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
import axios from 'axios';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Icon } from '@iconify/react';
import toolsIcon from '@iconify/icons-mdi/tools';
import swordCross from '@iconify/icons-mdi/sword-cross';
import { cyan } from '@material-ui/core/colors';

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
        const { myValue } = event.currentTarget.dataset;
        selectedItem = myValue;
    };

    var items = options.map((option, index) => {

        var icon;
        switch (option) {
            case "General": {
                icon = <MenuBookIcon style={{ color: cyan[900] }}/>;
                break;
            }
            case "Rooms": {
                icon = <MeetingRoomIcon style={{ color: cyan[900] }} />;
                break;
            }
            case "Items": {
                icon = <Icon icon={toolsIcon} style={{fontSize: "24px", color: cyan[900]}}/>;
                break;
            }
            case "Enemies": {
                icon = <Icon icon={swordCross} style={{ fontSize: "24px", color: cyan[900] }} />;
                break;
            }
            default: break;
        }

        return(
            <MenuItem component={Link} to={`/create/${option.toLowerCase()}`} key={index} data-my-value={option} name={option} onClick={handleClose}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={option} />
            </MenuItem>
        )
    });

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
                <AppBar position="fixed">
                    <Toolbar variant="dense" style={{backgroundColor: cyan[700]}}>
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
                <Toolbar />
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
            rooms: [],
            items: []
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
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.setItemDescription = this.setItemDescription.bind(this);
        this.setItemName = this.setItemName.bind(this);
        this.renderItemToRoom = this.renderItemToRoom.bind(this);
        this.setItemToRoom = this.setItemToRoom.bind(this);
        this.IsItemInRoom = this.IsItemInRoom.bind(this);
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

    addItem = (item) => {
        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                items: [...this.state.gameToCreate.items, item]
            }
        });
    }

    deleteItem = (index) => {
        var _items = this.state.gameToCreate.items;
        _items.splice(index, 1);

        if (index > -1) {
            this.setState({
                gameToCreate: {
                    ...this.state.gameToCreate,
                    items: _items
                }
            })
        }
    }

    setItemName = (index, event) => {

        const { value } = event.target;
        var _items = this.state.gameToCreate.items;
        _items[index].name = value;

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                items: _items
            }
        })
    }

    setItemDescription = (index, event) => {

        const { value } = event.target;
        var _items = this.state.gameToCreate.items;
        _items[index].description = value;

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                items: _items
            }
        })
    }

    renderItemToRoom = (itemIndex, event) => {
        var _items = this.state.gameToCreate.items;
        _items[itemIndex].presentInRoom = event.target.value;

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                items: _items
            }
        })
    }

    setItemToRoom = (room, item) => {
        var _rooms = this.state.gameToCreate.rooms;
        var _items = this.state.gameToCreate.items;

       /* if (_rooms[_rooms.indexOf(item.presentInRoom)]) {
            _rooms[_rooms.indexOf(item.presentInRoom)].items.splice(_rooms[_rooms.indexOf(item.presentInRoom)].items.indexOf(item), 1);
        }*/

        if (!item.presentInRoom) {
            
            _items[_items.indexOf(item)].presentInRoom = room;
            _rooms[_rooms.indexOf(room)].items = [..._rooms[_rooms.indexOf(room)].items, item];
        }
        else {
            if (_items[_items.indexOf(item)].presentInRoom === _rooms[_rooms.indexOf(room)]) {
                _rooms[_rooms.indexOf(room)].items.splice(_rooms[_rooms.indexOf(room)].items.indexOf(item), 1);
                _items[_items.indexOf(item)].presentInRoom = false;
                this.setState({
                    gameToCreate: {
                        ...this.state.gameToCreate,
                        rooms: _rooms,
                        items: _items
                    }
                });
                return;
            }
            _rooms[_rooms.indexOf(item.presentInRoom)].items.splice(_rooms[_rooms.indexOf(item.presentInRoom)].items.indexOf(item), 1);
            _items[_items.indexOf(item)].presentInRoom = room;
            _rooms[_rooms.indexOf(room)].items = [..._rooms[_rooms.indexOf(room)].items, item];
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                rooms: _rooms,
                items: _items
            }
        })
    }

    IsItemInRoom = (room, item) => {

        for (var i = 0; i < room.items.length; ++i) {
            if (room.items[i] === item) {
                return true;
            }
        }
        return false;
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
                <Route exact path="/create/rooms/:roomIndex" render={(props) => <ParticularRoomEdit {...props} rooms={this.state.gameToCreate.rooms} items={this.state.gameToCreate.items} setRoomName={this.setRoomName} setRoomDescription={this.setRoomDescription} setPassageBetweenRooms={this.setPassageBetweenRooms} hasPassageBetweenRooms={this.hasPassageBetweenRooms} setItemToRoom={this.setItemToRoom} IsItemInRoom={this.IsItemInRoom} />} />
                <Route exact path="/create/items" render={(props) => <ItemCreatePage {...props} addItem={this.addItem} deleteItem={this.deleteItem} items={this.state.gameToCreate.items} />} />
                <Route exact path="/create/items/:itemIndex" render={(props) => <ParticularItemEdit {...props} rooms={this.state.gameToCreate.rooms} items={this.state.gameToCreate.items} setItemName={this.setItemName} setItemDescription={this.setItemDescription} renderItemToRoom={this.renderItemToRoom} />} />
                <Route exact path="/create/general" render={(props) => <GeneralCreatePage {...props} setGameProperty={this.setGameProperty} gameToCreate={this.state.gameToCreate} />} />
            </Router>
        );
    }
}

export default App;
