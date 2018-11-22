import React, { Component } from "react";
import { Box, Button } from "grommet";
import { StatusGood } from "grommet-icons";

class AddedDate extends Component {
  state = {
    valid: false
  };

  validate = ()  => {
    this.setState({ valid: !this.state.valid });
    console.log(this.state.valid);
  }

 

  render() {
    return (
      <Box width="40%" direction="row" justify="between" valid={this.state.valid}>
        {this.props.store}
        {"   "}
        <Button onClick={this.validate} >
          <StatusGood color={this.state.valid ? "green" : "plain"} />
        </Button>
      </Box>
    );
  }
}

export default AddedDate;
