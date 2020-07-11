import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
import { useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { cyan, purple, grey, green } from '@material-ui/core/colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import MapIcon from '@material-ui/icons/Map';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import InfoIcon from '@material-ui/icons/Info';


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

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: grey[500],
        '&:hover': {
            backgroundColor: grey[600],
        },
    },
}))(Button);

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

function PassageList(props) {
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
                                <StyledTableCell style={{ fontWeight: "bold" }}>Passages</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: "bold" }} align="right">Navigate</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: "bold" }} align="right">On/Off</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? props.rooms.filter(function (value, index, array) { return value !== props.rooms[props.roomIndex]; }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : props.rooms.filter(function (value, index, array) { return value !== props.rooms[props.roomIndex]; })
                            ).map((room, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {room.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton  component={Link} to={`/create/rooms/${props.rooms.indexOf(room)}`} >
                                            <MapIcon style={{ color: cyan[900] }}/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <ColoredSwitch
                                            checked={props.hasPassageBetweenRooms(props.rooms[props.roomIndex], room)}
                                            onChange={() => { props.setPassageBetweenRooms(props.rooms[props.roomIndex], room); }}
                                            name="togglePassage"
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
                                    count={props.rooms.filter(function (value, index, array) { return value !== props.rooms[props.roomIndex] }).length}
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
                                <StyledTableCell style={{fontWeight: "bold"}}>Items</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: "bold" }} align="right">Navigate</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: "bold" }} align="right">Present</StyledTableCell>
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
                                            checked={props.IsItemInRoom(props.rooms[props.roomIndex], item)}
                                            onChange={() => { props.setItemToRoom(props.rooms[props.roomIndex], item); }}
                                            name="togglePassage"
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

const BigTooltip = withStyles({
    tooltip: {
        fontSize: "12px",
        maxWidth: "none"
    }
})(Tooltip);

class ParticularRoomEdit extends Component {

    render() {
        const { match: { params } } = this.props;

        return (
            <div>
                <Box m={1}>
                    <ColorButton component={Link} to={`/create/rooms`} size="small" variant="contained" color="primary" startIcon={<ArrowBackIosIcon />}>Back</ColorButton>
                </Box>
                <Grid container direction="column" fullWidth>
                    <Grid container item justify="center">
                        <Box m={4} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h6.fontSize">
                            Here you can edit your room
                        </Box>
                    </Grid>

                    <Grid item>
                        <Box mb={3} ml={1}>
                            <TextField required id="room-name" name="name" label="Name of the room" value={this.props.rooms[params.roomIndex].name} onChange={(e) => { this.props.setRoomName(params.roomIndex, e) }} />
                        </Box>
                    </Grid>
                    <Grid container item justify="flex-end">
                        <Box mr={1}>
                            <BigTooltip title="This text will appear when the player enters the room" arrow TransitionComponent={Zoom} placement="right" justify="left">
                                <InfoIcon style={{color: cyan[800] }}/>
                            </BigTooltip>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box mb={3} ml={1} mr={1}>
                            <TextField
                                id="room-description"
                                name="description"
                                label="Description"
                                multiline
                                rows={14}
                                variant="outlined"
                                defaultValue={this.props.rooms[params.roomIndex].description}
                                onChange={(e) => { this.props.setRoomDescription(params.roomIndex, e) }}
                                fullWidth/>
                        </Box>
                    </Grid>

                    <Grid container item justify="flex-end">
                        <Box mr={1}>
                            <BigTooltip title="Handle passages between rooms" arrow TransitionComponent={Zoom} placement="left">
                                <InfoIcon style={{ color: cyan[800] }} />
                            </BigTooltip>
                        </Box>
                    </Grid>
                    <PassageList rooms={this.props.rooms} roomIndex={params.roomIndex} setPassageBetweenRooms={this.props.setPassageBetweenRooms} hasPassageBetweenRooms={this.props.hasPassageBetweenRooms} />

                    <Grid container item justify="flex-end">
                        <Box mr={1}>
                            <BigTooltip title="Note that one item only can be rendered to one room at once" arrow TransitionComponent={Zoom} placement="left">
                                <InfoIcon style={{ color: cyan[800] }} />
                            </BigTooltip>
                        </Box>
                    </Grid>
                    <ItemList items={this.props.items} rooms={this.props.rooms} roomIndex={params.roomIndex} setItemToRoom={this.props.setItemToRoom} IsItemInRoom={this.props.IsItemInRoom} />

                </Grid>
            </div>
        )
    }

}

export default ParticularRoomEdit;