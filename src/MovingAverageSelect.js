import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormLabel from "@material-ui/core/FormLabel";

const styles = {
  maLabel: {
    whiteSpace: "nowrap",
    color: "222",
  },
};

class MovingAverageSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maSelected: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fiftyIsChecked, twoHundredIsChecked } = this.props;
    let maSelected = [];
    if (fiftyIsChecked) maSelected.push("50");
    if (twoHundredIsChecked) maSelected.push("200");
    this.setState({ maSelected: maSelected });
  }

  handleChange(event) {
    this.setState({
      maSelected: event.target.value,
    });
    this.props.handleMaCheck(event);
  }

  getSelectValue() {
    const { fiftyIsChecked, twoHundredIsChecked } = this.props;
    if (fiftyIsChecked && twoHundredIsChecked) {
      return "50-day, 200-day";
    } else if (fiftyIsChecked) {
      return "50-day";
    } else if (twoHundredIsChecked) {
      return "200-day";
    }
    return "";
  }

  render() {
    const { classes, fiftyIsChecked, twoHundredIsChecked } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl>
          <FormLabel
            htmlFor="maOptions"
            className={classes.maLabel}
            component="legend"
          >
            Moving Average
          </FormLabel>

          <Select
            multiple
            value={this.state.maSelected}
            onChange={this.handleChange}
            input={<Input id="maOptions" />}
            renderValue={(maSelected) => maSelected.join(", ")}
          >
            <MenuItem value="50">
              <Checkbox value="50" checked={fiftyIsChecked} />
              <ListItemText primary="50-day" />
            </MenuItem>
            <MenuItem value="200">
              <Checkbox value="200" checked={twoHundredIsChecked} />
              <ListItemText primary="200-day" />
            </MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(MovingAverageSelect);
