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
import { cyan, purple, grey, red } from '@material-ui/core/colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MapIcon from '@material-ui/icons/Map';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import InfoIcon from '@material-ui/icons/Info';
import arrowRightCircle from '@iconify/icons-mdi/arrow-right-circle';
import { Icon } from '@iconify/react';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
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
import trophyAward from '@iconify/icons-mdi/trophy-award';
import doorOpen from '@iconify/icons-mdi/door-open';




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

function ConseqAccordionWin(props) {

    const [checked, setChecked] = React.useState(false);
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);

    return (
        <div>
            <Grid container item direction="row">
                <Grid item xs={1}>
                    <Checkbox
                        name="checkbox"
                        checked={props.enemies[props.enemyIndex].hpGainReward || checked}
                        onChange={(event) => { setChecked(event.target.checked); props.setHpRewardEnemy(props.enemies[props.enemyIndex], event); }}
                        inputProps={{ 'aria-label': 'primary checkbox' }} />
                </Grid>
                <Grid item xs={11}>
                    <Accordion disabled={!props.enemies[props.enemyIndex].hpGainReward && !checked} style={{ marginBottom: "5px" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <Typography>HP gain</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id="hpReward"
                                name="hpGainReward"
                                label="Amount"
                                variant="outlined"
                                defaultValue={props.enemies[props.enemyIndex].hpGainReward}
                                value={props.enemies[props.enemyIndex].hpGainReward}
                                onChange={(e) => { props.setHpRewardEnemy( props.enemies[props.enemyIndex], e); }}
                            />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>

            <Grid container item direction="row">
                <Grid item xs={1}>
                    <Checkbox
                        name="checkbox"
                        checked={props.enemies[props.enemyIndex].itemGainReward.length != 0 || checked1}
                        onChange={(event) => { setChecked1(event.target.checked); props.toggleItemGainRewardForEnemy(props.enemies[props.enemyIndex], null, event) }}
                        inputProps={{ 'aria-label': 'primary checkbox' }} />
                </Grid>
                <Grid item xs={11}>
                    <Accordion disabled={!(props.enemies[props.enemyIndex].itemGainReward.length != 0) && !checked1} style={{ marginBottom: "5px" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <Typography>Item receive</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ItemList enemies={props.enemies} enemyIndex={props.enemyIndex} toggleItemGainRewardForEnemy={props.toggleItemGainRewardForEnemy} items={props.items}/>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>

            <Grid container item direction="row">
                <Grid item xs={1}>
                    <Checkbox
                        name="checkbox"
                        checked={props.enemies[props.enemyIndex].passageActivationReward.length != 0 || checked2}
                        onChange={(event) => { setChecked2(event.target.checked); props.togglePassageActivationRewardForEnemy(props.enemies[props.enemyIndex], null, event) }}
                        inputProps={{ 'aria-label': 'primary checkbox' }} />
                </Grid>
                <Grid item xs={11}>
                    <Accordion disabled={!(props.enemies[props.enemyIndex].passageActivationReward.length != 0) && !checked2} style={{ marginBottom: "5px" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <Typography>Passage activation</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                <PassageList passages={props.passages} togglePassageActivationRewardForEnemy={props.togglePassageActivationRewardForEnemy} enemies={props.enemies} enemyIndex={props.enemyIndex} />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    )
}

function ConseqAccordionLose(props) {

    const [checked, setChecked] = React.useState(false);
    const [checked1, setChecked1] = React.useState(false);

    return (
        <div>
            <Grid container item direction="row">
                <Grid item xs={1}>
                    <Checkbox
                        checked={checked}
                        onChange={(event) => { setChecked(event.target.checked) }}
                        inputProps={{ 'aria-label': 'primary checkbox' }} />
                </Grid>
                <Grid item xs={11}>
                    <Accordion disabled={!checked} style={{ marginBottom: "5px" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <Typography>Item lost</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                The click event of the nested action will propagate up and expand the accordion unless
                                you explicitly stop it.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>

            <Grid container item direction="row">
                <Grid item xs={1}>
                    <Checkbox
                        checked={checked1}
                        onChange={(event) => { setChecked1(event.target.checked) }}
                        inputProps={{ 'aria-label': 'primary checkbox' }} />
                </Grid>
                <Grid item xs={11}>
                    <Accordion disabled={!checked1} style={{ marginBottom: "5px" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <Typography>Game over</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                The click event of the nested action will propagate up and expand the accordion unless
                                you explicitly stop it.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
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
        <Grid container direction='column'>
            <Grid item>
                <Box m={1}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">Navigate</StyledTableCell>
                                    <StyledTableCell align="right">Reward</StyledTableCell>
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
                                            <IconButton component={Link} to={`/create/items/${props.items.indexOf(item)}`} variant="contained">
                                                <MapIcon style={{ color: cyan[800] }} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Checkbox
                                                checked={props.enemies[props.enemyIndex].itemGainReward == null ? false : props.enemies[props.enemyIndex].itemGainReward.includes(item)}
                                                onChange={(event) => { props.toggleItemGainRewardForEnemy(props.enemies[props.enemyIndex], item, event); }}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                icon={<Icon icon={trophyAward} color="grey" />}
                                                checkedIcon={<Icon icon={trophyAward} color="yellow" />}
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
        </Grid>
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

    return (
        <Grid container direction='column'>
            <Grid item>
                <Box m={1}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>From</StyledTableCell>
                                    <StyledTableCell>To</StyledTableCell>
                                    <StyledTableCell align="right">Navigate</StyledTableCell>
                                    <StyledTableCell align="right">Open</StyledTableCell>
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
                                        <TableCell component="th" scope="row">
                                            {passage.to.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton component={Link} to={`/create/passages/${props.passages.indexOf(passage)}`} variant="contained">
                                                <MapIcon style={{ color: cyan[800] }} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Checkbox
                                                checked={props.enemies[props.enemyIndex].passageActivationReward == null ? false : props.enemies[props.enemyIndex].passageActivationReward.includes(passage)}
                                                onChange={(event) => { props.togglePassageActivationRewardForEnemy(props.enemies[props.enemyIndex], passage, event); }}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                icon={<Icon icon={doorOpen} color="grey" />}
                                                checkedIcon={<Icon icon={doorOpen} color="green" />}
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
    )
}

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

class ParticularEnemyEdit extends Component {
    

    render() {
        const { match: { params } } = this.props;

        return (
            <div>
                <Box m={1}>
                    <ColorButton component={Link} to={`/create/enemies`} size="small" variant="contained" color="primary" startIcon={<ArrowBackIosIcon />}>Back</ColorButton>
                </Box>
                <Grid container direction="column">
                    <Grid container item justify="center">
                        <Box m={4} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h6.fontSize">
                            Here you can edit your enemy
                        </Box>
                    </Grid>

                    <Grid item>
                        <Box mb={3} ml={1}>
                            <TextField required id="enemy-name" name="name" label="Name of the enemy" value={this.props.enemies[params.enemyIndex].name} onChange={(e) => { this.props.setEnemyName(params.enemyIndex, e) }} />
                        </Box>
                    </Grid>

                    <Grid container item spacing={1} alignItems="flex-end">
                        <Grid item>
                            <Box ml={1}>
                                <TextField id="input-with-icon-grid" label="This enemy will appear in room:" value={this.props.enemies[params.enemyIndex].presentInRoom.name} variant="outlined" disabled />
                            </Box>
                        </Grid>
                        <Grid item>
                            <BigTooltip title="Go to room" arrow TransitionComponent={Zoom} placement="right" justify="right">
                                <IconButton component={Link} to={`/create/rooms/${this.props.rooms.indexOf(this.props.enemies[params.enemyIndex].presentInRoom)}`} disabled={!this.props.enemies[params.enemyIndex].presentInRoom} >
                                    <Icon icon={arrowRightCircle} style={{ color: red[600] }} />
                                </IconButton>
                            </BigTooltip>
                        </Grid>
                    </Grid>

                    <Grid container item justify="flex-end">
                        <Box mr={1}>
                            <BigTooltip title="This text will appear when the player will meet the enemy" arrow TransitionComponent={Zoom} placement="right" justify="left">
                                <InfoIcon style={{ color: red[500] }} />
                            </BigTooltip>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box mb={3} ml={1} mr={1}>
                            <TextField
                                id="enemy-description"
                                name="description"
                                label="Description"
                                multiline
                                rows={14}
                                variant="outlined"
                                defaultValue={this.props.enemies[params.enemyIndex].description}
                                onChange={(e) => { this.props.setEnemyDescription(params.enemyIndex, e) }}
                                fullWidth />
                        </Box>
                    </Grid>

                    <Box m={1} boxShadow={3}>
                        <Card variant="outlined" raised>
                            <Grid item>
                                    <Box ml={1}>
                                        <BigTooltip title="You can choose whether its mandatory or not to fight with this enemy" arrow TransitionComponent={Zoom} placement="right" justify="left">
                                            <InfoIcon style={{ color: red[600] }} />
                                        </BigTooltip>
                                    </Box>
                            </Grid>

                            <Grid item xs={2}>
                                <Box ml={1}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Fighting Type</FormLabel>
                                        <RadioGroup aria-label="type" name="type" value={this.props.enemies[params.enemyIndex].fightingType} onChange={(e) => { this.props.setEnemyFightingType(this.props.enemies[params.enemyIndex], e); }} >
                                              <FormControlLabel value="optional" control={<Radio />} label="Optional" />
                                              <FormControlLabel value="mandatory" control={<Radio />} label="Mandatory" />
                                          </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Card>
                    </Box>

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
                                                id="hp"
                                                name="hp"
                                                label="HP"
                                                value={this.props.enemies[params.enemyIndex].hp}
                                                variant="outlined"
                                                style={{ marginRight: "20px" }}
                                                onChange={(e) => { this.props.setEnemyProperties(this.props.enemies[params.enemyIndex], e) }}
                                            />
                                            <TextField
                                                id="attack"
                                                name="attack"
                                                label="Average attack"
                                                value={this.props.enemies[params.enemyIndex].attack}
                                                variant="outlined"
                                                onChange={(e) => { this.props.setEnemyProperties(this.props.enemies[params.enemyIndex], e) }}
                                            />
                                        </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>

                    
                    <Box m={1} boxShadow={3}>
                        <Typography style={{ margin: "10px" }}>Consequencies</Typography>

                        <Grid container item direction="row">
                            <Grid container item xs={6}>
                                <Box m={1} boxShadow={3}>
                                    <Typography style={{ margin: "10px" }}>Win</Typography>
                                    <ConseqAccordionWin enemies={this.props.enemies} enemyIndex={params.enemyIndex} setHpRewardEnemy={this.props.setHpRewardEnemy} toggleItemGainRewardForEnemy={this.props.toggleItemGainRewardForEnemy} togglePassageActivationRewardForEnemy={this.props.togglePassageActivationRewardForEnemy} items={this.props.items} passages={this.props.passages} />
                                </Box>
                            </Grid>

                            <Grid container item xs={6}>
                                <Box m={1} boxShadow={3}>
                                    <Typography style={{ margin: "10px" }}>Lose</Typography>
                                    <ConseqAccordionLose />
                                </Box>
                            </Grid>

                        </Grid>
                    </Box>
                    



                </Grid>
            </div>
        )
    }

}

export default ParticularEnemyEdit;