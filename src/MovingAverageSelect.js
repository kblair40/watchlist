import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormLabel from "@material-ui/core/FormLabel";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const styles = {
  root: {
    color: "#4d5964",
    "&$inputFocused": {
      backgroundColor: "#fff",
      color: "#4d5964",
    },
  },
  inputFocused: {},
  labelRoot: {
    color: "#000714",
    "&$labelFocused": {
      color: "#000714",
    },
  },
  labelFocused: {},
  underline: {
    borderBottom: "1px solid #24303a",
    "&:after": {
      borderBottom: "1px solid #24303a",
    },
  },
  checkboxText: {
    color: "#4d5964",
  },
  checkboxRoot: {
    color: "#24303a",
    backgroundColor: "transparent",
    "&$checkboxChecked": {
      color: "#24303a",
    },
  },
  checkboxChecked: {},
  checkedStyles: {
    color: "#4d5964",
    // backgroundColor: "red",
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
      <div className={classes.root}>
        <FormControl>
          <FormLabel
            classes={{
              root: classes.labelRoot,
              focused: classes.labelFocused,
            }}
            htmlFor="maOptions"
            component="legend"
          >
            Moving Average
          </FormLabel>

          <Select
            multiple
            value={this.state.maSelected}
            onChange={this.handleChange}
            input={
              <Input
                classes={{
                  root: classes.root,
                  underline: classes.underline,
                  focused: classes.inputFocused,
                }}
                id="maOptions"
              />
            }
            renderValue={(maSelected) => maSelected.join(", ")}
          >
            <MenuItem value="50">
              <Checkbox
                checkedIcon={<CheckBoxIcon className={classes.checkedStyles} />}
                classes={{
                  root: classes.checkboxRoot,
                  checked: classes.checkboxChecked,
                }}
                value="50"
                checked={fiftyIsChecked}
              />
              <ListItemText className={classes.checkboxText} primary="50-day" />
            </MenuItem>
            <MenuItem value="200">
              <Checkbox
                checkedIcon={<CheckBoxIcon className={classes.checkedStyles} />}
                classes={{
                  root: classes.checkboxRoot,
                  checked: classes.checkboxChecked,
                }}
                value="200"
                checked={twoHundredIsChecked}
              />
              <ListItemText
                className={classes.checkboxText}
                primary="200-day"
              />
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(MovingAverageSelect);
