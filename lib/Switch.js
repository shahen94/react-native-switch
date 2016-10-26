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
		activeText: PropTypes.string,
		inActiveText: PropTypes.string,
		backgroundActive: PropTypes.string,
		backgroundInactive: PropTypes.string,
		active: PropTypes.bool.isRequired
	}
	static defaultProps = {
		activeText: 'On',
		inActiveText: 'Off',
		backgroundActive: 'green',
		backgroundInactive: 'gray',
	};
	constructor(props, context) {
	  super(props, context);

	  this.state = {
	  	active: props.active,
	  	transformSwitch: new Animated.Value(props.active ? 2 : -40),
			backgroundColor: new Animated.Value(props.active ? 75 : -75)
	  };
	  this.handleMove = this.handleMove.bind(this);
	  this.handleRelease = this.handleRelease.bind(this);
	  this.handleSwitch = this.handleSwitch.bind(this);
	  this.animateSwitch = this.animateSwitch.bind(this);

	  this.panResponder = null;

	}

	componentWillMount() {
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
			onPanResponderGrant: () => console.log('granted'),
			onPanResponderMove: () => this.handleMove,
			onPanResponderRelease: () => this.handleRelease,
			onPanResponderTerminationRequest: () => true,
			onPanResponderTerminate: () => this.handleRelease,
		});
	}

	componentDidMount() {
		const { active } = this.state;
		// if (active) {
		// 	this.state.transformSwitch.setValue(-20);
		// } else {
		// 	this.state.transformSwitch.setValue(20);
		// }
	}

	handleMove(e, gestureState) {
		return Animate.event([null, {
			dx: this.state.transformSwitch
		}])(e, gestureState);
	}
	handleRelease() { console.log('release') }
	handleSwitch() {
		const { active } = this.state;
		const { onSwitch } = this.props;
		this.animateSwitch(!active, () => {
			this.setState({ active: !active }, onSwitch);
		});
	}

	animateSwitch(active, cb = () => {}) {
		const { backgroundActive, backgroundInactive } = this.props;
		Animated.parallel([
			Animated.spring(this.state.transformSwitch, {
				toValue: active ? 2: -40,
				duration: 200
			}),
			Animated.timing(this.state.backgroundColor, {
				toValue: active ? 75 : -75,
				duration: 200
			})
		])
		.start(cb);
	}

	render() {
		const { transformSwitch, active, backgroundColor } = this.state;
		const {
			onSwitch,
			backgroundActive,
			backgroundInactive,
			activeText,
			inActiveText
		} = this.props;

		const interpolatedColorAnimation = backgroundColor.interpolate({
        inputRange: [-75, 75],
      	outputRange: [backgroundInactive, backgroundActive]
    });
		return (
			<TouchableWithoutFeedback
				onPress={this.handleSwitch}
			>
				<Animated.View style={[styles.container, { backgroundColor: interpolatedColorAnimation }]}>
					<Animated.View
						style={[
							styles.animatedContainer,
							{ transform: [{ translateX: transformSwitch }] },
						]}
					>
						<Text style={[styles.text, styles.inactiveText]}>
							{activeText}
						</Text>
						<View style={styles.circle} {...this.panResponder.panHandlers} />
						<Text style={[styles.text, styles.active]}>
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
		width: 70,
		height: 30,
		borderRadius: 30,
		backgroundColor: 'black',
		overflow: 'hidden'
	},
	animatedContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'rgb(100, 100, 100)',
		// paddingHorizontal: 10,
	},
	text: {
		color: 'white',
		paddingHorizontal: 10,
		backgroundColor: 'transparent'
	}
});
