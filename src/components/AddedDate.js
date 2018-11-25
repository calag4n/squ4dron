import { Box, Button } from "grommet";
import { StatusGood, StatusCritical } from "grommet-icons";
import React, { Component } from "react";

class AddedDate extends Component {
  state = { valid: false, invalid: true };

  render() {
    return (
      <Box
        flex
        width="40%"
        direction="row"
        justifyContent="between"
        // justify="center"
        gap="medium"
        valid={this.state.valid}
      >
        {this.props.store}
        {"   "}
        <Button onClick={this.props.onClick}>
          <StatusGood color={this.state.valid ? "green" : "plain"} />
        </Button>
        <Button onClick={this.props.onClick}>
          <StatusCritical color={this.state.invalid ? "red" : "plain"} />
        </Button>
      </Box>
    );
  }
}

export default AddedDate;
