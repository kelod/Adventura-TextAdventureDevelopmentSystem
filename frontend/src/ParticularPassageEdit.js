import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { cyan, purple, grey, green } from '@material-ui/core/colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import arrowRightCircle from '@iconify/icons-mdi/arrow-right-circle';
import { Icon } from '@iconify/react';


const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: grey[500],
        '&:hover': {
            backgroundColor: grey[600],
        },
    },
}))(Button);


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

                    <Grid container item spacing={1} alignItems="flex-end">
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
                </Grid>
            </div>
        )
    }
}

export default ParticularPassageEdit;