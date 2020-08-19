import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { cyan, purple, grey, green } from '@material-ui/core/colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import InfoIcon from '@material-ui/icons/Info';
import arrowRightCircle from '@iconify/icons-mdi/arrow-right-circle';
import { Icon } from '@iconify/react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Switch from '@material-ui/core/Switch';
import { useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { shadows } from '@material-ui/system';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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

const BigTooltip = withStyles({
    tooltip: {
        fontSize: "12px",
        maxWidth: "none"
    }
})(Tooltip);




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
    switch (props.usageType) {
        case 'game':
            accordionList = <div>
                <Accordion expanded={expanded === 'game'} onChange={handleExpand('game')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Game win/lose</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box ml={1}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Win/Lose</FormLabel>
                                <RadioGroup aria-label="game" name="game" value={props.items[props.itemIndex].game} onChange={(e) => { props.setItemType(props.itemIndex, e); }}>
                                    <FormControlLabel value="win" control={<Radio />} label="Win" />
                                    <FormControlLabel value="lose" control={<Radio />} label="Lose" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled expanded={expanded === 'hp'} onChange={handleExpand('hp')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>HP gain/loss</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            id="hp"
                            name="hp"
                            label="Quantity(+/-)"
                            variant="outlined"
                            defaultValue={props.items[props.itemIndex].hp}
                            onChange={(e) => { props.setItemType(props.itemIndex, e) }} />
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled expanded={expanded === 'passage'} onChange={handleExpand('passage')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Passage (de)activation</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="row">
                            <Grid item xs={6}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>From</StyledTableCell>
                                                <StyledTableCell align="right">To</StyledTableCell>
                                                <StyledTableCell align="right">Handle</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(rowsPerPage > 0
                                                ? props.passages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                : props.passages
                                            ).map((passage, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {passage.from.name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {passage.to.name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <IconButton color="secondary" onClick={() => { props.setPassageActivationToItem(passage, props.items[props.itemIndex]) }}>
                                                            <DeleteOutlineIcon />
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
                                                    count={props.passages.length}
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
                    </AccordionDetails>
                </Accordion>
            </div>

            break;

        
        case 'hp':
            accordionList = <div>
                <Accordion disabled expanded={expanded === 'game'} onChange={handleExpand('game')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Game win/lose</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box ml={1}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Win/Lose</FormLabel>
                                <RadioGroup aria-label="game" name="game" value={props.items[props.itemIndex].game} onChange={(e) => { props.setItemType(props.itemIndex, e); }}>
                                    <FormControlLabel value="win" control={<Radio />} label="Win" />
                                    <FormControlLabel value="lose" control={<Radio />} label="Lose" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'hp'} onChange={handleExpand('hp')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>HP gain/loss</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            id="hp"
                            name="hp"
                            label="Quantity(+/-)"
                            variant="outlined"
                            defaultValue={props.items[props.itemIndex].hp}
                            onChange={(e) => { props.setItemType(props.itemIndex, e) }} />
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled expanded={expanded === 'passage'} onChange={handleExpand('passage')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Passage (de)activation</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="row">
                            <Grid item xs={6}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>From</StyledTableCell>
                                                <StyledTableCell align="right">To</StyledTableCell>
                                                <StyledTableCell align="right">Handle</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(rowsPerPage > 0
                                                ? props.passages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                : props.passages
                                            ).map((passage, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {passage.from.name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {passage.to.name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <IconButton color="secondary" onClick={() => { props.setPassageActivationToItem(passage, props.items[props.itemIndex]) }}>
                                                            <DeleteOutlineIcon />
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
                                                    count={props.passages.length}
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
                    </AccordionDetails>
                </Accordion>
            </div>

            break;
        case 'passage':
            accordionList = <div>
                <Accordion disabled expanded={expanded === 'game'} onChange={handleExpand('game')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Game win/lose</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box ml={1}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Win/Lose</FormLabel>
                                <RadioGroup aria-label="game" name="game" value={props.items[props.itemIndex].game} onChange={(e) => { props.setItemType(props.itemIndex, e); }}>
                                    <FormControlLabel value="win" control={<Radio />} label="Win" />
                                    <FormControlLabel value="lose" control={<Radio />} label="Lose" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled expanded={expanded === 'hp'} onChange={handleExpand('hp')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>HP gain/loss</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            id="hp"
                            name="hp"
                            label="Quantity(+/-)"
                            variant="outlined"
                            defaultValue={props.items[props.itemIndex].hp}
                            onChange={(e) => { props.setItemType(props.itemIndex, e) }} />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'passage'} onChange={handleExpand('passage')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Passage (de)activation</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="row">
                            <Grid item xs={6}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>From</StyledTableCell>
                                                <StyledTableCell align="right">To</StyledTableCell>
                                                <StyledTableCell align="right">Handle</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(rowsPerPage > 0
                                                ? props.passages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                : props.passages
                                            ).map((passage, index) => {
                                                if (props.items[props.itemIndex].passageActivations.some(passageActivation => passageActivation.passage.from.name === passage.from.name &&
                                                    passageActivation.passage.to.name === passage.to.name)) {

                                                    return <div />;
                                                }
                                                else {
                                                    return (<TableRow key={index}>
                                                        <TableCell component="th" scope="row">
                                                            {passage.from.name}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {passage.to.name}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <IconButton color="secondary" onClick={() => { props.setPassageActivationToItem(passage, props.items[props.itemIndex]) }}>
                                                                <DeleteOutlineIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>)}
                                            })}


                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                    colSpan={2}
                                                    count={props.passages.length}
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
                            <Grid item xs={6}>
                                <Box ml={1}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Swipe</StyledTableCell>
                                                    <StyledTableCell align="right">From</StyledTableCell>
                                                    <StyledTableCell align="right">To</StyledTableCell>
                                                    <StyledTableCell align="right">Enable</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {(rowsPerPage > 0
                                                    ? props.items[props.itemIndex].passageActivations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    : props.items[props.itemIndex].passageActivations
                                                ).map((passageActivation, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell component="th" scope="row">
                                                                <IconButton color="secondary" onClick={() => { props.deletePassageActivationToItem(passageActivation, props.items[props.itemIndex]) }}>
                                                                    <DeleteOutlineIcon />
                                                                </IconButton>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {passageActivation.passage.from.name}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {passageActivation.passage.to.name}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                            <ColoredSwitch
                                                                checked={passageActivation.enable}
                                                                onChange={() => { props.togglePassageActivationByItem(passageActivation, props.items[props.itemIndex]) }}
                                                                name="togglePassageActivation"
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
                                                        count={props.passages.length}
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

                        </Grid>
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
                        <Typography>Game win/lose</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                              </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>HP gain/loss</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                              </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Passage (de)activation</Typography>
                    </AccordionSummary>
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

class ParticularItemEdit extends Component {

    render() {
        const { match: { params } } = this.props;

        return (
            <div>
                <Box m={1}>
                    <ColorButton component={Link} to={`/create/items`} size="small" variant="contained" color="primary" startIcon={<ArrowBackIosIcon />}>Back</ColorButton>
                </Box>
                <Grid container direction="column">
                    <Grid container item justify="center">
                        <Box m={4} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h6.fontSize">
                            Here you can edit your item
                        </Box>
                    </Grid>

                    <Grid item>
                        <Box mb={3} ml={1}>
                            <TextField required id="item-name" name="name" label="Name of the item" value={this.props.items[params.itemIndex].name} onChange={(e) => { this.props.setItemName(params.itemIndex, e) }} />
                        </Box>
                    </Grid>

                    <Grid container item spacing={1} alignItems="flex-end">
                        <Grid item>
                            <Box ml={1}>
                                <TextField id="input-with-icon-grid" label="This item is in room:" value={this.props.items[params.itemIndex].presentInRoom.name} variant="outlined" disabled />
                            </Box>
                        </Grid>
                        <Grid item>
                            <BigTooltip title="Go to room" arrow TransitionComponent={Zoom} placement="right" justify="right">
                                <IconButton component={Link} to={`/create/rooms/${this.props.rooms.indexOf(this.props.items[params.itemIndex].presentInRoom)}`} disabled={!this.props.items[params.itemIndex].presentInRoom} >
                                    <Icon icon={arrowRightCircle} style={{ color: cyan[900] }} />
                                </IconButton>
                            </BigTooltip>
                        </Grid>
                    </Grid>

                    <Grid container item justify="flex-end">
                        <Box mr={1}>
                            <BigTooltip title="This text will appear when the player will observe the item" arrow TransitionComponent={Zoom} placement="right" justify="left">
                                <InfoIcon style={{ color: cyan[800] }} />
                            </BigTooltip>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box mb={3} ml={1} mr={1}>
                            <TextField
                                id="item-description"
                                name="description"
                                label="Description"
                                multiline
                                rows={14}
                                variant="outlined"
                                defaultValue={this.props.items[params.itemIndex].description}
                                onChange={(e) => { this.props.setItemDescription(params.itemIndex, e) }}
                                fullWidth />
                        </Box>
                    </Grid>

                    <Box m={1} boxShadow={3}>
                        <Card variant="outlined" raised>
                            <Grid container item justify="space-between">
                                <Grid item>
                                    <Box ml={1}>
                                        <BigTooltip title="An inventory item can be stored in you inventory, usable items only can be used at that moment" arrow TransitionComponent={Zoom} placement="right" justify="left">
                                            <InfoIcon style={{ color: cyan[800] }} />
                                        </BigTooltip>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box mr={1}>
                                        <BigTooltip title="When the player will interact with the item, this text will appear" arrow TransitionComponent={Zoom} placement="right" justify="left">
                                            <InfoIcon style={{ color: cyan[800] }} />
                                        </BigTooltip>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container item direction="row">
                                <Grid item xs={2}>
                                    <Box ml={1}>
                                        <FormControl component="fieldset">  
                                            <FormLabel component="legend">Item Type</FormLabel>
                                            <RadioGroup aria-label="type" name="type" value={this.props.items[params.itemIndex].type} onChange={(e) => { this.props.setItemType(params.itemIndex, e); }}>
                                                <FormControlLabel  value="inventory" control={<Radio />} label="Inventory item" />
                                                <FormControlLabel  value="usable" control={<Radio />} label="Usable item" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={10}>
                                    <Box mr={1} mb={1}>
                                        <TextField
                                            id="item-usage"
                                            name="usageDescription"
                                            label="Usage description"
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            defaultValue={this.props.items[params.itemIndex].usageDescription}
                                            onChange={(e) => { this.props.setItemDescription(params.itemIndex, e) }}
                                            fullWidth />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>
                    </Box>

                    <Box m={1} boxShadow={3}>
                        <Card variant="outlined" raised>
                            <Grid item>
                                <Box mt={1} ml={1}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Usage Type</FormLabel>
                                        <RadioGroup aria-label="usageType" name="usageType" value={this.props.items[params.itemIndex].usageType} onChange={(e) => { this.props.setItemType(params.itemIndex, e); }}>
                                            <FormControlLabel value="game" control={<Radio />} label="Game win/lose" />
                                            <FormControlLabel value="hp" control={<Radio />} label="HP gain/loss" />
                                            <FormControlLabel value="passage" control={<Radio />} label="Passage (de)activation" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item>
                                <AccordionList usageType={this.props.items[params.itemIndex].usageType} setItemType={this.props.setItemType} itemIndex={params.itemIndex} items={this.props.items} setPassageActivationToItem={this.props.setPassageActivationToItem} passages={this.props.passages} togglePassageActivationByItem={this.props.togglePassageActivationByItem} deletePassageActivationToItem={this.props.deletePassageActivationToItem} />
                            </Grid>
                        </Card>
                    </Box>
                    

                </Grid>
            </div>
        )
    }

}

export default ParticularItemEdit;