import { StyleSheet, View } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./imageCard";
import { getColumnCount, wp } from "@/lib/utils";
import { ImageType } from "@/types/data";

type Props = {
  images: ImageType[];
};

const ImageGrid = ({ images }: Props) => {
  const column = getColumnCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={column}
        contentContainerStyle={styles.containerList}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} column={column} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },
  containerList: {
    paddingHorizontal: wp(4),
  },
});
