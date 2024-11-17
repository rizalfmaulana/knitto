import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import { getImageSize } from "@/lib/utils";
import { theme } from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { ImageType } from "@/types/data";
import { usePathname } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { addBookmark, removeBookmark } from "@/features/bookmark/bookmarkSlice";
type Props = {
  item: ImageType;
  index: number;
  column: number;
};

const ImageCard = ({ item, index, column }: Props) => {
  const isLastRow = (index + 1) % column === 0;
  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;

    return {
      height: getImageSize(height, width),
    };
  };
  const bookmark = useAppSelector((state) => state.bookmark.bookmark);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  return (
    <View
      style={[
        styles.imageWrapper,
        !isLastRow && styles.spaceRight,
        isLastRow && styles.spaceLeft,
      ]}
    >
      <Image
        source={item?.webformatURL}
        style={[styles.image]}
        transition={100}
      />
      <View style={styles.detail}>
        <View style={styles.user}>
          <Feather style={styles.icon} name="user" size={20} color="black" />
          <Text style={{ fontWeight: "bold" }}>{item?.user}</Text>
        </View>
        <Text>Tags: {item?.tags}</Text>
      </View>

      <View style={styles.action}>
        {pathname.startsWith("/home") && (
          <TouchableOpacity
            onPress={() => {
              dispatch(addBookmark(item));
            }}
            disabled={
              bookmark.findIndex((i) => i.id === item.id) !== -1 && true
            } // check if item is already in bookmark(item)}
            style={[
              styles.mark,
              {
                opacity:
                  bookmark.findIndex((i) => i.id === item.id) !== -1 ? 0.5 : 1,
              },
            ]}
          >
            <Text style={{ fontSize: 12 }}>
              {bookmark.findIndex((i) => i.id === item.id) !== -1
                ? "Bookmarked"
                : "Bookmark"}
            </Text>
          </TouchableOpacity>
        )}
        {pathname.startsWith("/bookmark") && (
          <TouchableOpacity
            style={styles.remove}
            onPress={() => dispatch(removeBookmark(item.id))}
          >
            <Text style={{ fontSize: 12, color: theme.colors.white }}>
              Remove
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  imageWrapper: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    overflow: "hidden",
    marginBottom: 7,
  },
  spaceRight: {
    marginRight: 4,
  },
  spaceLeft: {
    marginLeft: 4,
  },
  detail: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },
  icon: {
    width: 24,
  },
  action: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 12,
  },
  mark: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
  },
  remove: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
  },
});
