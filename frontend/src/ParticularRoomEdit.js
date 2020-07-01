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
import EditIcon from '@material-ui/icons/Edit';
import { useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { cyan, purple, grey, green } from '@material-ui/core/colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

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

function PageAbleList(props) {
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

    console.log('room index = ' + props.roomIndex);

    return (
        <Grid item>
            <Box mb={3} ml={1} mr={1}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>You can set passages here</StyledTableCell>
                                <StyledTableCell align="right">On/Off</StyledTableCell>
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

class ParticularRoomEdit extends Component {

    render() {
        const { match: { params } } = this.props;

        

        return (
            <div>
                <Box m={1}>
                    <ColorButton component={Link} to={`/create/rooms`} size="small" variant="contained" color="primary" startIcon={<ArrowBackIosIcon />}>Back</ColorButton>
                </Box>
                <Grid container direction="column">
                    <Grid container item justify="center">
                        <Box m={4} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h6.fontSize">
                            Here you can edit your room
                        </Box>
                    </Grid>

                    <Grid item>
                        <Box mb={3} ml={1}>
                            <TextField required id="room-name" name="name" label="Name of the room" defaultValue={this.props.rooms[params.roomIndex].name} onChange={(e) => { this.props.setRoomName(params.roomIndex, e) }} />
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

                    <PageAbleList rooms={this.props.rooms} roomIndex={params.roomIndex} setPassageBetweenRooms={this.props.setPassageBetweenRooms} hasPassageBetweenRooms={this.props.hasPassageBetweenRooms} />

                </Grid>
            </div>
        )
    }

}

export default ParticularRoomEdit;