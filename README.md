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
    backgroundActive={'green'}
    backgroundInactive={'gray'}
    circleActiveColor={'#30a566'}
    circleInActiveColor={'#000000'}
  />
)
```
### Switch
![switch](https://cloud.githubusercontent.com/assets/13334788/19770557/c1d935ee-9c70-11e6-931e-8812fbe62774.gif)
