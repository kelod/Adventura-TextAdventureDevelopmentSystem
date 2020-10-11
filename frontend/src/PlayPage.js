import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { cyan, purple } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import PanToolIcon from '@material-ui/icons/PanTool';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import doorOpen from '@iconify/icons-mdi/door-open';
import { Icon } from '@iconify/react';



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

function InventoryList(props) {
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
        <TableContainer component={Paper} style={{margin: "24px"}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Inventory</StyledTableCell>
                        <StyledTableCell align="right">Info</StyledTableCell>
                        <StyledTableCell align="right">Use</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? props.gameToPlay.player.inventory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : props.gameToPlay.player.inventory
                    ).map((item, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="right">
                                    <BigTooltip title={item.description} arrow TransitionComponent={Zoom} placement="right" justify="left">
                                        <InfoIcon style={{ color: cyan[800] }} />
                                    </BigTooltip>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton color={cyan[900]} onClick={() => { props.useInventoryItem(item) }}>
                                    <PanToolIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}


                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={2}
                            count={props.gameToPlay.player.inventory.length}
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
    )
}

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

    var passagesFromRoom = [];
    for (var passage of props.gameToPlay.passages) {
        if (passage.from === props.gameToPlay.player.inRoom) {
            passagesFromRoom = [...passagesFromRoom, passage];
        }
    }

    return (
        <TableContainer component={Paper} style={{margin:"24px"}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Passages</StyledTableCell>
                        <StyledTableCell align="right">Info</StyledTableCell>
                        <StyledTableCell align="right">Go</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? passagesFromRoom.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : passagesFromRoom
                    ).map((passage, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {index}
                            </TableCell>
                            <TableCell align="right">
                                <BigTooltip title={passage.description} arrow TransitionComponent={Zoom} placement="right" justify="left">
                                    <InfoIcon style={{ color: cyan[800] }} />
                                </BigTooltip>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton color={cyan[900]} onClick={() => { props.usePassage(passage) }}>
                                    <Icon icon={doorOpen} color="green" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}


                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={2}
                            count={passagesFromRoom.length}
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
    )
}

const BigTooltip = withStyles({
    tooltip: {
        fontSize: "12px",
        maxWidth: "none"
    }
})(Tooltip);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: cyan[900],
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

class PlayPage extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container item justify="center">
                            <Typography variant="h4" align="center">
                                Adventura
                            </Typography>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Grid container direction="column">
                    <Grid item>
                        <Box m={4} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h6.fontSize">
                            <TextField id="input-with-icon-grid" label="Session ID" value={this.props.gameToPlay.id} variant="outlined" disabled />
                        </Box>
                    </Grid>

                    <Grid container item justify="center">
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Player</StyledTableCell>
                                            <StyledTableCell align="right">Health</StyledTableCell>
                                            <StyledTableCell align="right">Average attack</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={this.props.gameToPlay.player.name}>
                                            <TableCell component="th" scope="row">
                                                {this.props.gameToPlay.player.name}
                                            </TableCell>
                                            <TableCell align="right">{this.props.gameToPlay.player.hp}</TableCell>
                                            <TableCell align="right">{this.props.gameToPlay.player.attack}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </Grid>

                    <Grid container item justify="center">
                        <Grid item xs={10}>
                            <TextField
                                id="room-description"
                                name="description"
                                multiline
                                rows={14}
                                variant="outlined"
                                value={this.props.gameToPlay.player.inRoom.description}
                                disabled
                                fullWidth
                                style={{margin: "24px"}}
                                />
                        </Grid>
                    </Grid>

                    <Grid container item justify="center">
                        <InventoryList gameToPlay={this.props.gameToPlay} />
                    </Grid>

                    <Grid container item justify="center">
                        <PassageList gameToPlay={this.props.gameToPlay} />
                    </Grid>
                                      
                </Grid>
            </div>
        )
    }
}

export default PlayPage;