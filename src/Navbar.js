import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Watchlist from "./Watchlist";
import TickerInput from "./TickerInput";
import ChartContainer from "./ChartContainer";
import SummaryContainer from "./SummaryContainer";
import ChartOptions from "./ChartOptions";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  optionsContainer: {
    // Pushes login button as far right as possible
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  render() {
    let { data } = { ...this.props };
    console.log("NAVBAR DATA:", data);
    const {
      classes,
      theme,
      fiftyIsChecked,
      twoHundredIsChecked,
      fiftyPrice,
      twoHundredPrice,
      dataMin,
      dataMax,
      plotData,
      addTicker,
      handleTickerChange,
      handleWatchlistClick,
      userTickers,
      deleteTicker,
      ticker,
      timeframe,
      handleMaCheck,
      handleTimeframeChange,
    } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <TickerInput
          handleTickerChange={handleTickerChange}
          addTicker={addTicker}
        />
        <Divider />
        <Watchlist
          handleClick={handleWatchlistClick}
          userTickers={userTickers}
          deleteTicker={deleteTicker}
          plotData={plotData}
        />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar color="default" position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.optionsContainer}>
              <ChartOptions
                handleMaCheck={handleMaCheck}
                fiftyIsChecked={fiftyIsChecked}
                twoHundredIsChecked={twoHundredIsChecked}
                handleTimeframeChange={handleTimeframeChange}
                plotData={plotData}
              />
            </div>

            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <ChartContainer
            data={data}
            fiftyIsChecked={fiftyIsChecked}
            twoHundredIsChecked={twoHundredIsChecked}
            fiftyPrice={fiftyPrice}
            twoHundredPrice={twoHundredPrice}
            ticker={ticker}
            dataMin={data ? parseFloat(dataMin.toFixed(2)) : null}
            dataMax={data ? parseFloat(dataMax.toFixed(2)) : null}
            timeframe={timeframe}
          />
          <SummaryContainer ticker={ticker} />
        </main>
      </div>
    );
  }
}

// Navbar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   // Injected by the documentation to work in an iframe.
//   // You won't need it on your project.
//   container: PropTypes.object,
//   theme: PropTypes.object.isRequired,
// };

export default withStyles(styles, { withTheme: true })(Navbar);
