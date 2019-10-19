import React, { Component } from "react";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }

  getKeys = function() {
    return ["URLs", "Number of Images", "Status"];
  };

  getHeader = function() {
    var keys = this.getKeys();

    return keys.map((key, index) => {
      return <th key={key}>{key}</th>;
    });
  };

  getRowsData = function() {
    var items = this.props.data;
    var keys = this.getKeys();
    return items.map((row, index) => {
      return (
        <tr key={index}>
          {row.map((col, index) => {
            return <td key={keys[index]}>{row[index]}</td>;
          })}
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="Table">
        <table>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>{this.getRowsData()}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
