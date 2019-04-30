import React , {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';


class Table extends Component {
  constructor(){
    super();
  }
  
  render() {
    let {keyField, data, columns} = this.props;
    return (
      <BootstrapTable
        keyField={keyField}
        data={ data }
        columns={ columns }
      />)
  }
}

export default Table;