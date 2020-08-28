import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { cyan, purple, grey } from '@material-ui/core/colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import arrowRightCircle from '@iconify/icons-mdi/arrow-right-circle';
import { Icon } from '@iconify/react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import MapIcon from '@material-ui/icons/Map';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Switch from '@material-ui/core/Switch';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import InfoIcon from '@material-ui/icons/Info';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: grey[500],
        '&:hover': {
            backgroundColor: grey[600],
        },
    },
}))(Button);

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
                                <StyledTableCell style={{ fontWeight: "bold" }}>Neccessary Items</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: "bold" }} align="right">Navigate</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: "bold" }} align="right">Needed</StyledTableCell>
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
                                            checked={props.passages[props.passageIndex].requestedItems.includes(item)}
                                            onChange={() => { props.setNeccessaryItemToPassage(props.passages[props.passageIndex], item); }}
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

class ParticularPassageEdit extends Component {

    render() {
        const { match: { params } } = this.props;

        return (
            <div>
                <Box m={1}>
                    <ColorButton component={Link} to={`/create/passages`} size="small" variant="contained" color="primary" startIcon={<ArrowBackIosIcon />}>Back</ColorButton>
                </Box>
                <Grid container direction="column">
                    <Grid container item justify="center">
                        <Box m={4} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h6.fontSize">
                            Here you can edit your passage's details
                        </Box>
                    </Grid>

                    <Grid container item spacing={1} alignItems="flex-end" justify="center">
                        <Grid item>
                            <Box ml={1}>
                                <TextField id="input-with-icon-grid" label="From:" value={this.props.passages[params.passageIndex].from.name} variant="outlined" disabled />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Icon icon={arrowRightCircle} style={{ color: cyan[900], fontSize: 40 }} />
                        </Grid>
                        <Grid item>
                            <Box ml={1}>
                                <TextField id="input-with-icon-grid" label="To:" value={this.props.passages[params.passageIndex].to.name} variant="outlined" disabled />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container item justify="center">
                        <Box ml={1} mt={1}>
                            <FormControlLabel
                                control={
                                    <ColoredSwitch
                                        checked={this.props.passages[params.passageIndex].defaultEnabled}
                                        onChange={() => { this.props.togglePassageDefaultEnabled(this.props.passages[params.passageIndex]) }}
                                        name="togglePassageEnabled"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        checkedIcon={<CheckCircleIcon />}
                                        icon={<CancelIcon />}
                                    />
                                }
                                label="Default activation"
                                labelPlacement="top"
                            />
                        </Box>
                    </Grid>

                    <Grid container item justify="flex-end">
                        <Box mr={1}>
                            <BigTooltip title="This description will appear in the options which can be selected. For example: Go across the river" arrow TransitionComponent={Zoom} placement="left">
                                <InfoIcon style={{ color: cyan[800] }} />
                            </BigTooltip>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box mb={3} ml={1} mr={1}>
                            <TextField
                                id="passage-description"
                                name="description"
                                label="Description"
                                multiline
                                rows={7}
                                variant="outlined"
                                defaultValue={this.props.passages[params.passageIndex].description}
                                onChange={(e) => { this.props.setPassageDescription(params.passageIndex, e) }}
                                fullWidth />
                        </Box>
                    </Grid>

                    <Grid container item justify="flex-end">
                        <Box mr={1}>
                            <BigTooltip title="Select which items are needed to activate the passage" arrow TransitionComponent={Zoom} placement="left">
                                <InfoIcon style={{ color: cyan[800] }} />
                            </BigTooltip>
                        </Box>
                    </Grid>
                    <ItemList
                        passageIndex={params.passageIndex}
                        passages={this.props.passages}
                        items={this.props.items}
                        setNeccessaryItemToPassage={this.props.setNeccessaryItemToPassage}
                    />


                </Grid>
            </div>
        )
    }
}

export default ParticularPassageEdit;