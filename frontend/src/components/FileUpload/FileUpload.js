import React, { Component } from "react";

class FileUpload extends Component {
  render() {
    return (
        <form>
        <div className="form-group files">
        <label>Upload Your File </label>
            <input
              type="file"
              id="fileSelect"
              accept=".txt"
              onChange={this.props.handleFileChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6 pull-right">
            <button
              width="100%"
              type="button"
              className="btn btn-info"
              onClick={this.props.handleSubmit}
            >
              Upload File
            </button>
          </div>
        </form>
    );
  }
}

export default FileUpload;