import { useState } from "react";
import Head from "next/head";
import axios from "axios";

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
function arrayToJSONObject (arr){
  //header
  var data = arr.data;
  var keys = data[0];

  var formatted = [],
  cols = keys,
  l = cols.length;

  // Create an object for each array and append column names (keys)
  for (var i=0; i<data.length; i++) {
          var d = data[i],
                  o = {};
          for (var j=0; j<l; j++)
                  o[cols[j]] = d[j];
          formatted.push(o);
  }

  // Convert JSON object to string for the component to parse
  return JSON.stringify(formatted);
};


export default function Test() {
  const [result, setResult] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [input, setInput] = useState("");



  const queryNames = (names) => {
    const query = names.split("\n").map((v, i) => [v, i ]);
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
          console.log(res)
          setResult(arrayToJSONObject(res))
        },
        (error) => {
          console.log(error);
        }
      );
  };




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
        <div>Result: {result}</div>
      </main>
      <footer>
        __________
        <br />
        TNRS 2020
      </footer>
    </div>
  );
}
