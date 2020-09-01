import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import CreatePage from './CreatePage';
import PlayPage from './PlayPage';
import ParticularRoomEdit from './ParticularRoomEdit';
import ParticularItemEdit from './ParticularItemEdit';
import ParticularEnemyEdit from './ParticularEnemyEdit';
import RoomCreatePage from './RoomCreatePage';
import ItemCreatePage from './ItemCreatePage';
import EnemyCreatePage from './EnemyCreatePage';
import PassageCreatePage from './PassageCreatePage';
import ParticularPassageEdit from './ParticularPassageEdit';
import Map from './Map';
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
import HomeIcon from '@material-ui/icons/Home';
import GeneralCreatePage from './GeneralCreatePage';
import GameCreated from './GameCreated';
import axios from 'axios';
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
import { cyan, red } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import graphqlIcon from '@iconify/icons-mdi/graphql';
import roadtunnelIcon from '@iconify/icons-whh/roadtunnel';



const BigTooltip = withStyles({
    tooltip: {
        fontSize: "12px",
        maxWidth: "none"
    }
})(Tooltip);

function CreatePageHeader() {
    //Menu
    const options = [
        "General",
        "Rooms",
        "Items",
        "Passages",
        "Enemies",
        "Map",
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
            case "Passages": {
                icon = <Icon icon={roadtunnelIcon} style={{ fontSize: "24px", color: cyan[900] }} />;
                break;
            }
            case "Enemies": {
                icon = <Icon icon={swordCross} style={{ fontSize: "24px", color: red[600] }} />;
                break;
            }
            case "Map": {
                icon = <Icon icon={graphqlIcon} style={{ fontSize: "29px", color: cyan[900] }} />;
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
                    <Toolbar variant="dense" style={{ backgroundColor: cyan[700] }}>
                                <BigTooltip title="Menu" TransitionComponent={Zoom} placement="bottom">
                                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                                        <MenuIcon />
                                    </IconButton>
                                </BigTooltip>
                                <Menu
                                    id="long-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={menuOpen}
                                    onClose={handleClose}
                                >
                                    {items}
                                </Menu>
                                <Grid container item justify="right">
                                    <BigTooltip title="Finish" TransitionComponent={Zoom} placement="bottom">
                                        <IconButton
                                            component={Link}
                                            to={`/create`}
                                            aria-label="create page"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            color="inherit"
                                        >
                                            <SaveIcon />
                                        </IconButton>
                                    </BigTooltip>
                                </Grid>
                                <BigTooltip title="Home page" TransitionComponent={Zoom} placement="bottom">
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
                                </BigTooltip>

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
                                <BigTooltip title="About" TransitionComponent={Zoom} placement="bottom">
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
                                </BigTooltip>

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
            items: [],
            enemies: [],
            passages: []
        }
    }

    constructor(props) {
        super(props);
        this.setGameProperty = this.setGameProperty.bind(this);
        this.submitGame = this.submitGame.bind(this);
        this.addRoom = this.addRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
        this.deletePassage = this.deletePassage.bind(this);
        this.setRoomName = this.setRoomName.bind(this);
        this.setRoomDescription = this.setRoomDescription.bind(this);
        this.setPassageBetweenRooms = this.setPassageBetweenRooms.bind(this);
        this.hasPassageBetweenRooms = this.hasPassageBetweenRooms.bind(this);
        this.setPassageDescription = this.setPassageDescription.bind(this);
        this.togglePassageDefaultEnabled = this.togglePassageDefaultEnabled.bind(this);
        this.setPassageActivationToItem = this.setPassageActivationToItem.bind(this);
        this.deletePassageActivationToItem = this.deletePassageActivationToItem.bind(this);
        this.setNeccessaryItemToPassage = this.setNeccessaryItemToPassage.bind(this);
        this.togglePassageActivationByItem = this.togglePassageActivationByItem.bind(this);
        this.getRoomByName = this.getRoomByName.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.setItemDescription = this.setItemDescription.bind(this);
        this.setItemType = this.setItemType.bind(this);
        this.setItemName = this.setItemName.bind(this);
        this.renderItemToRoom = this.renderItemToRoom.bind(this);
        this.setItemToRoom = this.setItemToRoom.bind(this);
        this.IsItemInRoom = this.IsItemInRoom.bind(this);
        this.addEnemy = this.addEnemy.bind(this);
        this.deleteEnemy = this.deleteEnemy.bind(this);
        this.setEnemyName = this.setEnemyName.bind(this);
        this.setEnemyProperties = this.setEnemyProperties.bind(this);
        this.setEnemyFightingType = this.setEnemyFightingType.bind(this);
        this.setEnemyDescription = this.setEnemyDescription.bind(this);
        this.setEnemyToRoom = this.setEnemyToRoom.bind(this);
        this.setHpRewardEnemy = this.setHpRewardEnemy.bind(this);
        this.toggleItemGainRewardForEnemy = this.toggleItemGainRewardForEnemy.bind(this);
        this.IsEnemyInRoom = this.IsEnemyInRoom.bind(this);
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

        for (var i = 0; i < this.state.gameToCreate.rooms.length; ++i) {
            if (value === this.state.gameToCreate.rooms[i].name) {
                window.alert(`Room with name ${value} already exists. Please give another name!`);
                return;
            }
        }

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
        var _passages = this.state.gameToCreate.passages;

        const passageResult = this.hasPassageBetweenRooms(roomFrom, roomTo);

        if (passageResult) {
            _rooms[_rooms.indexOf(roomFrom)].passages.splice(_rooms[_rooms.indexOf(roomFrom)].passages.indexOf(passageResult), 1);
            _passages.splice(_passages.indexOf(passageResult), 1);
        }
        else {
            const newPassage = { //Ugyanaz az object kerul a passagesbe es a room passagei koze is
                from: roomFrom,
                to: roomTo,
                defaultEnabled: true,
                description: "",
                requestedItems: []
            }
            _rooms[_rooms.indexOf(roomFrom)].passages = [..._rooms[_rooms.indexOf(roomFrom)].passages, newPassage];
            _passages = [..._passages, newPassage];
        }
        
        
        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                rooms: _rooms,
                passages: _passages
            }
        })
    }

    setPassageDescription = (index, event) => {
        const { value } = event.target;
        var _passages = this.state.gameToCreate.passages;
        _passages[index].description = value;

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                passages: _passages
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

    setNeccessaryItemToPassage = (passage, item) => {
        var _passages = this.state.gameToCreate.passages;
        var _items = this.state.gameToCreate.items;

        if (_passages[_passages.indexOf(passage)].requestedItems.includes(item)) {
            _passages[_passages.indexOf(passage)].requestedItems.splice(_passages[_passages.indexOf(passage)].requestedItems.indexOf(item), 1);
            _items[_items.indexOf(item)].requestedInPassages.splice(_items[_items.indexOf(item)].requestedInPassages.indexOf(passage), 1);
        }
        else {
            _passages[_passages.indexOf(passage)].requestedItems = [..._passages[_passages.indexOf(passage)].requestedItems, item];
            _items[_items.indexOf(item)].requestedInPassages = [..._items[_items.indexOf(item)].requestedInPassages, passage];
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                passages: _passages,
                items: _items
            }
        })
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

    togglePassageDefaultEnabled = (passage) => {
        var _passages = this.state.gameToCreate.passages;

        if (_passages[_passages.indexOf(passage)].defaultEnabled) {
            _passages[_passages.indexOf(passage)].defaultEnabled = false;
        }
        else {
            _passages[_passages.indexOf(passage)].defaultEnabled = true;
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                passages: _passages
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

        for (var i = 0; i < this.state.gameToCreate.rooms.length; ++i) {
            if (room.name === this.state.gameToCreate.rooms[i].name) {
                window.alert(`Room with name ${room.name} already exists. Please give another name!`);
                return;
            }
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                rooms: [ ...this.state.gameToCreate.rooms, room ]
            }
        });
    }

    deleteRoom = (room) => {
        var _rooms = this.state.gameToCreate.rooms;
        _rooms.splice(_rooms.indexOf(room), 1);

        
            this.setState({
                gameToCreate: {
                    ...this.state.gameToCreate,
                    rooms: _rooms
                }
            })
        
    }

    getRoomByName = (name) => {
        for (var i = 0; i < this.state.gameToCreate.rooms.length; ++i) {
            if (name === this.state.gameToCreate.rooms[i].name) {
                return this.state.gameToCreate.rooms[i];
            }
        }
        return null;
    }

    addItem = (item) => {
        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                items: [...this.state.gameToCreate.items, item]
            }
        });
    }

    deleteItem = (item) => {
        var _items = this.state.gameToCreate.items;
        _items.splice(_items.indexOf(item), 1);

            this.setState({
                gameToCreate: {
                    ...this.state.gameToCreate,
                    items: _items
                }
            })
        
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

    setItemDescription = (index, event) => { //Sets usage, and default description

        const { value, name } = event.target;
        var _items = this.state.gameToCreate.items;

        _items[index] = {
            ..._items[index],
            [name] : value
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                items: _items
            }
        })
    }

    setPassageActivationToItem = (passage, item) => {
        var _items = this.state.gameToCreate.items;

        const newPassageActivation = {
            enable: true,
            passage: passage
        }

        _items[_items.indexOf(item)].passageActivations = [..._items[_items.indexOf(item)].passageActivations, newPassageActivation];

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                items: _items
            }
        })
    }

    deletePassageActivationToItem = (passageActivation, item) => {
        var _items = this.state.gameToCreate.items;

        _items[_items.indexOf(item)].passageActivations.splice(_items[_items.indexOf(item)].passageActivations.indexOf(passageActivation), 1);

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                items: _items
            }
        })
    }

    togglePassageActivationByItem = (passageActivation, item) => {
        var _items = this.state.gameToCreate.items;

        if (passageActivation.enable)
            passageActivation.enable = false;
        else
            passageActivation.enable = true;

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

    setItemType = (index, event) => {
        var _items = this.state.gameToCreate.items;
        const { name, value } = event.target;

        _items[index] = {
            ..._items[index],
            [name] : value
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                items: _items
            }
        })
    }

    addEnemy = (enemy) => {
        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                enemies: [...this.state.gameToCreate.enemies, enemy]
            }
        });
    }

    deleteEnemy = (enemy) => {
        var _enemies = this.state.gameToCreate.enemies;
        _enemies.splice(_enemies.indexOf(enemy), 1);
        
            this.setState({
                gameToCreate: {
                    ...this.state.gameToCreate,
                    enemies: _enemies
                }
            })
        
    }

    setEnemyName = (index, event) => {

        const { value } = event.target;
        var _enemies = this.state.gameToCreate.enemies;
        _enemies[index].name = value;

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                enemies: _enemies
            }
        })
    }

    setEnemyDescription = (index, event) => {

        const { value } = event.target;
        var _enemies = this.state.gameToCreate.enemies;
        _enemies[index].description = value;

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                enemies: _enemies
            }
        })
    }

    setEnemyToRoom = (room, enemy) => {
        var _rooms = this.state.gameToCreate.rooms;
        var _enemies = this.state.gameToCreate.enemies;

        if (!enemy.presentInRoom) {

            _enemies[_enemies.indexOf(enemy)].presentInRoom = room;
            _rooms[_rooms.indexOf(room)].enemies = [..._rooms[_rooms.indexOf(room)].enemies, enemy];
        }
        else {
            if (_enemies[_enemies.indexOf(enemy)].presentInRoom === _rooms[_rooms.indexOf(room)]) {
                _rooms[_rooms.indexOf(room)].enemies.splice(_rooms[_rooms.indexOf(room)].enemies.indexOf(enemy), 1);
                _enemies[_enemies.indexOf(enemy)].presentInRoom = false;
                this.setState({
                    gameToCreate: {
                        ...this.state.gameToCreate,
                        rooms: _rooms,
                        enemies: _enemies
                    }
                });
                return;
            }
            _rooms[_rooms.indexOf(enemy.presentInRoom)].enemies.splice(_rooms[_rooms.indexOf(enemy.presentInRoom)].enemies.indexOf(enemy), 1);
            _enemies[_enemies.indexOf(enemy)].presentInRoom = room;
            _rooms[_rooms.indexOf(room)].enemies = [..._rooms[_rooms.indexOf(room)].enemies, enemy];
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                rooms: _rooms,
                enemies: _enemies
            }
        })
    }

    setEnemyFightingType = (enemy, event) => {

        enemy.fightingType = event.target.value;

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                enemies: this.state.gameToCreate.enemies
            }
        })
    }

    setEnemyProperties = (enemy, event) => {
        var _enemies = this.state.gameToCreate.enemies;
        const { name, value } = event.target;

        _enemies[_enemies.indexOf(enemy)] = {
            ..._enemies[_enemies.indexOf(enemy)],
            [name]: value
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                enemies: this.state.gameToCreate._enemies
            }
        })
    }

    setHpRewardEnemy = (enemy, event) => { 

        if (event.target.name === "checkbox")
            enemy.hpGainReward = "";
        else
            enemy.hpGainReward = event.target.value; //Egyelore csak a hp reward használja

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                enemies: this.state.gameToCreate.enemies
            }
        })
    }

    toggleItemGainRewardForEnemy = (enemy, item, event) => {

        if (event.target.name === "checkbox") {
            enemy.itemGainReward = [];
        }
        else {
            if (enemy.itemGainReward.includes(item)) {
                enemy.itemGainReward.splice(enemy.itemGainReward.indexOf(item), 1);
            }
            else {
                enemy.itemGainReward = [...enemy.itemGainReward, item];
            }
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                enemies: this.state.gameToCreate.enemies
            }
        })
    }

    IsEnemyInRoom = (room, enemy) => {

        for (var i = 0; i < room.enemies.length; ++i) {
            if (room.enemies[i] === enemy) {
                return true;
            }
        }
        return false;
    }

    deletePassage = (passage) => {
        var _passages = this.state.gameToCreate.passages;
        var _rooms = this.state.gameToCreate.rooms;

        _rooms[_rooms.indexOf(passage.from)].passages.splice(_rooms[_rooms.indexOf(passage.from)].passages.indexOf(passage), 1);
        _passages.splice(_passages.indexOf(passage), 1);

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                rooms: _rooms,
                passages: _passages
            }
        })
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
                <Route exact path="/create/rooms/:roomIndex" render={(props) => <ParticularRoomEdit {...props} rooms={this.state.gameToCreate.rooms} items={this.state.gameToCreate.items} enemies={this.state.gameToCreate.enemies} setRoomName={this.setRoomName} setRoomDescription={this.setRoomDescription} setPassageBetweenRooms={this.setPassageBetweenRooms} hasPassageBetweenRooms={this.hasPassageBetweenRooms} setItemToRoom={this.setItemToRoom} IsItemInRoom={this.IsItemInRoom} setEnemyToRoom={this.setEnemyToRoom} IsEnemyInRoom={this.IsEnemyInRoom} />} />
                <Route exact path="/create/items" render={(props) => <ItemCreatePage {...props} addItem={this.addItem} deleteItem={this.deleteItem} items={this.state.gameToCreate.items} />} />
                <Route exact path="/create/passages" render={(props) => <PassageCreatePage {...props} deletePassage={this.deletePassage} passages={this.state.gameToCreate.passages} />} />
                <Route exact path="/create/passages/:passageIndex" render={(props) => <ParticularPassageEdit {...props} passages={this.state.gameToCreate.passages} items={this.state.gameToCreate.items} setNeccessaryItemToPassage={this.setNeccessaryItemToPassage} setPassageDescription={this.setPassageDescription} togglePassageDefaultEnabled={this.togglePassageDefaultEnabled} />} />
                <Route exact path="/create/items/:itemIndex" render={(props) => <ParticularItemEdit {...props} rooms={this.state.gameToCreate.rooms} items={this.state.gameToCreate.items} setItemName={this.setItemName} setItemDescription={this.setItemDescription} renderItemToRoom={this.renderItemToRoom} setItemType={this.setItemType} setPassageActivationToItem={this.setPassageActivationToItem} passages={this.state.gameToCreate.passages} togglePassageActivationByItem={this.togglePassageActivationByItem} deletePassageActivationToItem={this.deletePassageActivationToItem} />} />
                <Route exact path="/create/general" render={(props) => <GeneralCreatePage {...props} setGameProperty={this.setGameProperty} gameToCreate={this.state.gameToCreate} />} />
                <Route exact path="/create/enemies" render={(props) => <EnemyCreatePage {...props} addEnemy={this.addEnemy} deleteEnemy={this.deleteEnemy} enemies={this.state.gameToCreate.enemies} />} />
                <Route exact path="/create/enemies/:enemyIndex" render={(props) => <ParticularEnemyEdit {...props} rooms={this.state.gameToCreate.rooms} items={this.state.gameToCreate.items} enemies={this.state.gameToCreate.enemies} setEnemyName={this.setEnemyName} setEnemyDescription={this.setEnemyDescription} setEnemyFightingType={this.setEnemyFightingType} setEnemyProperties={this.setEnemyProperties} setHpRewardEnemy={this.setHpRewardEnemy} toggleItemGainRewardForEnemy={this.toggleItemGainRewardForEnemy} />} />
                <Route exact path="/create/map" render={(props) => <Map {...props} rooms={this.state.gameToCreate.rooms} passages={this.state.gameToCreate.passages} setPassageBetweenRooms={this.setPassageBetweenRooms} hasPassageBetweenRooms={this.hasPassageBetweenRooms} getRoomByName={this.getRoomByName} />} />
            </Router>
        );
    }
}

export default App;
