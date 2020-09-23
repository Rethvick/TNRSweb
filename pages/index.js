import { useState } from "react";

import Head from "next/head";
import axios from "axios";

import { SearchBox } from "../components/";

import {
  Paper,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
  Checkbox,
  Slider,
  ToggleButtonGroup,
  ToggleButton,
  Switch,
  Divider,
  Link,
} from "@material-ui/core";

const test = {
  opts: {
    sources: "tropicos,tpl,usda",
    class: "tropicos",
    mode: "resolve",
    matches: "best",
  },
  data: [],
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        TNRS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Menu = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6">TNRS</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default function Test() {
  const [result, setResult] = useState("");
  const [jsonInput, setJsonInput] = useState("");

  const queryNames = (names) => {
    const query = names.split("\n").map((v, i) => [v, i + 1]);
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
          console.log(res);
          setResult(JSON.stringify(res));
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <>
      <Head>
        <title>TNRS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box>
          <Menu />
        </Box>
        <Box flexGrow={1} mt={2}>
          <main>
            <Container>
              <Grid
                spacing={2}
                direction="row"
                justify="center"
                alignItems="stretch"
                container
              >
                <Grid xs={6} item>
                  <SearchBox onSearch={queryNames}/>
                </Grid>
                <Grid xs={6} item>
                  <Paper>
                    <Box p={2}>
                      <Divider />
                      <FormGroup row>
                        <InputLabel>Processing Mode</InputLabel>
                        <Select fullWidth>
                          <MenuItem value={0}>Perform name resulution</MenuItem>
                          <MenuItem value={1}>Parse names only</MenuItem>
                        </Select>
                        <Divider />
                        <FormControlLabel
                          control={<Checkbox checked={true} />}
                          label="Allow partial matching"
                        />
                      </FormGroup>
                      <FormGroup row>
                        <Typography id="fuzzy-slider" gutterBottom>
                          Sensitivity
                        </Typography>
                        <Slider
                          defaultValue={0.05}
                          aria-labelledby="fuzzy-slider"
                          step={0.01}
                          min={0.05}
                          max={1}
                          marks
                          valueLabelDisplay="auto"
                        />
                      </FormGroup>
                      <Divider />
                      <FormLabel component="legend">Sources</FormLabel>
                      <FormGroup row>
                        <FormControlLabel
                          control={<Switch checked={false} />}
                          label="TROPICOS"
                        />
                        <FormControlLabel
                          control={<Switch checked={false} />}
                          label="TPL"
                        />
                        <FormControlLabel
                          control={<Switch checked={false} />}
                          label="USDA"
                        />
                      </FormGroup>
                    </Box>
                  </Paper>
                </Grid>
                <Grid xs={12} item>
                  <Paper>
                    <Box p={2}>
                      <div>JsonInput: {jsonInput}</div>
                      <div>Result: {result}</div>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </main>
        </Box>
        <Box>
          <footer>
            <Box py={10} bgcolor="gray">
              <Container>
                <Copyright />
              </Container>
            </Box>
          </footer>
        </Box>
      </Box>
    </>
  );
}
