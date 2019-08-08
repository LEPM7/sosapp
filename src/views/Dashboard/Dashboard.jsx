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
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import socketIOClient from "socket.io-client";
import Button from '@material-ui/core/Button';
import SOSMap from '../../components/SOSMap';
import moment from 'moment';

class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  constructor() {
    super();
    this.state = {
      response: [],
      endpoint: "http://localhost:3002",
      ambulances: {},
      selectedLatitude: 14.5462773,
      selectedLongitude: -90.4197275
    };
    this.handleChange = this.handleChange.bind(this);
    this.ambulanceText = this.ambulanceText.bind(this);
    this.createSaveButtons = this.createSaveButtons.bind(this);
    this.createUbicationButton = this.createUbicationButton.bind(this);
    this.saveButton = this.saveButton.bind(this);
    this.finishTask = this.finishTask.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
  }
  
  ambulanceText(cell, row, rowIndex, formatExtraData) {
    if (!cell)
      return <input type="text"
                    placeholder="Ingrese numero de ambulancia"
                    value={this.state.ambulances[rowIndex]}
                    onChange={this.handleChange(rowIndex)} />
    else {
      return <div>{cell}</div>
    }
  };
  
  handleChange(rowIndex) {
    return (event) => {
      let ambulances = this.state.ambulances;
      ambulances[rowIndex] = event.target.value;
      this.setState({ambulances});
    }
  }
  
  createSaveButtons(cell, row, rowIndex, formatExtraData) {
    switch(row.stats){
      case "Waiting":
        return (
          <div className="saveButtonsDiv" >
            <Button
              variant="primary"  className="saveButtonsItems"
              onClick={this.saveButton(row, rowIndex)} >
save              {/* <FontAwesomeIcon icon="save" /> */}
            </Button>
            <Button variant="secondary"
                    className="saveButtonsItems"
                    onClick={this.finishTask(row)}>
                      check
              {/* <FontAwesomeIcon icon="check" /> */}
            </Button>
          </div>
        );
      case "InProcess":
        return (
          <div className="saveButtonsDiv" >
            <Button variant="secondary"
                    className="saveButtonsItems"
                    onClick={this.finishTask(row)}>
                      check
              {/* <FontAwesomeIcon icon="check" /> */}
            </Button>
          </div>
        );
        break;
      case "Finish":
        return (
          <div></div>
        )
    }
  };
  
  createUbicationButton(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="saveButtonsDiv" >
        <Button variant="default" className="saveButtonsItems"
          onClick={this.changeLocation(row.latitude, row.longitude)}
        >
         marker {/* <FontAwesomeIcon icon="map-marker-alt" /> ({row.latitude},{row.longitude}) */}
        </Button>
      </div>
    )
  };
  
  saveButton(row, rowIndex) {
    return (event) => {
      const id = row['_id'];
      const carId = this.state.ambulances[rowIndex];
      const {endpoint} = this.state;
      const socket = socketIOClient(endpoint);
      socket.emit('setCar', { id: id, carID: carId } );
    }
  }
  
  finishTask(row) {
    return (event) => {
      const id = row['_id'];
      const {endpoint} = this.state;
      const socket = socketIOClient(endpoint);
      socket.emit('finishEmergency', { id: id } );
    }
  }
  
  changeLocation(lat, lng){
    return (event) => {
      this.setState({
        selectedLatitude: lat,
        selectedLongitude: lng
      })
    };
  }
  
  componentDidMount() {
    const {endpoint} = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("news", data => {
      let info = JSON.parse(data.data);
      
      this.setState({response: info.map(v => {
        v.date = moment(v.date).format('DD-MM-YYYY, h:mm:ss a');
        return v;
      }).reverse()});
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
    let columns = [
      {dataField: 'date', text: 'Fecha'},
      {
        dataField: '',
        text: 'Ubicación',
        formatter: this.createUbicationButton
      },
      {dataField: 'telefone', text: 'Telefono'},
      {
        dataField: 'ambulance',
        text: 'Ambulancia',
        formatter: this.ambulanceText,
      },
      {
        dataField: '',
        text: 'Opciones',
        formatter: this.createSaveButtons,
      }
    ];
   
    return (
      <div>
        <div className="container">
          hola
        </div>
        <SOSMap lat={this.state.selectedLatitude} lng={this.state.selectedLongitude}/>
      </div>
        
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
