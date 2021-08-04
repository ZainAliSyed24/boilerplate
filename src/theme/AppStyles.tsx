//
//  AppStyles.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:47:42 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { StyleSheet } from "react-native";
import Metrics from "./Metrics";

export default StyleSheet.create({
	flex: {
		flex: 1
	},
	htmlContainer: {
		marginTop: -Metrics.doubleBaseMargin,
		paddingBottom: Metrics.doubleBaseMargin
	},
	textCenter: {
		textAlign: "center"
	},
	centerAligned: {
		alignItems: "center",
		justifyContent: "center"
	},
	percent100: {
		width: "100%",
		height: "100%"
	},
	flexRow: {
		flexDirection: "row"
	},
	iconTabBar: {
		width: 28,
		height: 28
	}
});
