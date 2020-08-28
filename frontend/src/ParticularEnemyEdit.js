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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import MapIcon from '@material-ui/icons/Map';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import InfoIcon from '@material-ui/icons/Info';
import arrowRightCircle from '@iconify/icons-mdi/arrow-right-circle';
import { Icon } from '@iconify/react';
import Card from '@material-ui/core/Card';
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



                </Grid>
            </div>
        )
    }

}

export default ParticularEnemyEdit;