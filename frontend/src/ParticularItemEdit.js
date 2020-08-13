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
import { shadows } from '@material-ui/system';


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

function AccordionList(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
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
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                              </Typography>
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
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                              </Typography>
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
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                              </Typography>
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
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                              </Typography>
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
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                              </Typography>
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
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                              </Typography>
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

    state = {
        
    }
    

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
                            <Box mr={1}>
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
                                <AccordionList usageType={this.props.items[params.itemIndex].usageType} />
                            </Grid>
                        </Card>
                    </Box>
                    

                </Grid>
            </div>
        )
    }

}

export default ParticularItemEdit;