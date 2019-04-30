import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faMapMarkerAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Table from "./components/Table";
import SOSMap from "./components/SOSMap";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.css';

library.add( faCheck, faMapMarkerAlt, faSave );

class App extends Component {
  
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
              <FontAwesomeIcon icon="save" />
            </Button>
            <Button variant="secondary"
                    className="saveButtonsItems"
                    onClick={this.finishTask(row)}>
              <FontAwesomeIcon icon="check" />
            </Button>
          </div>
        );
      case "InProcess":
        return (
          <div className="saveButtonsDiv" >
            <Button variant="secondary"
                    className="saveButtonsItems"
                    onClick={this.finishTask(row)}>
              <FontAwesomeIcon icon="check" />
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
          <FontAwesomeIcon icon="map-marker-alt" /> ({row.latitude},{row.longitude})
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
        <div className="topdiv">
          <div className="title">SOS</div>
          <div className="subtitle">Centro de gestión de emergencias.</div>
        </div>
        <div className="container">
          <Table
            columns={columns}
            data={this.state.response}
            keyField="_id"
          />
        </div>
        <SOSMap lat={this.state.selectedLatitude} lng={this.state.selectedLongitude}/>
      </div>
        
    );
  }
}

export default App;
