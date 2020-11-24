import { Container } from "@material-ui/core";

export function ContainerLG(props) {
  return <Container maxWidth="lg">{props.children}</Container>;
}
