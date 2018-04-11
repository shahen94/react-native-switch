# react-native-switch
Customisable switch component for RN

### Installation

```sh
$ npm install --save react-native-switch
```
or

```sh
yarn add react-native-switch
```

### Usage

```javascript
import { Switch } from 'react-native-switch';

export const App = () => (
  <Switch
    value={true}
    onValueChange={(val) => console.log(val)}
    disabled={false}
    activeText={'On'}
    inActiveText={'Off'}
    circleSize={30}
    barHeight={1}
    circleBorderWidth={3}
    backgroundActive={'green'}
    backgroundInactive={'gray'}
    circleActiveColor={'#30a566'}
    circleInActiveColor={'#000000'}
    changeValueImmediately={true}
    renderInsideCircle={() => <CustomComponent />}
    changeValueImmediately: true // if rendering inside circle, change state immediately or wait for animation to complete
    innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle
    outerCircleStyle={{}} // style for outer animated circle
    renderActiveText={false}
    renderInActiveText={false}
  />
)
```
### Switch
![switch](https://cloud.githubusercontent.com/assets/13334788/19770557/c1d935ee-9c70-11e6-931e-8812fbe62774.gif)
