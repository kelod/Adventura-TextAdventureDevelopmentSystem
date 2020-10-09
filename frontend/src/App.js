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
import PlayerCreatePage from './PlayerCreatePage';
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
import FaceIcon from '@material-ui/icons/Face';
import { Redirect } from "react-router-dom";


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
        "Player",
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
            case "Player": {
                icon = <FaceIcon style={{ color: cyan[900] }} />;
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
            id: null,
            anySessionStarted: false,
            deployed: false,
            name: '',
            description: '',
            gameGoal: null,
            goalRoom: null,
            goalEnemies: [],
            goalItems: [],
            rooms: [],
            items: [],
            enemies: [],
            passages: [],
            player: {
                id: null,
                name: '',
                hp: null,
                attack: null,
                startingRoom: null,
                startingItems: []
            }
        },
        gameToPlay: {}
    }

    constructor(props) {
        super(props);
        this.setGameProperty = this.setGameProperty.bind(this);
        this.setGameToCreateGoalRoom = this.setGameToCreateGoalRoom.bind(this);
        this.setGameToCreateGoalItems = this.setGameToCreateGoalItems.bind(this);
        this.setGameToCreateGoalEnemies = this.setGameToCreateGoalEnemies.bind(this);
        this.setGameToPlay = this.setGameToPlay.bind(this);
        this.submitGame = this.submitGame.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.validateGame = this.validateGame.bind(this);
        this.setGameToCreateDeployed = this.setGameToCreateDeployed.bind(this);
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
        this.getItemsInRoom = this.getItemsInRoom.bind(this);
        this.getEnemiesInRoom = this.getEnemiesInRoom.bind(this);
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
        this.togglePassageActivationRewardForEnemy = this.togglePassageActivationRewardForEnemy.bind(this);
        this.toggleGameOverPenaltyForEnemy = this.toggleGameOverPenaltyForEnemy.bind(this);
        this.IsEnemyInRoom = this.IsEnemyInRoom.bind(this);
        this.setEnemyHp = this.setEnemyHp.bind(this);
        this.setPlayerProperties = this.setPlayerProperties.bind(this);
        this.setPlayerStartingRoomByName = this.setPlayerStartingRoomByName.bind(this);
        this.setPlayerStartingItems = this.setPlayerStartingItems.bind(this);
        this.setGameState = this.setGameState.bind(this);
    }

    setGameState = (gameToCrt) => {
        this.setState({
            createdGameId: '',
            gameToCreate: gameToCrt
        })
        // same obejcts should be same references also
        var _items = this.state.gameToCreate.items;
        var _rooms = this.state.gameToCreate.rooms;
        var _enemies = this.state.gameToCreate.enemies;
        var _passages = this.state.gameToCreate.passages;
        var _player = this.state.gameToCreate.player;
        var _goalItems = this.state.gameToCreate.goalItems;
        var _goalEnemies = this.state.gameToCreate.goalEnemies;

        for (var item of _items) { // for items
            for (var enemy of _enemies) {
                for (var _item of enemy.itemGainReward) {
                    if (item.name === _item.name) {
                        enemy.itemGainReward.splice(enemy.itemGainReward.indexOf(_item), 1);
                        enemy.itemGainReward = [...enemy.itemGainReward, item];
                    }
                }
                for (var _item of enemy.itemLosePenalty) {
                    if (item.name === _item.name) {
                        enemy.itemLosePenalty.splice(enemy.itemLosePenalty.indexOf(_item), 1);
                        enemy.itemLosePenalty = [...enemy.itemLosePenalty, item];
                    }
                }
            }

            if (_player.startingItems != null) {
                for (var _item of _player.startingItems) {
                    if (item.name === _item.name) {
                        _player.startingItems.splice(_player.startingItems.indexOf(_item), 1);
                        _player.startingItems = [..._player.startingItems, item];
                    }
                }
            }

            for (var goalItem of _goalItems) {
                if (goalItem.name === item.name) {
                    _goalItems.splice(_goalItems.indexOf(goalItem), 1);
                    _goalItems = [..._goalItems, item];
                }
            }
        }

        for (var room of _rooms) { // for rooms
            for (var item of _items) {
                if (item.presentInRoom != null && item.presentInRoom.name === room.name) {
                    item.presentInRoom = room;
                }
            }
            for (var enemy of _enemies) {
                if (enemy.presentInRoom != null && enemy.presentInRoom.name === room.name) {
                    enemy.presentInRoom = room;
                }
            }

            for (var passage of _passages) {
                if (passage.from.name === room.name) {
                    passage.from = room;
                }
                if (passage.to.name === room.name) {
                    passage.to = room;
                }
            }

            if (_player.startingRoom != null) {
                if (_player.startingRoom.name === room.name) {
                    _player.startingRoom = room;
                }
            }

            if (this.state.gameToCreate.goalRoom != null && this.state.gameToCreate.goalRoom.name === room.name) {
                this.setState({
                    gameToCreate: {
                        ...this.state.gameToCreate,
                        goalRoom: room
                    }
                })
            }
        }

        for (var passage of _passages) { // for passages
            for (var enemy of _enemies) {
                for (var passageActivation of enemy.passageActivationReward) {
                    if (passageActivation.from.name === passage.from.name && passageActivation.to.name === passage.to.name) {
                        enemy.passageActivationReward.splice(enemy.passageActivationReward.indexOf(passageActivation), 1);
                        enemy.passageActivationReward = [...enemy.passageActivationReward, passage];
                    }
                }
            }

            for (var item of _items) {
                for (var passageActivation of item.passageActivations) {
                    if (passageActivation.passage.from.name === passage.from.name && passageActivation.passage.to.name === passage.to.name) {
                        item.passageActivations.splice(item.passageActivations.indexOf(passageActivation), 1);
                        const newActivation = {
                            enable: passageActivation.enable,
                            passage: passage
                        }
                        item.passageActivations = [...item.passageActivations, newActivation];
                    }
                }

                for (var _passage of item.requestedInPassages) {
                    if (_passage != null && _passage.from.name === passage.from.name && _passage.to.name === passage.to.name) {
                        item.requestedInPassages.splice(item.requestedInPassages.indexOf(_passage), 1);
                        item.requestedInPassages = [...item.requestedInPassages, passage];
                    }
                }
            }
        }

        for (var enemy of _enemies) { // for enemies
            for (var goalEnemy of _goalEnemies) {
                if (goalEnemy.name === enemy.name) {
                    _goalEnemies.splice(_goalEnemies.indexOf(goalEnemy), 1);
                    _goalEnemies = [..._goalEnemies, enemy];
                }
            }
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                items: _items,
                rooms: _rooms,
                enemies: _enemies,
                passages: _passages,
                player: _player,
                goalEnemies: _goalEnemies,
                goalItems: _goalItems
            }
        })
    }

    setGameToPlay = (data) => {
        this.setState({
            gameToPlay: data
        })

        // same obejcts should be same references also
        var _items = this.state.gameToPlay.items;
        var _rooms = this.state.gameToPlay.rooms;
        var _enemies = this.state.gameToPlay.enemies;
        var _passages = this.state.gameToPlay.passages;
        var _player = this.state.gameToPlay.player;
        var _goalItems = this.state.gameToPlay.goalItems;
        var _goalEnemies = this.state.gameToPlay.goalEnemies;

        for (var item of _items) { // for items
            for (var enemy of _enemies) {
                for (var _item of enemy.itemGainReward) {
                    if (item.name === _item.name) {
                        enemy.itemGainReward.splice(enemy.itemGainReward.indexOf(_item), 1);
                        enemy.itemGainReward = [...enemy.itemGainReward, item];
                    }
                }
                for (var _item of enemy.itemLosePenalty) {
                    if (item.name === _item.name) {
                        enemy.itemLosePenalty.splice(enemy.itemLosePenalty.indexOf(_item), 1);
                        enemy.itemLosePenalty = [...enemy.itemLosePenalty, item];
                    }
                }
            }

            if (_player.inventory != null) {
                for (var _item of _player.inventory) {
                    if (item.name === _item.name) {
                        _player.inventory.splice(_player.inventory.indexOf(_item), 1);
                        _player.inventory = [..._player.inventory, item];
                    }
                }
            }

            for (var goalItem of _goalItems) {
                if (goalItem.name === item.name) {
                    _goalItems.splice(_goalItems.indexOf(goalItem), 1);
                    _goalItems = [..._goalItems, item];
                }
            }
        }

        for (var room of _rooms) { // for rooms
            for (var item of _items) {
                if (item.presentInRoom != null && item.presentInRoom.name === room.name) {
                    item.presentInRoom = room;
                }
            }
            for (var enemy of _enemies) {
                if (enemy.presentInRoom != null && enemy.presentInRoom.name === room.name) {
                    enemy.presentInRoom = room;
                }
            }

            for (var passage of _passages) {
                if (passage.from.name === room.name) {
                    passage.from = room;
                }
                if (passage.to.name === room.name) {
                    passage.to = room;
                }
            }

            if (_player.inRoom != null) {
                if (_player.inRoom.name === room.name) {
                    _player.inRoom = room;
                }
            }

            if (this.state.gameToCreate.goalRoom != null && this.state.gameToCreate.goalRoom.name === room.name) {
                this.setState({
                    gameToCreate: {
                        ...this.state.gameToCreate,
                        goalRoom: room
                    }
                })
            }
        }

        for (var passage of _passages) { // for passages
            for (var enemy of _enemies) {
                for (var passageActivation of enemy.passageActivationReward) {
                    if (passageActivation.from.name === passage.from.name && passageActivation.to.name === passage.to.name) {
                        enemy.passageActivationReward.splice(enemy.passageActivationReward.indexOf(passageActivation), 1);
                        enemy.passageActivationReward = [...enemy.passageActivationReward, passage];
                    }
                }
            }

            for (var item of _items) {
                for (var passageActivation of item.passageActivations) {
                    if (passageActivation.passage.from.name === passage.from.name && passageActivation.passage.to.name === passage.to.name) {
                        item.passageActivations.splice(item.passageActivations.indexOf(passageActivation), 1);
                        const newActivation = {
                            enable: passageActivation.enable,
                            passage: passage
                        }
                        item.passageActivations = [...item.passageActivations, newActivation];
                    }
                }

                for (var _passage of item.requestedInPassages) {
                    if (_passage != null && _passage.from.name === passage.from.name && _passage.to.name === passage.to.name) {
                        item.requestedInPassages.splice(item.requestedInPassages.indexOf(_passage), 1);
                        item.requestedInPassages = [...item.requestedInPassages, passage];
                    }
                }
            }
        }

        for (var enemy of _enemies) { // for enemies
            for (var goalEnemy of _goalEnemies) {
                if (goalEnemy.name === enemy.name) {
                    _goalEnemies.splice(_goalEnemies.indexOf(goalEnemy), 1);
                    _goalEnemies = [..._goalEnemies, enemy];
                }
            }
        }

        this.setState({
            gameToPlay: {
                ...this.state.gameToPlay,
                items: _items,
                rooms: _rooms,
                enemies: _enemies,
                passages: _passages,
                player: _player,
                goalEnemies: _goalEnemies,
                goalItems: _goalItems
            }
        })

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

    setGameToCreateDeployed = (event) => {
        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                deployed: event.target.checked
            }
        })
    }

    setGameToCreateGoalRoom = (event) => {
        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                goalRoom: event.target.value
            }
        })
    }

    setGameToCreateGoalItems = (item) => {
        if (this.state.gameToCreate.goalItems.includes(item)) {
            this.state.gameToCreate.goalItems.splice(this.state.gameToCreate.goalItems.indexOf(item), 1);
        }
        else {
            this.state.gameToCreate.goalItems = [...this.state.gameToCreate.goalItems, item];
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                goalItems: this.state.gameToCreate.goalItems
            }
        })
    }

    setGameToCreateGoalEnemies = (enemy) => {
        if (this.state.gameToCreate.goalEnemies.includes(enemy)) {
            this.state.gameToCreate.goalEnemies.splice(this.state.gameToCreate.goalEnemies.indexOf(enemy), 1);
        }
        else {
            this.state.gameToCreate.goalEnemies = [...this.state.gameToCreate.goalEnemies, enemy];
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                goalEnemies: this.state.gameToCreate.goalEnemies
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
        //var _rooms = this.state.gameToCreate.rooms;
        var _passages = this.state.gameToCreate.passages;

        const passageResult = this.hasPassageBetweenRooms(roomFrom, roomTo);

        if (passageResult) {
            this.deletePassage(passageResult);
        }
        else {
            const newPassage = { //Ugyanaz az object kerul a passagesbe es a room passagei koze is
                id: null,
                from: roomFrom,
                to: roomTo,
                defaultEnabled: true,
                description: "",
                //activationRewardForEnemies: []
                //requestedItems: []
            }
            //_rooms[_rooms.indexOf(roomFrom)].passages = [..._rooms[_rooms.indexOf(roomFrom)].passages, newPassage];
            _passages = [..._passages, newPassage];
        }
        
        
        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                //rooms: _rooms,
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
        /*const _rooms = this.state.gameToCreate.rooms;
        const _roomFrom = _rooms[_rooms.indexOf(roomFrom)];
        
        for (var i = 0; i < _roomFrom.passages.length; ++i) {
            if (_roomFrom.passages[i].to === roomTo) {
                return _roomFrom.passages[i];
            }
        }
        return null;*/

        var _passages = this.state.gameToCreate.passages;

        for (var i = 0; i < _passages.length; ++i) {
            if (_passages[i].from.name === roomFrom.name && _passages[i].to.name === roomTo.name) {
                return _passages[i];
            }
        }
        return null;
    }

    setNeccessaryItemToPassage = (passage, item) => {
        /*var _passages = this.state.gameToCreate.passages;
        var _items = this.state.gameToCreate.items;*/

        if (/*_passages[_passages.indexOf(passage)].requestedItems.includes(item)*/ item.requestedInPassages.includes(passage)) {
            /*_passages[_passages.indexOf(passage)].requestedItems.splice(_passages[_passages.indexOf(passage)].requestedItems.indexOf(item), 1);
            _items[_items.indexOf(item)].requestedInPassages.splice(_items[_items.indexOf(item)].requestedInPassages.indexOf(passage), 1);*/
            item.requestedInPassages.splice(item.requestedInPassages.indexOf(passage), 1);
        }
        else {
           /* _passages[_passages.indexOf(passage)].requestedItems = [..._passages[_passages.indexOf(passage)].requestedItems, item];
            _items[_items.indexOf(item)].requestedInPassages = [..._items[_items.indexOf(item)].requestedInPassages, passage];*/

            item.requestedInPassages = [...item.requestedInPassages, passage];
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
               /* passages: _passages,
                items: _items*/
                items: this.state.gameToCreate.items
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
                createdGameId: response.data
            });
    }

    validateGame = (gameToCreate) => {
        // Has player starting room
        if (this.state.gameToCreate.player.startingRoom === null) {
            window.alert('Please set a starting room for the Player!');
            return false;
        }

        // Every enemy rendered to rooms
        var enemiesWithoutRoom = [];
        for (var enemy of this.state.gameToCreate.enemies) {
            if (enemy.presentInRoom === null) {
                enemiesWithoutRoom = [...enemiesWithoutRoom, enemy];
            }
        }
        if (enemiesWithoutRoom.length != 0) {
            var message = "The following enemies are not in any room: ";
            for (var enemy of enemiesWithoutRoom) {
                message = message + "   " + enemy.name;
            }
            window.alert(message);
            return false;
        }

        // Game Goal Detail
        if (this.state.gameToCreate.gameGoal !== null && this.state.gameToCreate.goalRoom === null && this.state.gameToCreate.goalItems.length === 0 && this.state.gameToCreate.goalEnemies.length === 0) {
            window.alert("You have a set a general game goal, but not any particular detail about it!");
            return false;
        }

        return true;
    }

    async updateGame() {
        const response = await axios.put('/create', this.state.gameToCreate);
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

        var _passages = this.state.gameToCreate.passages;

        if (this.state.gameToCreate.player.startingRoom === room) {
            this.state.gameToCreate.player.startingRoom = null;
        }

        if (this.state.gameToCreate.goalRoom === room) {
            this.state.gameToCreate.goalRoom = null;
        }


        var passages_to_delete = []
        for (var i = 0; i < _passages.length; ++i) {
            if (_passages[i].from === room || _passages[i].to === room) {
                passages_to_delete = [...passages_to_delete, _passages[i]];
            }
        }
        for (var p of passages_to_delete) {
            this.deletePassage(p);
        }



        for (var enemy of this.state.gameToCreate.enemies) {
            if (enemy.presentInRoom === room) {
                enemy.presentInRoom = null;
            }
        }

        for (var item of this.state.gameToCreate.items) {
            if (item.presentInRoom === room) {
                item.presentInRoom = null;
            }
        }

        var _rooms = this.state.gameToCreate.rooms;
        _rooms.splice(_rooms.indexOf(room), 1);
        
            this.setState({
                gameToCreate: {
                    ...this.state.gameToCreate,
                    goalRoom: this.state.gameToCreate.goalRoom,
                    rooms: _rooms,
                    passages: _passages,
                    enemies: this.state.gameToCreate.enemies,
                    items: this.state.gameToCreate.items,
                    player: this.state.gameToCreate.player
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
                items: [...this.state.gameToCreate.items, item],
                player: {
                    ...this.state.gameToCreate.player,
                    startingRoom: this.state.gameToCreate.player.startingRoom
                }
            }
        });
    }

    deleteItem = (item) => {
        var _items = this.state.gameToCreate.items;
        _items.splice(_items.indexOf(item), 1);

        if (this.state.gameToCreate.goalItems.includes(item)) {
            this.state.gameToCreate.goalItems.splice(this.state.gameToCreate.goalItems.indexOf(item), 1);
        }

        /*for (var room of this.state.gameToCreate.rooms) {
            if (room.items.includes(item)) {
                room.items.splice(room.items.indexOf(item), 1);
            }
        }*/

        for (var enemy of this.state.gameToCreate.enemies) {
            if (enemy.itemGainReward.includes(item)) {
                enemy.itemGainReward.splice(enemy.itemGainReward.indexOf(item), 1);
            }
            if (enemy.itemLosePenalty.includes(item)) {
                enemy.itemLosePenalty.splice(enemy.itemLosePenalty.indexOf(item), 1);
            }
        }

        /*for (var passage of this.state.gameToCreate.passages) {
            if (passage.requestedItems.includes(item)) {
                passage.requestedItems.splice(passage.requestedItems.indexOf(item), 1);
            }
        }*/

        if (this.state.gameToCreate.player.startingItems.includes(item)) {
            this.state.gameToCreate.player.startingItems.splice(this.state.gameToCreate.player.startingItems.indexOf(item), 1);
        }

            this.setState({
                gameToCreate: {
                    ...this.state.gameToCreate,
                    goalItems: this.state.gameToCreate.goalItems,
                    items: _items,
                    rooms: this.state.gameToCreate.rooms,
                    enemies: this.state.gameToCreate.enemies,
                    //passages: this.state.gameToCreate.passages,
                    player: this.state.gameToCreate.player
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

    getItemsInRoom = (room) => {
        var result = [];

        for (var item of this.state.gameToCreate.items) {
            if (item.presentInRoom != null) {
                if (item.presentInRoom.name == room.name) {
                    result = [...result, item.name];
                }
            }
        }

        return result;
    }

    getEnemiesInRoom = (room) => {
        var result = [];

        for (var enemy of this.state.gameToCreate.enemies) {
            if (enemy.presentInRoom != null) {
                if (enemy.presentInRoom.name == room.name) {
                    result = [...result, enemy.name];
                }
            }
        }

        return result;
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
        //var _rooms = this.state.gameToCreate.rooms;
        //var _items = this.state.gameToCreate.items;

        if (/*room.items.includes(item)*/ item.presentInRoom == room) {
            
            //_items[_items.indexOf(item)].presentInRoom = room;
            //_rooms[_rooms.indexOf(room)].items = [..._rooms[_rooms.indexOf(room)].items, item];
            //room.items.splice(room.items.indexOf(item), 1);
            item.presentInRoom = null;
        }
        else {
            /*for (var _room of this.state.gameToCreate.rooms) {
                if (_room.items.includes(item)) {
                    _room.items.splice(_room.items.indexOf(item), 1);
                }
            }

            room.items = [...room.items, item];*/

            item.presentInRoom = room;

            /*if (_items[_items.indexOf(item)].presentInRoom === _rooms[_rooms.indexOf(room)]) {
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
            _rooms[_rooms.indexOf(room)].items = [..._rooms[_rooms.indexOf(room)].items, item];*/
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                //rooms: this.state.gameToCreate.rooms,
                items: this.state.gameToCreate.items
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

        if (this.state.gameToCreate.goalEnemies.includes(enemy)) {
            this.state.gameToCreate.goalEnemies.splice(this.state.gameToCreate.goalEnemies.indexOf(enemy), 1);
        }

        /*for (var room of this.state.gameToCreate.rooms) {
            if (room.enemies.includes(enemy)) {
                room.enemies.splice(room.enemies.indexOf(enemy), 1);
            }
        }*/
        
            this.setState({
                gameToCreate: {
                    ...this.state.gameToCreate,
                    enemies: _enemies,
                    rooms: this.state.gameToCreate.rooms,
                    goalEnemies: this.state.gameToCreate.goalEnemies
                }
            })
        
    }

    setEnemyName = (enemy, event) => {

        enemy.name = event.target.value;

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                enemies: this.state.gameToCreate.enemies
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

        if (/*room.enemies.includes(enemy)*/ enemy.presentInRoom == room) {
            //room.enemies.splice(room.enemies.indexOf(enemy), 1);
            enemy.presentInRoom = null;
        }
        else {
            /*for (var _room of this.state.gameToCreate.rooms) {
                if (_room.enemies.includes(enemy)) {
                    _room.enemies.splice(_room.enemies.indexOf(enemy), 1);
                }
            }

            room.enemies = [...room.enemies, enemy];*/

            enemy.presentInRoom = room;
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                //rooms: this.state.gameToCreate.rooms,
                enemies: this.state.gameToCreate.enemies
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

        /*const { name, value } = event.target;
        enemy = {
            ...enemy,
            [name]: event.target.value
        }

        console.log(enemy);*/

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                enemies: _enemies
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

        if (event.target.name === "checkboxWin" || event.target.name === "checkboxLose") {
            if (event.target.name === "checkboxWin")
                enemy.itemGainReward = [];
            else
                enemy.itemLosePenalty = [];
        }
        else {
            if (event.target.name === "win") {
                if (enemy.itemGainReward.includes(item)) {
                    enemy.itemGainReward.splice(enemy.itemGainReward.indexOf(item), 1);
                }
                else {
                    enemy.itemGainReward = [...enemy.itemGainReward, item];
                }
            }
            else {
                if (enemy.itemLosePenalty.includes(item)) {
                    enemy.itemLosePenalty.splice(enemy.itemLosePenalty.indexOf(item), 1);
                }
                else {
                    enemy.itemLosePenalty = [...enemy.itemLosePenalty, item];
                }
            }
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                enemies: this.state.gameToCreate.enemies
            }
        })
    }

    toggleGameOverPenaltyForEnemy = (enemy, event) => {
        enemy.gameOverPenalty = event.target.checked;

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                enemies: this.state.gameToCreate.enemies
            }
        })
    }

    togglePassageActivationRewardForEnemy = (enemy, passage, event) => {
        if (event.target.name === "checkbox") {
            enemy.passageActivationReward = [];
        }
        else {
            /*if (passage.activationRewardForEnemies.includes(enemy)) {
                passage.activationRewardForEnemies.splice(passage.activationRewardForEnemies.indexOf(enemy), 1);
            }
            else {
                passage.activationRewardForEnemies = [...passage.activationRewardForEnemies, enemy];
            }*/
            if (enemy.passageActivationReward.includes(passage)) {
                enemy.passageActivationReward.splice(enemy.passageActivationReward.indexOf(passage), 1);
            }
            else {
                enemy.passageActivationReward = [...enemy.passageActivationReward, passage];
            }
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                //passages: this.state.gameToCreate.passages
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

        for (var item of this.state.gameToCreate.items) {
            for (var passageActivation of item.passageActivations) {
                if (passageActivation.passage === passage) {
                    item.passageActivations.splice(item.passageActivations.indexOf(passageActivation), 1);
                }
            }
            if (item.requestedInPassages.includes(passage)) {
                item.requestedInPassages.splice(item.requestedInPassages.indexOf(passage), 1);
            }
        }

        for (var enemy of this.state.gameToCreate.enemies) {
            if (enemy.passageActivationReward.includes(passage)) {
                enemy.passageActivationReward.splice(enemy.passageActivationReward.indexOf(passage), 1);
            }
        }

        //_rooms[_rooms.indexOf(passage.from)].passages.splice(_rooms[_rooms.indexOf(passage.from)].passages.indexOf(passage), 1);
        _passages.splice(_passages.indexOf(passage), 1);

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                rooms: _rooms,
                passages: _passages,
                items: this.state.gameToCreate.items,
                enemies: this.state.gameToCreate.enemies
            }
        })
    }

    setEnemyHp = (enemy, event) => {
        enemy.hp = event.target.value;

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                enemies: this.state.gameToCreate.enemies
            }
        })
    }

    setPlayerProperties = (event) => {
        const { name, value } = event.target;

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                player: {
                    ...this.state.gameToCreate.player,
                    [name]: value
                }
            }
        })
    }

    setPlayerStartingRoomByName = (event) => {
        const { value } = event.target;

        for (var room of this.state.gameToCreate.rooms) {
            if (room.name === value) {
                this.setState({
                    gameToCreate: {
                        ...this.state.gameToCreate,
                        player: {
                            ...this.state.gameToCreate.player,
                            startingRoom: room
                        }
                    }
                })
            }
        }

        /*this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                player: {
                    ...this.state.gameToCreate.player,
                    startingRoom: event.target.value
                }
            }
        })*/
    }

    setPlayerStartingItems = (item) => {
        var _startingItems = this.state.gameToCreate.player.startingItems;

        if (_startingItems.includes(item)) {
            _startingItems.splice(_startingItems.indexOf(item), 1);
        }
        else {
            _startingItems = [..._startingItems, item];
        }

        this.setState({
            gameToCreate: {
                ...this.state.gameToCreate,
                player: {
                    ...this.state.gameToCreate.player,
                    startingItems: _startingItems
                }
            }
        })
    }

    render() {
        return (
            <Router>
                <Route exact path="/" render={(props) => <WelcomePage {...props} setGameState={this.setGameState} setGameToPlay={this.setGameToPlay} />} />
                <Route path="/create" component={CreatePageHeader} />
                <Route exact path="/create" render={(props) => <CreatePage {...props} submitGame={this.submitGame} updateGame={this.updateGame} gameToCreate={this.state.gameToCreate} validateGame={this.validateGame} setGameToCreateDeployed={this.setGameToCreateDeployed} />} />
                <Route exact path="/created" render={(props) => <GameCreated {...props} gameId={this.state.createdGameId} />} />
                <Route exact path="/play" render={(props) => <PlayPage {...props} gameToPlay={this.state.gameToPlay} />} />
                <Route exact path="/create/rooms" render={(props) => <RoomCreatePage {...props} addRoom={this.addRoom} deleteRoom={this.deleteRoom} rooms={this.state.gameToCreate.rooms} />} />
                <Route exact path="/create/rooms/:roomIndex" render={(props) => <ParticularRoomEdit {...props} rooms={this.state.gameToCreate.rooms} items={this.state.gameToCreate.items} enemies={this.state.gameToCreate.enemies} player={this.state.gameToCreate.player} setRoomName={this.setRoomName} setRoomDescription={this.setRoomDescription} setPassageBetweenRooms={this.setPassageBetweenRooms} hasPassageBetweenRooms={this.hasPassageBetweenRooms} setItemToRoom={this.setItemToRoom} IsItemInRoom={this.IsItemInRoom} setEnemyToRoom={this.setEnemyToRoom} IsEnemyInRoom={this.IsEnemyInRoom} getItemsInRoom={this.getItemsInRoom} getEnemiesInRoom={this.getEnemiesInRoom} />} />
                <Route exact path="/create/items" render={(props) => <ItemCreatePage {...props} addItem={this.addItem} deleteItem={this.deleteItem} items={this.state.gameToCreate.items} />} />
                <Route exact path="/create/passages" render={(props) => <PassageCreatePage {...props} deletePassage={this.deletePassage} passages={this.state.gameToCreate.passages} />} />
                <Route exact path="/create/passages/:passageIndex" render={(props) => <ParticularPassageEdit {...props} passages={this.state.gameToCreate.passages} items={this.state.gameToCreate.items} setNeccessaryItemToPassage={this.setNeccessaryItemToPassage} setPassageDescription={this.setPassageDescription} togglePassageDefaultEnabled={this.togglePassageDefaultEnabled} />} />
                <Route exact path="/create/items/:itemIndex" render={(props) => <ParticularItemEdit {...props} rooms={this.state.gameToCreate.rooms} items={this.state.gameToCreate.items} setItemName={this.setItemName} setItemDescription={this.setItemDescription} renderItemToRoom={this.renderItemToRoom} setItemType={this.setItemType} setPassageActivationToItem={this.setPassageActivationToItem} passages={this.state.gameToCreate.passages} togglePassageActivationByItem={this.togglePassageActivationByItem} deletePassageActivationToItem={this.deletePassageActivationToItem} />} />
                <Route exact path="/create/general" render={(props) => <GeneralCreatePage {...props} setGameProperty={this.setGameProperty} gameToCreate={this.state.gameToCreate} setGameToCreateGoalEnemies={this.setGameToCreateGoalEnemies} setGameToCreateGoalItems={this.setGameToCreateGoalItems} setGameToCreateGoalRoom={this.setGameToCreateGoalRoom} />} />
                <Route exact path="/create/enemies" render={(props) => <EnemyCreatePage {...props} addEnemy={this.addEnemy} deleteEnemy={this.deleteEnemy} enemies={this.state.gameToCreate.enemies} />} />
                <Route exact path="/create/enemies/:enemyIndex" render={(props) => <ParticularEnemyEdit {...props} rooms={this.state.gameToCreate.rooms} items={this.state.gameToCreate.items} passages={this.state.gameToCreate.passages} enemies={this.state.gameToCreate.enemies} setEnemyName={this.setEnemyName} setEnemyDescription={this.setEnemyDescription} setEnemyFightingType={this.setEnemyFightingType} setEnemyProperties={this.setEnemyProperties} setHpRewardEnemy={this.setHpRewardEnemy} toggleItemGainRewardForEnemy={this.toggleItemGainRewardForEnemy} togglePassageActivationRewardForEnemy={this.togglePassageActivationRewardForEnemy} toggleGameOverPenaltyForEnemy={this.toggleGameOverPenaltyForEnemy} setEnemyHp={this.setEnemyHp} />} />
                <Route exact path="/create/player" render={(props) => <PlayerCreatePage {...props} player={this.state.gameToCreate.player} rooms={this.state.gameToCreate.rooms} items={this.state.gameToCreate.items} setPlayerProperties={this.setPlayerProperties} setPlayerStartingRoomByName={this.setPlayerStartingRoomByName} setPlayerStartingItems={this.setPlayerStartingItems} />} />
                <Route exact path="/create/map" render={(props) => <Map {...props} rooms={this.state.gameToCreate.rooms} passages={this.state.gameToCreate.passages} setPassageBetweenRooms={this.setPassageBetweenRooms} hasPassageBetweenRooms={this.hasPassageBetweenRooms} getRoomByName={this.getRoomByName} />} />
            </Router>
        );
    }
}

export default App;
