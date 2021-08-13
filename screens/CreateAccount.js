import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount($firstName: String!, $lastName: String,$username: String!, $email: String!, $password: String!){
        createAccount(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password){
            ok
            error
        }
    }
`;

export default function CreateAccount({ navigation }) {
    const { register, handleSubmit, setValue, getValues, watch } = useForm();
    const onCompleted = (data) => {
        const { createAccount: { ok } } = data;
        const { username, password } = getValues();
        if (ok) {
            navigation.navigate("Login", {
                username,
                password,
            });
        }
    };
    const [createAccountMutation, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    })
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const onValid = (data) => {
        if (!loading) {
            createAccountMutation({
                variables: {
                    ...data,
                }
            })
        }
    };

    useEffect(() => {
        register("firstName", {
            required: true
        });
        register("lastName", {
            required: true
        });
        register("username", {
            required: true
        });
        register("email", {
            required: true
        });
        register("password", {
            required: true
        });
    }, [register])
    return (
        <AuthLayout>
            <TextInput
                placeholder="First Name"
                returnKeyType="next"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onChangeText={(text) => setValue("firstName", text)}
                onSubmitEditing={() => onNext(lastNameRef)}
            />
            <TextInput
                ref={lastNameRef}
                placeholder="Last Name"
                returnKeyType="next"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onChangeText={(text) => setValue("lastName", text)}
                onSubmitEditing={() => onNext(usernameRef)}
            />
            <TextInput
                ref={usernameRef}
                placeholder="Username"
                returnKeyType="next"
                autoCapitalize="none"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onChangeText={(text) => setValue("username", text)}
                onSubmitEditing={() => onNext(emailRef)}
            />
            <TextInput
                ref={emailRef}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                autoCapitalize="none"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onChangeText={(text) => setValue("email", text)}
                onSubmitEditing={() => onNext(passwordRef)}
            />
            <TextInput
                ref={passwordRef}
                placeholder="Password"
                secureTextEntry
                returnKeyType="done"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onChangeText={(text) => setValue("password", text)}
                onSubmitEditing={handleSubmit(onValid)}
            />
            <AuthButton
                text="Create Account"
                disabled={!watch("firstName") || !watch("username") || !watch("email") || !watch("password")}
                onPress={handleSubmit(onValid)}
            />
        </AuthLayout>
    );
}