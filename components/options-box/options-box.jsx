import { useState, useEffect } from "react";
import { useStyles } from "./options-box.style";
import {
  Paper,
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  Switch,
  Link,
} from "@material-ui/core";

import { requestSources, requestFamilyClassifications } from "../../actions";

export function OptionsBox({
                             queryType,
                             onChangeQueryType,
                             onChangeSources,
                             onChangeFamily,
                           }) {
  const classes = useStyles();

  // sources and familiesAvailable
  const [familiesAvailable, setFamiliesAvailable] = useState([]);
  const [familyQuery, setFamilyQuery] = useState("");

  // populate souce state with sources available
  let [sourcesState, setSourcesState] = useState([]);

  const [selectedSource, setSelectedSource] = useState("");

  useEffect(() => {
    async function fetchData() {
      let sources = await requestSources();
      // get only the names
      let families = await requestFamilyClassifications();

      setSourcesState(
          sources.map((source) => ({
            name: source.sourceName,
            enabled: source.isDefault === "1"
          }))
      );

      setFamiliesAvailable(families);
      setFamilyQuery(families[0].sourceName);

      // push names up to index
      let enabledSources = sources
          .filter((s) => s.isDefault === "1")
          .map((s) => s.sourceName)
          .join(",");
      onChangeSources(enabledSources);
      onChangeFamily(families[0].sourceName);
    }

    fetchData();
  }, []);

  // controls the behavior of the user when he clicks the switch
  const handleChangeSources = (name) => {
    let tmpSourcesState = sourcesState.map((source) => {
      if (source.name === name) {
        source.enabled = !source.enabled;
        setSelectedSource(source.enabled ? name : "");
        if (source.enabled) {
          const element = document.getElementById(`source-${name.toLowerCase()}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
      return source;
    });

    setSourcesState(tmpSourcesState);

    let sourceNames = tmpSourcesState
        .filter((s) => s.enabled)
        .map((s) => s.name)
        .join(",");
    onChangeSources(sourceNames);
  };

  const handleSelectFamily = (name) => {
    onChangeFamily(name);
    setFamilyQuery(name);
    setSelectedSource("");
  };


  return (
      <Paper className={classes.paper}>
        <Box p={2}>
          <Box>
            <InputLabel>Processing Mode</InputLabel>
            <FormControl variant="outlined" fullWidth>
              <Select
                  value={queryType}
                  onChange={(e) => onChangeQueryType(e.target.value)}
              >
                <MenuItem value={"resolve"}>Perform name resolution</MenuItem>
                <MenuItem value={"parse"}>Parse names only</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {queryType === "resolve" && (
              <>
                <Box pt={2}>
                  <InputLabel>Family Classification</InputLabel>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                        value={familyQuery}
                        onChange={(e) => handleSelectFamily(e.target.value)}
                    >
                      {familiesAvailable.map((f) => (
                          <MenuItem key={f.sourceName} value={f.sourceName}>
                            {f.sourceName.toUpperCase()}
                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box pt={2}>
                  <FormLabel component="legend">
                    <Link href="/sources">Taxonomic Sources</Link>
                  </FormLabel>
                  <FormGroup row>
                    {sourcesState?.map((s) => {
                      if (s.name){
                        return (
                            <FormControlLabel
                                key={s.name}
                                control={
                                  <Switch
                                      onClick={() => handleChangeSources(s.name)}
                                      checked={s.enabled}
                                  />
                                }
                                label={
                                  <Link
                                      href={`/sources#source-${s.name.toLowerCase()}`}
                                      onClick={() => setSelectedSource(s.name)}
                                      underline={selectedSource === s.name ? "always" : "hover"}
                                  >
                                    {s.name.toUpperCase()}
                                  </Link>
                                }
                            />
                        );
                      }
                      return null;
                    })}
                  </FormGroup>
                </Box>
              </>
          )}
        </Box>
      </Paper>
  );
}