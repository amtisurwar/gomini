import { Container, Header, Button, Content, ActionSheet, Text } from "native-base";
var BUTTONS = [
    "Option 0", "Option 1", "Option 2", 
    "Option 0", "Option 1", "Option 2", 
    "Option 0", "Option 1", "Option 2", 
    "Option 0", "Option 1", "Option 2"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
export const MyActionSheet=(props,callback)=>{
    ActionSheet.show(
        {
          options: BUTTONS,
          cancelButtonIndex: null,
          destructiveButtonIndex: null,
          title: "Testing ActionSheet"
        },
        buttonIndex => {
        //   this.setState({ clicked: BUTTONS[buttonIndex] });
        callback(BUTTONS[buttonIndex])
        }
      )
}

