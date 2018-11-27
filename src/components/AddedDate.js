import { Box, Button } from "grommet";
import { StatusCritical } from "grommet-icons";
import React, { Component } from "react";
import { Grommet } from "grommet";

class AddedDate extends Component {

  render() {
    return (
      <Grommet>
        <Box
          flex
          direction="row"
          justify="end"
          alignContent="end"
          gap="small"
          border={this.props.border}
        >
          {this.props.store}
          {"  "}
          <Button onClick={this.props.onClick}>
            <StatusCritical color="red" />
          </Button>
        </Box>
      </Grommet>
    );
  }
}

export default AddedDate;
