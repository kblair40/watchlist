import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Watchlist from "./Watchlist";
import TickerInput from "./TickerInput";
import ChartContainer from "./ChartContainer";
import ChartOptions from "./ChartOptions";
import SummaryCard from "./SummaryCard";
import classNames from "classnames";

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
    padding: ".5rem",
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
    padding: ".3rem",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  customToolbar: {
    display: "flex",
    alignItems: "flex-end",
  },
  drawerContainer: {
    // height: "100%",
  },
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      height: 0,
      appBarWidth: 0,
      drawerHeight: 0,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.calcDimensions = this.calcDimensions.bind(this);
  }

  handleDrawerToggle() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  calcDimensions() {
    let navHeight = document.getElementById("appBar").clientHeight;
    let drawerWidth = document.getElementById("useForDrawerWidth").clientWidth;
    let appBarWidth = document.getElementById("appBar").clientWidth;
    if (this.state.drawerOpen) appBarWidth -= drawerWidth;
    if (
      navHeight !== this.state.height ||
      appBarWidth !== this.state.appBarWidth
    ) {
      // console.log(
      //   "SETTING STATE:",
      //   `\nnavHeight: ${navHeight}`,
      //   `\nappBarWidth: ${appBarWidth}`
      // );
      this.setState({
        height: navHeight,
        appBarWidth: appBarWidth,
      });
    }
  }

  componentDidMount() {
    this.calcDimensions();
    window.addEventListener("resize", this.calcDimensions);
  }

  render() {
    let { data } = { ...this.props };
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
      tickerInput,
    } = this.props;
    const { height, appBarWidth, drawerOpen, drawerHeight } = this.state;
    // console.log("STATE:", appBarWidth);
    const drawer = (
      <div>
        <div className={classes.toolbar} id="useForDrawerWidth" />
        <TickerInput
          handleTickerChange={handleTickerChange}
          addTicker={addTicker}
          tickerInput={tickerInput}
        />
        {/* <Divider /> */}
        <Watchlist
          drawerHeight={drawerHeight}
          handleClick={handleWatchlistClick}
          userTickers={userTickers}
          deleteTicker={deleteTicker}
          plotData={plotData}
        />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar
          id="appBar"
          color="default"
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar className={classes.customToolbar}>
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
                appBarWidth={appBarWidth}
                handleMaCheck={handleMaCheck}
                fiftyIsChecked={fiftyIsChecked}
                twoHundredIsChecked={twoHundredIsChecked}
                handleTimeframeChange={handleTimeframeChange}
                plotData={plotData}
                ticker={ticker}
                timeframe={timeframe}
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
              open={this.state.drawerOpen}
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
        <main className={classes.content} style={{ top: height - 64 }}>
          <div className={classes.toolbar} />
          <div className={classes.chartArea}>
            <ChartContainer
              navHeight={height}
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
          </div>
          <div className={classes.summary}>
            <SummaryCard ticker={ticker} />
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Navbar);
