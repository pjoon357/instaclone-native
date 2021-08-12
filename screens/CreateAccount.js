import React, { useRef } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function CreateAccount() {
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onDone = () => {
        alert("done!");
    };
    return (
        <AuthLayout>
            <TextInput
                placeholder="First Name"
                returnKeyType="next"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onSubmitEditing={() => onNext(lastNameRef)}
            />
            <TextInput
                ref={lastNameRef}
                placeholder="Last Name"
                returnKeyType="next"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onSubmitEditing={() => onNext(usernameRef)}
            />
            <TextInput
                ref={usernameRef}
                placeholder="Username"
                returnKeyType="next"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onSubmitEditing={() => onNext(emailRef)}
            />
            <TextInput
                ref={emailRef}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onSubmitEditing={() => onNext(passwordRef)}
            />
            <TextInput
                ref={passwordRef}
                placeholder="Password"
                secureTextEntry
                returnKeyType="done"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onSubmitEditing={onDone}
            />
            <AuthButton text="Create Account" disabled={true} onPress={() => null} />
        </AuthLayout>
    );
}