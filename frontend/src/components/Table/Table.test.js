import React from "react";
import {shallow} from "enzyme";
import Table from "./Table";

it("renders in table rows based on provided columns", () => {
  const cols = ["URLs", "Number of Images", "Status"];

  const data = [
    ["https://www.google.com/", 1, "Link is Valid"],
    ["https://www.linkedin.com/", 5, "Link is Valid"],
    ["https:/www.facebook.com/oks", 0, "['Enter a valid URL.']"]
  ];

  // Shallow render Table
  const container = shallow(<Table data={data} />);

  // There should be ONLY 1 table element
  const table = container.find("table");
  expect(table).toHaveLength(1);

  // The table should have ONLY 1 thead element
  const thead = table.find("thead");
  expect(thead).toHaveLength(1);

  // The number of th tags should be equal to number of columns
  const headers = thead.find("th");
  expect(headers).toHaveLength(cols.length);

  // Each th tag text should equal to column header
  headers.forEach((th, idx) => {
    expect(th.text()).toEqual(cols[idx]);
  });

  // The table should have ONLY 1 tbody tag
  const tbody = table.find("tbody");
  expect(tbody).toHaveLength(1);

  // tbody tag should have the same number of tr tags as data rows
  const rows = tbody.find("tr");
  expect(rows).toHaveLength(data.length);

  // Loop through each row and check the content
  rows.forEach((tr, rowIndex) => {
    const cells = tr.find("td");

    // Number of cells in a row should be equal to number of columns.
    expect(cells).toHaveLength(cols.length); 
    
    expect(cells.at(0).text()).toEqual(data[rowIndex][0]);
    expect(cells.at(1).text()).toEqual(data[rowIndex][1].toString());
    expect(cells.at(2).text()).toEqual(data[rowIndex][2]);
  });
});
