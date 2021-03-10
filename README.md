# react-native-switch
Customisable switch component for RN and React Native Web

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
    renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
    changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
    innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
    outerCircleStyle={{}} // style for outer animated circle
    renderActiveText={false}
    renderInActiveText={false}
    switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
    switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
    switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
    switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
  />
)
```
### Switch
![switch](https://cloud.githubusercontent.com/assets/13334788/19770557/c1d935ee-9c70-11e6-931e-8812fbe62774.gif)


##
If this project was helpful to you, please <html>
 <a href="https://www.buymeacoffee.com/FnENSxi" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/yellow_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
 </html>
