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
import InfoIcon from '@material-ui/icons/Info';
import arrowRightCircle from '@iconify/icons-mdi/arrow-right-circle';
import { Icon } from '@iconify/react';


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

                    

                </Grid>
            </div>
        )
    }

}

export default ParticularItemEdit;