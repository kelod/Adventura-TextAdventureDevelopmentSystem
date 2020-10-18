import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { cyan, purple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import MapIcon from '@material-ui/icons/Map';
import { useTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Card from '@material-ui/core/Card';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: cyan[800],
        '&:hover': {
            backgroundColor: cyan[900],
        },
    },
}))(Button);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: cyan[900],
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const ColoredSwitch = withStyles({
    switchBase: {
        color: cyan[800],
        '&$checked': {
            color: cyan[900],
        },
        '&$checked + $track': {
            backgroundColor: cyan[900]
        },
    },
    checked: {},
    track: {},
})(Switch);

function ItemList(props) {
    //Pageable List
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid item>
            <Box mb={3} ml={1} mr={1}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{ fontWeight: "bold" }}>Items</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: "bold" }} align="right">Navigate</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: "bold" }} align="right">Neccessary</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? props.items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : props.items
                            ).map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton component={Link} to={`/create/items/${props.items.indexOf(item)}`} >
                                            <MapIcon style={{ color: cyan[900] }} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <ColoredSwitch
                                            checked={props.gameToCreate.goalItems.includes(item)}
                                            onChange={() => { props.setGameToCreateGoalItems(item); }}
                                            name="toggleGoalItem"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            checkedIcon={<CheckCircleIcon />}
                                            icon={<CancelIcon />}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}


                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={2}
                                    count={props.items.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Box>
        </Grid>
    )
}

