import { Link } from "@material-ui/core";

import {
  Link as LinkIcon,
} from "@material-ui/icons";

// receives a row and generate the links to the sources
export const mkSourceLinks = (row) => {
  let sources = row.Source.split(",");
  let links = row.Name_matched_url.split(";");
  //
  return _.zip(sources, links).map(
    (pair) =>
      pair[1] && (
        <Link key={row.unique_id + pair[0]} href={pair[1]} target="_blank">
          {" "}
          {pair[0].toUpperCase()}
        </Link>
      )
  );
};

// receives a row and generate the links to the sources
export const mkAcceptedNameLinks = (row) => {
  let links = row.Accepted_name_url.split(";");
  //
  return links.map(
    (link) =>
      link && (
        <Link key={row.unique_id + link} href={link} target="_blank">
          <LinkIcon />
        </Link>
      )
  );
};
