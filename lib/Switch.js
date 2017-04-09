import React, { Component, PropTypes } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Animated,
	PanResponder,
	TouchableWithoutFeedback
} from 'react-native';

export class Switch extends Component {
	static propTypes = {
		onValueChange: PropTypes.func,
		disabled: PropTypes.bool,
		activeText: PropTypes.string,
		inActiveText: PropTypes.string,
		backgroundActive: PropTypes.string,
		backgroundInactive: PropTypes.string,
		value: PropTypes.bool,
		circleActiveColor: PropTypes.string,
		circleInActiveColor: PropTypes.string,
		activeTextStyle: Text.propTypes.style,
		inactiveTextStyle: Text.propTypes.style,
		containerStyle: View.propTypes.style,
	};

	static defaultProps = {
		value: false,
		onValueChange: () => null,
		disabled: false,
		activeText: 'On',
		inActiveText: 'Off',
		backgroundActive: 'green',
		backgroundInactive: 'gray',
		circleActiveColor: 'white',
		circleInActiveColor: 'white'
	};

	constructor(props, context) {
	  super(props, context);

	  this.state = {
	  	value: props.value,
	  	transformSwitch: new Animated.Value(props.value ? 21 : -21),
			backgroundColor: new Animated.Value(props.value ? 75 : -75),
			circleColor: new Animated.Value(props.value ? 75 : -75)
	  };

		this.handleSwitch = this.handleSwitch.bind(this);
		this.animateSwitch = this.animateSwitch.bind(this);
	}

	componentWillReceiveProps(nextProps) {
	  const { disabled } = this.props;
    if (nextProps.value === this.props.value) {
      return;
    }
    if (disabled) {
      return;
    }

    this.animateSwitch(nextProps.value, () => {
      this.setState({ value: nextProps.value });
    });
	}

	handleSwitch() {
		const { value } = this.state;
		const { onValueChange, disabled } = this.props;
		if (disabled) {
			return;
		}

		this.animateSwitch(!value, () => {
			this.setState({ value: !value }, () => onValueChange(this.state.value));
		});
	}

	animateSwitch(value, cb = () => {}) {
		Animated.parallel([
			Animated.spring(this.state.transformSwitch, {
				toValue: value ? 21 : -21,
				duration: 200
			}),
			Animated.timing(this.state.backgroundColor, {
				toValue: value ? 75 : -75,
				duration: 200
			}),
			Animated.timing(this.state.circleColor, {
				toValue: value ? 75 : -75,
				duration: 200
			})
		]).start(cb);
	}

	render() {
		const {
			transformSwitch,
			backgroundColor,
			circleColor,
		} = this.state;

		const {
			backgroundActive,
			backgroundInactive,
			circleActiveColor,
			circleInActiveColor,
			activeText,
			inActiveText,
			containerStyle,
			activeTextStyle,
			inactiveTextStyle
		} = this.props;

		const interpolatedColorAnimation = backgroundColor.interpolate({
		  inputRange: [-75, 75],
      outputRange: [backgroundInactive, backgroundActive]
		});

    const interpolatedCircleColor = circleColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [circleInActiveColor, circleActiveColor]
		});

    return (
			<TouchableWithoutFeedback
        onPress={this.handleSwitch}
			>
				<Animated.View
          style={[
            styles.container,
            containerStyle,
            { backgroundColor: interpolatedColorAnimation }
          ]}
				>
					<Animated.View
						style={[
							styles.animatedContainer,
							{ transform: [{ translateX: transformSwitch }] },
						]}
					>
						<Text style={[styles.text, styles.inactiveText, styles.paddingRight, activeTextStyle]}>
							{activeText}
						</Text>
						<Animated.View style={[styles.circle, { backgroundColor: interpolatedCircleColor }]} />
						<Text style={[styles.text, styles.active, styles.paddingLeft, inactiveTextStyle]}>
							{inActiveText}
						</Text>
					</Animated.View>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}
// 51 / 31

const styles = StyleSheet.create({
	container: {
		width: 71,
		height: 30,
		borderRadius: 30,
		backgroundColor: 'black',
		// overflow: 'hidden'
	},
	animatedContainer: {
		flex: 1,
		width: 78,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'rgb(100, 100, 100)',
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent'
	},
	paddingRight: {
		paddingRight: 5
	},
	paddingLeft: {
		paddingLeft: 5,
	}
});