function EnemyList(props) {
    //Pageable List
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return(
    <Grid container direction="row">
        <Grid item xs={6}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Enemies</StyledTableCell>
                            <StyledTableCell align="right">Navigate</StyledTableCell>
                            <StyledTableCell align="right">Defeat</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? props.gameToCreate.enemies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.gameToCreate.enemies
                        ).map((enemy, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {enemy.name}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton component={Link} to={`/create/enemies/${props.gameToCreate.enemies.indexOf(enemy)}`} >
                                        <MapIcon style={{ color: cyan[900] }} />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    <ColoredSwitch
                                        checked={props.gameToCreate.goalEnemies.includes(enemy)}
                                        onChange={() => { props.setGameToCreateGoalEnemies(enemy); }}
                                        name="toggleGoalEnemy"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        checkedIcon={<CheckCircleIcon />}
                                        icon={<CancelIcon />}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}


                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={2}
                                count={props.gameToCreate.enemies.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Grid>

    </Grid>
    )
}

function AccordionList(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    var accordionList;
    switch (props.gameToCreate.gameGoal) {
        case 'room':
            accordionList = <div>
                <Accordion expanded={expanded === 'room'} onChange={handleExpand('room')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Reach room</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box ml={1}>
                            <FormControl variant="outlined">
                                <Select
                                    labelId="demo-simple-select-placeholder-label-label"
                                    id="demo-simple-select-placeholder-label"
                                    value={props.gameToCreate.goalRoom}
                                    onChange={(e) => { props.setGameToCreateGoalRoom(e) }}
                                >
                                    <MenuItem value={null}>
                                        <em>None</em>
                                    </MenuItem>
                                    {props.rooms.map((room, index) => (
                                        <MenuItem value={room}>{room.name}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>If player reaches room, wins the game!</FormHelperText>
                            </FormControl>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled expanded={expanded === 'items'} onChange={handleExpand('items')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Gain items</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ItemList items={props.gameToCreate.items} gameToCreate={props.gameToCreate} setGameToCreateGoalItems={props.setGameToCreateGoalItems} />
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled expanded={expanded === 'enemies'} onChange={handleExpand('enemies')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Defeat enemies</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <EnemyList enemies={props.gameToCreate.enemies} gameToCreate={props.gameToCreate} setGameToCreateGoalEnemies={props.setGameToCreateGoalEnemies} />
                    </AccordionDetails>
                </Accordion>
            </div>

            break;


        case 'items':
            accordionList = <div>
                <Accordion disabled expanded={expanded === 'room'} onChange={handleExpand('room')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Reach room</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box ml={1}>
                            <FormControl variant="outlined">
                                <Select
                                    labelId="demo-simple-select-placeholder-label-label"
                                    id="demo-simple-select-placeholder-label"
                                    value={props.gameToCreate.goalRoom}
                                    onChange={(e) => { props.setGameToCreateGoalRoom(e) }}
                                >
                                    <MenuItem value={null}>
                                        <em>None</em>
                                    </MenuItem>
                                    {props.rooms.map((room, index) => (
                                        <MenuItem value={room}>{room.name}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>If player reaches room, wins the game!</FormHelperText>
                            </FormControl>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'items'} onChange={handleExpand('items')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Gain items</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ItemList items={props.gameToCreate.items} gameToCreate={props.gameToCreate} setGameToCreateGoalItems={props.setGameToCreateGoalItems} />
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled expanded={expanded === 'enemies'} onChange={handleExpand('enemies')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Defeat enemies</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <EnemyList enemies={props.gameToCreate.enemies} gameToCreate={props.gameToCreate} setGameToCreateGoalEnemies={props.setGameToCreateGoalEnemies} />
                    </AccordionDetails>
                </Accordion>
            </div>

            break;
        case 'enemies':
            accordionList = <div>
                <Accordion disabled expanded={expanded === 'room'} onChange={handleExpand('room')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Reach room</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box ml={1}>
                            <FormControl variant="outlined">
                                <Select
                                    labelId="demo-simple-select-placeholder-label-label"
                                    id="demo-simple-select-placeholder-label"
                                    value={props.gameToCreate.goalRoom}
                                    onChange={(e) => { props.setGameToCreateGoalRoom(e) }}
                                >
                                    <MenuItem value={null}>
                                        <em>None</em>
                                    </MenuItem>
                                    {props.rooms.map((room, index) => (
                                        <MenuItem value={room}>{room.name}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>If player reaches room, wins the game!</FormHelperText>
                            </FormControl>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled expanded={expanded === 'items'} onChange={handleExpand('items')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Gain items</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ItemList items={props.gameToCreate.items} gameToCreate={props.gameToCreate} setGameToCreateGoalItems={props.setGameToCreateGoalItems} />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'enemies'} onChange={handleExpand('enemies')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Defeat enemies</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <EnemyList enemies={props.gameToCreate.enemies} gameToCreate={props.gameToCreate} setGameToCreateGoalEnemies={props.setGameToCreateGoalEnemies} />
                    </AccordionDetails>
                </Accordion>
            </div>

            break;
        default:
            accordionList = <div>
                <Accordion disabled>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Reach room</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box ml={1}>
                            <FormControl variant="outlined">
                                <Select
                                    labelId="demo-simple-select-placeholder-label-label"
                                    id="demo-simple-select-placeholder-label"
                                    value={props.gameToCreate.goalRoom}
                                    onChange={(e) => { props.setGameToCreateGoalRoom(e) }}
                                >
                                    <MenuItem value={null}>
                                        <em>None</em>
                                    </MenuItem>
                                    {props.rooms.map((room, index) => (
                                        <MenuItem value={room}>{room.name}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>If player reaches room, wins the game!</FormHelperText>
                            </FormControl>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Gain items</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ItemList items={props.gameToCreate.items} gameToCreate={props.gameToCreate} setGameToCreateGoalItems={props.setGameToCreateGoalItems} />
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Defeat enemies</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <EnemyList enemies={props.gameToCreate.enemies} gameToCreate={props.gameToCreate} setGameToCreateGoalEnemies={props.setGameToCreateGoalEnemies} />
                    </AccordionDetails>
                </Accordion>
            </div>
            break;
    }

    return (
        <div>
            <Box m={1}>
                {accordionList}
            </Box>
        </div>
    )
}

class GeneralCreatePage extends Component {

    

    constructor(props) {
        super(props);
    }

    setName = (event) => {
        const { value } = event.target;
        this.setState({
            gameName: value
        })
        console.log(this.state.gameName);
    }

    render() {
        const { setGameProperty } = this.props;
        return (
            <div>
                <Grid container direction="column">
                    <Grid container item justify="center">
                        <Box m={4} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h6.fontSize">
                            Here you can add some general data about your game
                        </Box>  
                    </Grid>
                    <Grid container item direction="row" justify="space-between">
                        <Grid item>
                            <Box mb={3} ml={1}>
                                <TextField required id="game-name" name="name" label="Name of the game" defaultValue={this.props.gameToCreate.name} onChange={setGameProperty} />
                            </Box>
                        </Grid>

                        <Grid item>
                            <Box m={1}>
                                <ColorButton component={Link} to={`/create/rooms`} size="small" variant="contained" startIcon={<MeetingRoomIcon />} endIcon={<ChevronRightIcon />}>Rooms</ColorButton>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Box mb={3} ml={1} mr={1}>
                            <TextField
                                id="game-description"
                                name="description"
                                label="Description"
                                multiline
                                rows={14}
                                variant="outlined"
                                defaultValue={this.props.gameToCreate.description}
                                fullWidth
                                onChange={setGameProperty}/>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box mb={3} ml={1} mr={1}>
                            <TextField
                                id="win-description"
                                name="winDescription"
                                label="Win Description"
                                multiline
                                rows={14}
                                variant="outlined"
                                defaultValue={this.props.gameToCreate.winDescription}
                                fullWidth
                                onChange={setGameProperty} />
                        </Box>
                    </Grid>

                    <Grid item>                      
                        <Box m={1} boxShadow={3}>
                            <Card variant="outlined" raised>
                                    <Box mt={1} ml={1}>
                                        <FormControl component="fieldset">
                                        <FormLabel component="legend">Goal of the game</FormLabel>
                                        <RadioGroup aria-label="gameGoal" name="gameGoal" value={this.props.gameToCreate.gameGoal} onChange={setGameProperty}>
                                                <FormControlLabel value="room" control={<Radio />} label="Reach room" />
                                                <FormControlLabel value="items" control={<Radio />} label="Gain items" />
                                                <FormControlLabel value="enemies" control={<Radio />} label="Defeat enemies" />
                                            </RadioGroup>
                                        </FormControl>
                                </Box>
                                <AccordionList gameToCreate={this.props.gameToCreate} rooms={this.props.gameToCreate.rooms} setGameToCreateGoalEnemies={this.props.setGameToCreateGoalEnemies} setGameToCreateGoalItems={this.props.setGameToCreateGoalItems} setGameToCreateGoalRoom={this.props.setGameToCreateGoalRoom} />
                            </Card>
                        </Box>
                    </Grid>
                
                </Grid>
            </div>
        )
    }
}

export default GeneralCreatePage;