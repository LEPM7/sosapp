import React, {Component} from 'react';
import L from 'leaflet'
import  {Map, TileLayer, Marker, Popup,}  from 'react-leaflet';
import alarm from '../images/alarm.svg';
import 'leaflet/dist/leaflet.css';

class SOSMap extends Component {
  
  constructor() {
    super();
  }
  
  pointerIcon = new L.Icon({
    iconUrl: alarm,
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
    iconSize: [40, 40],
  });
  
  render() {
    const {lat, lng} = this.props;
    return (
      <Map zoom={13} center={[lat, lng]} style={{
        width: '800px',
        height: '400px',
        textAlign: 'center'
      }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={this.pointerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}

export default SOSMap;