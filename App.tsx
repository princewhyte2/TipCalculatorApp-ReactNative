import React from "react";
import {
  Provider as PaperProvider,
  TextInput,
  RadioButton,
  Text,
  Button,
} from "react-native-paper";
import { StyleSheet, View, Switch } from "react-native";
import currencyFormatter from "currency-formatter";

export default function App() {
  const [cost, setCost] = React.useState("");
  const [value, setValue] = React.useState(() => "Amazing");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [displayTip, setDisplayTip] = React.useState("");

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const calculateTip = () => {
    let costFloat = parseFloat(cost);
    if (costFloat == NaN) {
      return;
    }
    let tipPercentage;
    switch (value) {
      case "Amazing":
        tipPercentage = 0.2;
        break;
      case "Good":
        tipPercentage = 0.18;
        break;
      default:
        tipPercentage = 0.15;
        break;
    }
    let tip = tipPercentage * costFloat;

    if (isSwitchOn) {
      tip = Math.ceil(tip);
    }
    let val = currencyFormatter.format(tip, { code: "NGN" });

    setDisplayTip(val);
  };
  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          keyboardType="numeric"
          value={cost}
          onChangeText={(cost) => setCost(cost)}
          placeholder="Cost of Service"
        />
        <Text>How was the service?</Text>
        <RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={value}
        >
          <View style={{ width: 200 }}>
            <RadioButton.Item
              position="leading"
              label="Amazing (20%)"
              value="Amazing"
            />
          </View>
          <View style={{ width: 175 }}>
            <RadioButton.Item
              position="leading"
              label="Good (18%)"
              value="Good"
            />
          </View>
          <View style={{ width: 175 }}>
            <RadioButton.Item
              position="leading"
              label="Okay (15%)"
              value="Okay"
            />
          </View>
        </RadioButton.Group>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>Round up tip?</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
        <Button mode="contained" onPress={calculateTip}>
          Calculate
        </Button>

        <View style={{ alignItems: "flex-end" }}>
          <Text>Tip Amount:{displayTip}</Text>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 66,
    marginLeft: 16,
    marginRight: 16,
  },
});
