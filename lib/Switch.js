import React, { Component, PropTypes } from 'React';
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
	}
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
	  	transformSwitch: new Animated.Value(props.value ? 17: -22),
			backgroundColor: new Animated.Value(props.value ? 75 : -75),
			circleColor: new Animated.Value(props.value ? 75 : -75)
	  };

		this.handleSwitch = this.handleSwitch.bind(this);
		this.animateSwitch = this.animateSwitch.bind(this);
	}

	handleSwitch() {
		const { value } = this.state;
		const { onValueChange, disabled } = this.props;
		if (disabled) {
			return;
		}

		console.log('switch');
		this.animateSwitch(!value, () => {
			this.setState({ value: !value }, () => onValueChange(this.state.value));
		});
	}

	animateSwitch(value, cb = () => {}) {
		const { backgroundActive, backgroundInActive} = this.props;

		Animated.parallel([
			Animated.spring(this.state.transformSwitch, {
				toValue: value ? 17: -22,
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
		]).start(cb)
	}

	render() {
		const {
			transformSwitch,
			backgroundColor,
			circleColor,
		} = this.state;

		const {
			onValueChange,
			backgroundActive,
			backgroundInactive,
			circleActiveColor,
			circleInActiveColor,
			activeText,
			inActiveText
		} = this.props;

		const interpolatedColorAnimation = backgroundColor.interpolate({
        inputRange: [-75, 75],
      	outputRange: [backgroundInactive, backgroundActive]
    });

		const interpolatedCircleColor = circleColor.interpolate({
			inputRange: [-75, 75],
			outputRange: [circleInActiveColor, circleActiveColor]
		})
		return (
			<TouchableWithoutFeedback
				onPress={this.handleSwitch}
			>
				<Animated.View
					style={[
						styles.container,
						{ backgroundColor: interpolatedColorAnimation }
					]}
				>
					<Animated.View
						style={[
							styles.animatedContainer,
							{ transform: [{ translateX: transformSwitch }] },
						]}
					>
						<Text style={[styles.text, styles.inactiveText, styles.paddingRight]}>
							{activeText}
						</Text>
						<Animated.View style={[styles.circle, { backgroundColor: interpolatedCircleColor }]} />
						<Text style={[styles.text, styles.active, styles.paddingLeft]}>
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
