import { useState } from "react";
import { useTable } from "react-table";
import Head from "next/head";
import axios from "axios";
import { Table } from "react-bootstrap";
import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';

const test = {
  opts: {
    sources: "tropicos,tpl,usda",
    class: "tropicos",
    mode: "resolve",
    matches: "best",
  },
  // TODO: add more names
  data: [],
};

// Function to convert the JSON array to an object with key-value pairs
// function arrayToJSONObject (arr){
//   //header
//   var data = arr.data;
//   var keys = data[0];

//   var formatted = [],
//   cols = keys,
//   l = cols.length;

//   // Create an object for each array and append column names (keys)
//   for (var i=0; i<data.length; i++) {
//           var d = data[i],
//                   o = {};
//           for (var j=0; j<l; j++)
//                   o[cols[j]] = d[j];
//           formatted.push(o);
//   }

//   // Convert JSON object to string for the component to parse
//   return JSON.stringify(formatted);
// };


function Test() {
  const [result, setResult] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [input, setInput] = useState("");
  const [x, setX] = useState([]);


  const queryNames = (names) => {
    const query = names.split("\n").map((v, i) => [i+1, v]);
    test.data = query;
    //test.data.push(query);
    setJsonInput(JSON.stringify(test));
    setResult("loading");
    axios
      .post("http://vegbiendev.nceas.ucsb.edu:8975/tnrs_api.php", test, {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (res) => {
          //console.log(res);
          setResult(JSON.stringify(res.data))
          setX(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const y = [
    {
      ID: 12,
      Name_matched: 'erfwerew'
    },
    {
      ID: 78,
      Name_matched: 'rtherd34'
    },
  ]

  // setX(y);

  const renderTNRS = (name, index) => {
    return(
      <tr key={index}>
        <td>{name.ID}</td>
        <td>{name.Name_matched}</td>
      </tr>

    )
  }

  


  return (
    <div className="container">
      <Head>
        <title>TNRS Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">Test Request</h1>
        <textarea
          rows={10}
          cols={50}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button type="button" onClick={() => queryNames(input)}>
          Click Me!
        </button>
        <div>JsonInput: {jsonInput}</div>
        <br/>
        <div>Result: {result}</div>
      </main>
      <footer>
        __________
        <br />
        TNRS 2020
      </footer>


      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name_matched</th>
          </tr>
        </thead>
        <tbody>
          {x.map(renderTNRS)}
        </tbody>
      </ReactBootStrap.Table>


    </div>

  );
}


export default Test;