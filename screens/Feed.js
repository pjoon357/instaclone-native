import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { logUserOut } from "../apollo";
import ScreenLayout from "../components/ScreenLayout";
import Photo from "../components/Photo";

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
    const { data, loading, refetch } = useQuery(FEED_QUERY);
    const renderPhoto = ({ item: photo }) => {
        return <Photo {...photo} />;
    };
    const [refreshing, setRefreshing] = useState(false);
    const refresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };
    return (
        <ScreenLayout loading={loading}>
            <FlatList
                refreshing={refreshing}
                onRefresh={refresh}
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
                data={data?.seeFeed}
                keyExtractor={(photo) => "" + photo.id}
                renderItem={renderPhoto}
            />
        </ScreenLayout>
    );
}