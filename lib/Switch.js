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

	constructor(props, context) {
	  super(props, context);

	  this.state = {
	  	active: props.active,
	  	transformSwitch: new Animated.Value(0)
	  };
	  this.handleMove = ::this.handleMove;
	  this.handleRelease = ::this.handleRelease;
	  this.handleSwitch = ::this.handleSwitch;
	  this.animateSwitch = ::this.animateSwitch;

	  this.panResponder = null;
	}

	componentWillMount() {
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: () => this.handleMove,
			onPanResponderRelease: () => this.handleRelease,
			// onPanResponderTerminationRequest: () => false,
			onPanResponderTerminate: () => this.handleRelease,
		});
	}

	componentDidMount() {
		const { active } = this.state;
		if (active) {
			this.state.transformSwitch.setValue(-75);
		} else {
			this.state.transformSwitch.setValue(75);
		}
	}

	handleMove(e, gestureState) {
		alert('a')
		return Animate.event([null, {
			dx: this.state.transformSwitch
		}])(e, gestureState);
	}
	handleRelease() {}
	handleSwitch() {
		const { active } = this.state;
		const { onSwitch } = this.props;
		this.animateSwitch(!active, () => {
			this.setState({ active: !active }, onSwitch);
		});
	}

	animateSwitch(active, cb = () => {}) {
		Animated.spring(this.state.transformSwitch, {
			toValue: active ? 75 : -75,
			duration: 200
		}).start(cb);
	}

	render() {
		const { transformSwitch, active } = this.state;
		const { onSwitch } = this.props;
		// transformSwitch.setValue(150)
		return (
			<TouchableWithoutFeedback
				onPress={this.handleSwitch}
				{...this.panResponder.panHandlers}
			>
				<View style={styles.container}>
					<Animated.View
						style={[
							styles.animatedContainer,
							{ transform: [{ translateX: transformSwitch }] }
						]}
					>
						<Text style={[styles.text, styles.inactiveText]}>
							Off
						</Text>
						<View style={styles.circle} />
						<Text style={[styles.text, styles.active]}>
							On
						</Text>
					</Animated.View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		width: 200,
		height: 50,
		borderRadius: 30,
		backgroundColor: 'black'
	},
	animatedContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	circle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'rgb(100, 100, 100)',
		paddingHorizontal: 10,
	},
	text: {
		color: 'white',
		paddingHorizontal: 10,
		backgroundColor: 'transparent'
	}
});
