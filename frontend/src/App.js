// eslint-disable-next-line 
import React, { Component } from 'react';
import axios from 'axios';
import Table from './components/Table/Table';
import FileUpload from './components/FileUpload/FileUpload';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  state = {
    datafile: null,
    error: null,
    data: null
  };
  
  handleFileChange = (e) => {
    this.setState({
      datafile: e.target.files[0],
      error: null,
      data: null
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('datafile', this.state.datafile);
    let url = 'http://localhost:8000/api/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then((res) => {
          this.setState({
            data: res.data
          })
        }        
        )
        .catch(error => {
          this.setState({
            error: `${error.response.data.datafile.join()}`
          })
        }
        )
  };


  render() {
    const { error, data } = this.state;

 return (
  <div className="container">
    <div className="row">
      <div className="col-md-6">
    <FileUpload handleSubmit={this.handleSubmit} 
          handleFileChange={this.handleFileChange} />
    { (error) &&  <p className="Error" > Error: {error}</p> }
    { (data) && <Table data={data}/> }
    </div>
  </div>
  </div>
);

}
}

export default App;