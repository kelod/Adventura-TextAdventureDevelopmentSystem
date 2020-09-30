import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { cyan, purple } from '@material-ui/core/colors';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Icon } from '@iconify/react';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import arrowRightCircle from '@iconify/icons-mdi/arrow-right-circle';
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
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import MapIcon from '@material-ui/icons/Map';

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


const BigTooltip = withStyles({
    tooltip: {
        fontSize: "12px",
        maxWidth: "none"
    }
})(Tooltip);

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
            <Box mb={3} ml={1} mr={1}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{ fontWeight: "bold" }}>Starting Items</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: "bold" }} align="right">Navigate</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: "bold" }} align="right">Present</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {(rowsPerPage > 0
                            ? props.items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.items
                        ).map((item, index) => {
                                if (item.presentInRoom) {
                                    return <div/>
                                }
                            return(
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
                                            checked={props.player.startingItems.includes(item)}
                                            onChange={() => { props.setPlayerStartingItems(item); }}
                                            name="togglePassage"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            checkedIcon={<CheckCircleIcon />}
                                            icon={<CancelIcon />}
                                        />
                                    </TableCell>
                                </TableRow>
                                )
                            })}


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
    )
}

function InitAccordion(props) {

    return (
        <Box m={1} boxShadow={3}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Starting settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction="column">
                        <Grid container item direction="row">
                            <Grid item>
                                <Box ml={1} mb={3}>
                                    <FormControl variant="outlined">
                                        <Select
                                            labelId="demo-simple-select-placeholder-label-label"
                                            id="demo-simple-select-placeholder-label"
                                            value={props.player.startingRoom == null? null : props.player.startingRoom.name}
                                            onChange={(e) => { props.setPlayerStartingRoomByName(e) }}
                                        >
                                            <MenuItem value={null}>
                                                <em>None</em>
                                            </MenuItem>
                                            {props.rooms.map((room, index) => (
                                                <MenuItem value={room.name}>{room.name}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>Please select in which room You want to start the game</FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item>
                                <BigTooltip title="Go to room" arrow TransitionComponent={Zoom} placement="right" justify="right">
                                    <IconButton component={Link} to={`/create/rooms/${props.rooms.indexOf(props.player.startingRoom)}`} disabled={!props.player.startingRoom} >
                                        <Icon icon={arrowRightCircle} style={{ color: cyan[900] }} />
                                    </IconButton>
                                </BigTooltip>
                            </Grid>
                        </Grid>
                        <Grid item fullWidth>
                            <ItemList items={props.items} rooms={props.rooms} player={props.player} setPlayerStartingItems={props.setPlayerStartingItems} />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>    
    )
}

class PlayerCreatePage extends Component {

    render() {

        return (
            <div>
                <Grid container direction="column">
                    <Grid container item justify="center">
                        <Box m={4} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h6.fontSize">
                            Here you can edit the player of the game
                        </Box>
                    </Grid>

                    <Grid item>
                        <Box m={1} boxShadow={3}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Properties</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box ml={1}>
                                        <TextField
                                            id="name"
                                            name="name"
                                            label="Name"
                                            value={this.props.player.name}
                                            variant="outlined"
                                            style={{ marginRight: "20px" }}
                                            onChange={(e) => { this.props.setPlayerProperties(e) }}
                                        />
                                        <TextField
                                            id="hp"
                                            name="hp"
                                            label="HP"
                                            value={this.props.player.hp}
                                            variant="outlined"
                                            style={{ marginRight: "20px" }}
                                            onChange={(e) => { this.props.setPlayerProperties(e) }}
                                        />
                                        <TextField
                                            id="attack"
                                            name="attack"
                                            label="Average attack"
                                            value={this.props.player.attack}
                                            variant="outlined"
                                            onChange={(e) => { this.props.setPlayerProperties(e) }}
                                        />
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>

                    <Grid item>
                        <InitAccordion player={this.props.player} rooms={this.props.rooms} items={this.props.items} setPlayerStartingRoomByName={this.props.setPlayerStartingRoomByName} setPlayerStartingItems={this.props.setPlayerStartingItems} />
                    </Grid>

                </Grid>


            </div>
        )
    }
}

export default PlayerCreatePage;