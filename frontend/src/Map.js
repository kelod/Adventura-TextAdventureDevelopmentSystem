import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

class Map extends Component {

    state = {
        roomFromName: '', //for setting new passage
    }

    renderColorToNode(nodeId) {
        if (this.state.roomFromName === nodeId) {
            return "red";
        }
        else {
            return "lightgreen";
        }
    }

    render() {
        var data;
        if (this.props.rooms.length === 0) {
             data = {
                nodes: [{ id: 'Empty room' }],
                links: [{source: 'Empty room', target: 'Empty room'}]
            };
        }
        else {
            data = {
                nodes: this.props.rooms.map((room) => {
                    return (
                        {
                            id: room.name,
                            color: this.renderColorToNode(room.name)
                        }
                    )
                }),
                links: this.props.passages.map((passage) => {
                    return (
                        {
                            source: passage.from.name,
                            target: passage.to.name
                        }
                    )
                })
            };
        }

        

        // the graph configuration, you only need to pass down properties
        // that you want to override, otherwise default ones will be used
        const myConfig = {
            nodeHighlightBehavior: true,
            linkHighlightBehavior: true,
            highlightOpacity: "0.5",
            node: {
                color: 'lightgreen',
                size: 300,
                highlightStrokeColor: 'green',
                fontSize: "16",
                highlightFontSize: "19",
                highlightColor: 'green',
                labelPosition: "bottom"
            },
            link: {
                highlightColor: 'lightblue',
                strokeWidth: "2"
            },
            d3: {
                gravity: -200
            },
            directed: "true"
        };

        
        const onClickNode =  (nodeId) => {

            if (this.state.roomFromName !== '') {
                if (this.state.roomFromName === nodeId) {
                    this.setState({
                        roomFromName: '',
                        lastClickedNodeId: ''
                    })
                }
                else {
                    var roomFrom = this.props.getRoomByName(this.state.roomFromName);
                    var roomTo = this.props.getRoomByName(nodeId);

                    this.props.setPassageBetweenRooms(roomFrom, roomTo);
                    this.setState({
                        roomFromName: '',
                        lastClickedNodeId: ''
                    })
                }
            }
            else {
                this.setState({
                    roomFromName: nodeId
                })
            }
        };

        const onDoubleClickNode = (nodeId) => {
            this.props.history.push(`/create/rooms/${this.props.rooms.indexOf(this.props.getRoomByName(nodeId))}`);
        }

        const onMouseOverNode = function (nodeId) {
          //  window.alert(`Mouse over node ${nodeId}`);
        };

        const onMouseOutNode = function (nodeId) {
           // window.alert(`Mouse out node ${nodeId}`);
        };

        const onClickLink =  (source, target) => {
           // window.alert(`Clicked link between ${source} and ${target}`);
            var roomFrom = this.props.getRoomByName(source);
            var roomTo = this.props.getRoomByName(target);

            this.props.setPassageBetweenRooms(roomFrom, roomTo);
        };

        const onMouseOverLink = function (source, target) {
          //  window.alert(`Mouse over in link between ${source} and ${target}`);
        };

        const onMouseOutLink = function (source, target) {
           // window.alert(`Mouse out link between ${source} and ${target}`);

        };

        return (
            <div>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="h6" color="inherit">
                            <Box textAlign="center" m={2} fontWeight="fontWeightMedium" fontFamily="Monospace">
                                Below you can see the game map you have created so far... Note that if you don't see any rooms, maybe its not connected to any other room.
                                You can simply remove passages by clicking on them, or add new ones, by selecting the source and the target rooms after each other.
                                If you double click on a room, you can navigate to its edit page.
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Graph
                            id="graph-id" // id is mandatory
                            data={data}
                            config={myConfig}
                            onClickNode={onClickNode}
                            onDoubleClickNode={onDoubleClickNode}
                            onClickLink={onClickLink}
                            onMouseOverNode={onMouseOverNode}
                            onMouseOutNode={onMouseOutNode}
                            onMouseOverLink={onMouseOverLink}
                            onMouseOutLink={onMouseOutLink}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Map;