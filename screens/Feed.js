import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Text, TouchableOpacity, View } from "react-native";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { logUserOut } from "../apollo";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;


export default function Feed() {
    const { data } = useQuery(FEED_QUERY);
    console.log(data);
    return (
        <View
            style={{
                backgroundColor: "black",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <TouchableOpacity onPress={() => logUserOut()}>
                <Text style={{ color: "white" }}>Feed</Text>
            </TouchableOpacity>
        </View>
    );
}