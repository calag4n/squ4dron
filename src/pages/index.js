import React, { Component } from "react";
import {
  Box,
  Button,
  Calendar,
  Collapsible,
  Grommet,
  Heading,
  Layer,
  ResponsiveContext
} from "grommet";
import { FormClose, Notification } from "grommet-icons";
import { grommet } from "grommet/themes";
import AddedDate from "../components/AddedDate";

if (typeof document !== "undefined") document.body.style.margin = 0;

const AppBar = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "100" }}
    {...props}
  />
);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      allDates: []
    };
  }

  onSelect = nextDate => {
    const { date } = this.state;
    this.setState({ date: nextDate !== date ? nextDate : undefined });

    let selectedDate = new Date(nextDate).toLocaleDateString("fr-FR");
    this.setState({ selectedDate });

    const allDates = this.state.allDates;
    const current = allDates.length - 1;
    const newDates = [selectedDate, ...allDates];
    // allDates.concat(selectedDate)
    this.setState({allDates: newDates});

  };

  validate = () => {
    this.setState({ valid: !this.state.valid });
    console.log(this.state.valid);
  };

  render() {
    const { showSidebar } = this.state;
    const { date } = this.state;
    const allDates = this.state.allDates;
    const current = allDates[allDates.length - 1]

    const keptDates = allDates.map((date, index) => {
      const display = date ? date : "Selectionnez une date.";
      return (
        <li 
          key={index}
          style={{width : '100%'}}
        >
          <AddedDate
            store={display}
            onClick={this.validate}
          />
        </li>
      )
    });
    console.log(keptDates);
    return (
      <Grommet theme={grommet} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level="3" margin="none">
                  Entre-Couilles 2019
                </Heading>
                <Button
                  icon={<Notification />}
                  onClick={() =>
                    this.setState({ showSidebar: !this.state.showSidebar })
                  }
                />
              </AppBar>
              <Box direction="row" flex>
                <Box flex align="center" justify="start">
                  {" "}
                  {/* app body */}
                  <Calendar
                    date={date ? date : "2019-05-01"}
                    onSelect={this.onSelect}
                    size="medium"
                    bounds={["2018-11-01", "2019-09-30"]}
                    margin={{ vertical: "large" }}
                    firstDayOfWeek={1}
                    locale="fr-FR"
                    reference="2018-12"
                  />
                  {/* <MyDate/> */}
                  <ul>{keptDates}</ul>
                </Box>
                {!showSidebar || size !== "small" ? (
                  <Collapsible direction="horizontal" open={showSidebar}>
                    <Box
                      flex
                      width="medium"
                      background="light-2"
                      elevation="small"
                      align="center"
                      justify="center"
                    >
                      sidebar
                    </Box>
                  </Collapsible>
                ) : (
                  <Layer>
                    <Box
                      background="light-2"
                      tag="header"
                      justify="end"
                      align="center"
                      direction="row"
                    >
                      <Button
                        icon={<FormClose />}
                        onClick={() => this.setState({ showSidebar: false })}
                      />
                    </Box>
                    <Box
                      fill
                      background="light-2"
                      align="center"
                      justify="center"
                    >
                      sidebar Joe
                    </Box>
                  </Layer>
                )}
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}
export default App;
