import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LocationOn from "@material-ui/icons/LocationOn";
import Send from "@material-ui/icons/Send";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import SOSMap from "../../components/SOSMap";
import Emergency from "../../services/emergency";

import {
  cardTitle,
  cardSubtitle,
  cardLink
} from "assets/jss/material-dashboard-react.jsx";

class Dashboard extends React.Component {
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  constructor() {
    super();
    this.state = {
      value: 0,
      response: [],
      assignments: {},
      ambulances: {},
      selectedLatitude: null,
      selectedLongitude: null,
      updating: false
    };
  }

  ambulanceText = (cell, row, rowIndex, formatExtraData) => {
    if (!cell)
      return (
        <input
          type="text"
          placeholder="Ingrese numero de ambulancia"
          value={this.state.ambulances[rowIndex]}
          onChange={this.handleChange(rowIndex)}
        />
      );
    else {
      return <div>{cell}</div>;
    }
  }

  handleChange = (rowIndex) => {
    return event => {
      let ambulances = this.state.ambulances;
      ambulances[rowIndex] = event.target.value;
      this.setState({ ambulances });
    };
  }

  saveButton = (id, carID) => {
    return event => {
      const { endpoint } = this.state;
    };
  }

  finishTask = (row) => {
    return event => {
      const id = row["_id"];
      const { endpoint } = this.state;
    };
  }

  changeLocation = (lat, lng) => {
    return event => {
      this.setState({
        selectedLatitude: lat,
        selectedLongitude: lng
      });
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    let intervalId = setInterval(this.timer, 1000);
    this.setState({intervalId: intervalId});
    new Emergency().getEmergencies().then(emergencies => this.setState({response: emergencies})).catch(console.error);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
 }
 
  timer = () => {
    // setState method is used to update the state
    this.setState({ currentCount: this.state.currentCount -1 });
  }

  render() {
    const {selectedLatitude , selectedLongitude} = this.state;
    const classes = {
      cardTitle,
      cardSubtitle,
      cardLink
    };
    const Cards = this.state.response.map(emergengy => (
      <Card>
        <CardBody style={{padding: "10px 20px", flex: "0 1 auto"}}>
          <h3>
            <strong>Tel:&nbsp;</strong>
            {emergengy.contactPhone}
          </h3>
          <p>
            <strong>Fecha:&nbsp;</strong>
            {emergengy.date}
          </p>
          { !emergengy.ambulance ? (
            <TextField
              id="outlined-name"
              label="Número de ambulancia"
              // value={emergengy.carID || ''}
              onChange={event => {
                const assignments = this.state.assignments;
                assignments[emergengy._id] = event.target.value;
                this.setState({ assignments });
              }}
              variant="outlined"
              style={{ marginBottom: "15px" }}
            />
          ) : (
            <p>
              <strong>Ambulancia:&nbsp;</strong>
              {emergengy.ambulance}
            </p>
          )}

          <div
            style={{
              display: "flex",
              direction: "row",
              justifyItems: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Button
              variant="contained"
              style={{ marginLeft: "auto", padding: "10px" }}
              onClick={this.changeLocation(
                emergengy.latitude,
                emergengy.longitude
              )}
            >
              ({emergengy.latitude},{emergengy.longitude})
              <LocationOn />
            </Button>
            {!emergengy.ambulance ? (
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "auto", padding: "10px" }}
                onClick={this.saveButton(
                  emergengy._id,
                  this.state.assignments[emergengy._id]
                )}
                disabled={
                  !(
                    this.state.assignments[emergengy._id] &&
                    this.state.assignments[emergengy._id] !== ""
                  )
                }
              >
                Asignar
                <Send />
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </CardBody>
      </Card>
    ));

    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div style={{ maxHeight: 800, overflow: "auto" }}>{Cards}</div>
        </Grid>
        <Grid item xs={8}>
        {
          selectedLatitude && selectedLongitude ? 
          <SOSMap lat={selectedLatitude} lng={selectedLongitude}/>
          : null
        } 
        </Grid>
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
