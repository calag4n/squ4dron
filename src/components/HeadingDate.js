import { Box, Button } from "grommet";
import { StatusGood } from "grommet-icons";
import React, { Component } from "react";
import { Grommet } from "grommet";

class HeadingDate extends Component {
  state = { valid: false };

  render() {
    return (
      <Grommet>
        <Box
          flex
          margin="normal"
          direction="row"
          justify="center"
          // justify="center"
          gap="small"
          valid={this.state.valid}
          border={this.props.border}
          isDateExist={this.props.isDateExist}
        >
          <h2>{this.props.store}</h2>
          {"  "}
          <Button onClick={this.props.onClick}  >
            <StatusGood color={this.props.isDateExist ? "green" : "plain"} />
          </Button>
        </Box>
      </Grommet>
    );
  }
}

export default HeadingDate;
