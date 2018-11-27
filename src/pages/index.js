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
import HeadingDate from "../components/HeadingDate";

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
      allDates: [],
      dates: []
    };
  }

  onSelect = nextDate => {
    const { date } = this.state;
    this.setState({ date: nextDate !== date ? nextDate : undefined });

    let selectedDate = new Date(nextDate).toLocaleDateString("fr-FR");
    this.setState({ selectedDate });

    console.log(date);
    console.log(this.state.dates);

    console.log(this.state.allDates.indexOf(date));
  };

  validate = () => {
    const { allDates, selectedDate, date, dates } = this.state;

    const newAllDates = [selectedDate, ...allDates];
    const newDates = [date, ...dates];

    this.setState({ allDates: newAllDates, dates: newDates });
  };

  remove = index => {
    const { allDates, dates } = this.state;
    allDates.splice(index, 1);
    dates.splice(index, 1);
    this.setState({allDates: allDates, dates: dates});
  };

  render() {
    const { showSidebar, date, dates, allDates, selectedDate } = this.state;

    const keptDates = allDates.map((date, index) => {
      const display = date ? date : "Selectionnez une date.";
      return (
        <li key={index} style={{ width: "100%" }}>
          <AddedDate
            store={display}
            onClick={() => this.remove(index)}
          />
        </li>
      );
    });

    const dateExist = (dates.indexOf(date) !== -1);

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
                  <Box
                    margin="small"
                    width="100%"
                    justifyContent="between"
                    gap="small"
                  >
                    {!selectedDate ? (
                      <h2>Selectionnez une date.</h2>
                    ) : (
                      <HeadingDate
                        store={selectedDate}
                        isDateExist={dateExist}
                        onClick={this.validate}
                      />
                    )}
                  </Box>
                  <Calendar
                    date={date ? date : "2019-05-01"}
                    dates={this.state.dates}
                    onSelect={this.onSelect}
                    size="medium"
                    bounds={["2018-11-01", "2019-09-30"]}
                    margin={{ vertical: "large" }}
                    firstDayOfWeek={1}
                    locale="fr-FR"
                  />
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
