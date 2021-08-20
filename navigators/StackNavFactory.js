import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Feed from "../screens/Feed";
import Me from "../screens/Me";
import Notifications from "../screens/Notifications";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import { Image } from "react-native";

const Stack = createStackNavigator();

export default function StackNavFactory({ screenName }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: "screen",
                headerBackTitleVisible: false,
                headerTintColor: "white",
                headerStyle: {
                    borderBottomColor: "rgba(255, 255, 255, 0.3)",
                    shadowColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor: "black",
                },
            }}
        >
            {screenName === "Feed" ? (
                <Stack.Screen
                    name={"FeedStack"}
                    component={Feed}
                    options={{
                        headerTitle: () => (
                            <Image
                                style={{
                                    maxWidth: 120,
                                    maxHeight: 80,
                                }}
                                resizeMode="contain"
                                source={require("../assets/logo.png")}
                            />
                        )
                    }}
                />
            ) : null}
            {screenName === "Search" ? (
                <Stack.Screen name={"SearchStack"} component={Search} />
            ) : null}
            {screenName === "Notifications" ? (
                <Stack.Screen name={"Notifications"} component={Notifications} />
            ) : null}
            {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Photo" component={Photo} />
        </Stack.Navigator>
    );
};