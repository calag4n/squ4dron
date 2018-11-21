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
import {
  FormClose,
  Notification
} from "grommet-icons";
import { grommet } from "grommet/themes";
import MyDate from '../components/date';

if(typeof document !== "undefined")
  document.body.style.margin = 0;


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
  state = {
    showSidebar: false,
  };

  onSelect = nextDate => {
    const { date } = this.state;

    this.setState({ date: nextDate !== date ? nextDate : undefined });
  };

  render() {
    const { showSidebar } = this.state;
    const { date } = this.state;


    return (
      <Grommet theme={grommet} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level="3" margin="none">
                  My App
                </Heading>
                <Button
                  icon={<Notification />}
                  onClick={() =>
                    this.setState({ showSidebar: !this.state.showSidebar })
                  }
                />
              </AppBar>
              <Box direction="row" flex>
                <Box flex align="center" justify="start"> {/* app body */}
                  <Calendar
                    date={date?date:"2019-05-01"}
                    onSelect={this.onSelect}
                    size="medium"
                    bounds={["2018-11-01", "2019-09-30"]}
                    margin={{vertical: "large"}}
                    firstDayOfWeek={1}
                    locale="fr-FR"
                    reference="2018-12"
                  />
                  <MyDate/>
                  
                  <Box
                    
                  >
                    
                    
                    {/* <MyDate/> */}
                  </Box>
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
