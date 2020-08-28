import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import { useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { cyan, purple, red } from '@material-ui/core/colors';

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
        backgroundColor: red[600],
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[600],
        },
    },
}))(Button);


function EnemyList(props) {
    //Default list
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                <Box mb={2} ml={1}>
                    <ColorButton
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleClickOpen}
                    >
                        Add Enemy
                    </ColorButton>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New Enemy</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Give your new enemy's name below. You can edit it later from the enemy list.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name of the enemy"
                                fullWidth
                                value={props.enemyToAdd.name}
                                onChange={props.setEnemyToCreateName}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { props.addEnemy(props.enemyToAdd); props.resetEnemyToCreate(); }} color="primary">
                                Add
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Grid>


            <Grid item>
                <Box m={1}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">Edit</StyledTableCell>
                                    <StyledTableCell align="right">Delete</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? props.enemies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : props.enemies
                                ).map((enemy, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {enemy.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton component={Link} to={`/create/enemies/${props.enemies.indexOf(enemy)}`} variant="contained">
                                                <EditIcon style={{ color: red[600] }} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton color="secondary" onClick={() => { props.deleteEnemy(enemy) }}>
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
                                        count={props.enemies.length}
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

class EnemyCreatePage extends Component {

    state = {
        enemyToCreate: {
            name: '',
            description: '',
            presentInRoom: false,
            hp: null,
            attack: null,
            fightingType: 'mandatory'
        }
    }

    constructor(props) {
        super(props);
        this.setEnemyToCreateName = this.setEnemyToCreateName.bind(this);
        this.resetEnemyToCreate = this.resetEnemyToCreate.bind(this);
    }

    setEnemyToCreateName = (event) => {
        const { value } = event.target;
        this.setState({
            enemyToCreate: {
                ...this.state.enemyToCreate,
                name: value
            }
        })
    }

    resetEnemyToCreate = () => {
        this.setState({
            enemyToCreate: {
                name: '',
                description: '',
                presentInRoom: false,
                hp: null,
                attack: null,
                fightingType: 'mandatory'
            }
        })
    }

    render() {

        return (
            <div>
                <Grid container direction="column">
                    <Grid container item justify="center">
                        <Box m={4} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize="h6.fontSize">
                            Here you can create and edit enemies, that will appear in game
                        </Box>
                    </Grid>
                </Grid>

                <EnemyList setEnemyToCreateName={this.setEnemyToCreateName} enemyToAdd={this.state.enemyToCreate} addEnemy={this.props.addEnemy} deleteEnemy={this.props.deleteEnemy} enemies={this.props.enemies} resetEnemyToCreate={this.resetEnemyToCreate} />
            </div>
        )
    }
}

export default EnemyCreatePage;