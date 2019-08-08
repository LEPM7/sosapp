/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LocationOn from "@material-ui/icons/LocationOn";
import Send from "@material-ui/icons/Send";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import socketIOClient from "socket.io-client";
import SOSMap from "../../components/SOSMap";
import moment from "moment";

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
      endpoint: "http://localhost:3002",
      ambulances: {},
      selectedLatitude: 14.5462773,
      selectedLongitude: -90.4197275
    };
    this.handleChange = this.handleChange.bind(this);
    this.ambulanceText = this.ambulanceText.bind(this);
    this.saveButton = this.saveButton.bind(this);
    this.finishTask = this.finishTask.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
  }

  ambulanceText(cell, row, rowIndex, formatExtraData) {
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

  handleChange(rowIndex) {
    return event => {
      let ambulances = this.state.ambulances;
      ambulances[rowIndex] = event.target.value;
      this.setState({ ambulances });
    };
  }


  saveButton(row, rowIndex) {
    return event => {
      const id = row["_id"];
      const carId = this.state.ambulances[rowIndex];
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      socket.emit("setCar", { id: id, carID: carId });
    };
  }

  finishTask(row) {
    return event => {
      const id = row["_id"];
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      socket.emit("finishEmergency", { id: id });
    };
  }

  changeLocation(lat, lng) {
    return event => {
      this.setState({
        selectedLatitude: lat,
        selectedLongitude: lng
      });
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("news", data => {
      let info = JSON.parse(data.data);
      this.setState({
        response: info
          .map(v => {
            v.date = moment(v.date).format("DD-MM-YYYY, h:mm:ss a");
            return v;
          })
          .reverse()
      });
    });
  }

  // <Table
  //             tableHeaderColor="primary"
  //             tableHead={["Name", "Country", "City", "Salary"]}
  //             tableData={[
  //               ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
  //               ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
  //               ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
  //               ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
  //               ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
  //               ["Mason Porter", "Chile", "Gloucester", "$78,615"]
  //             ]}
  //           />

  render() {
    const classes = {
      cardTitle,
      cardSubtitle,
      cardLink
    };
    const Cards = this.state.response.map(emergengy => (
      <Card>
        <CardBody>
          <h3>{emergengy.telefone}</h3>
          <h4>{emergengy.date}</h4>
          <div style={({
            display: 'flex',
            direction: 'row',
            justifyItems: 'flex-end',
            alignItems: 'flex-end'
          })}>
            <Button
              variant="contained"
              color="primary.light"
              style={{ marginLeft: "auto", padding: "10px" }}
              onClick={this.changeLocation(emergengy.latitude, emergengy.longitude)}
            >
              ({emergengy.latitude},{emergengy.longitude})
              <LocationOn />
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "auto", padding: "10px" }}
            >
              Asignar
              <Send />
            </Button>
          </div>
        </CardBody>
      </Card>
    ));
    return (
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {Cards}
          </Grid>
          <Grid item xs={8}>
            <SOSMap
              lat={this.state.selectedLatitude}
              lng={this.state.selectedLongitude}
            />
          </Grid>
        </Grid>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
