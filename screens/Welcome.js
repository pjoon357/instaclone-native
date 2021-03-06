import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin: 0 auto;
  margin-top: 20px;
`;

export default function Welcome({ navigation }) {
    const goToCreateAccount = () => navigation.navigate("CreateAccount");
    const goToLogIn = () => navigation.navigate("Login");
    return (
        <AuthLayout>
            <AuthButton
                text="Crate New Account"
                disabled={false}
                onPress={goToCreateAccount}
            />
            <TouchableOpacity onPress={goToLogIn}>
                <LoginLink>Log In</LoginLink>
            </TouchableOpacity>
        </AuthLayout>
    );
}