import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { wp } from "@/lib/utils";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { theme } from "@/constants/theme";
import { apiCall } from "@/api";
import ImageGrid from "@/components/imageGrid";
import { debounce } from "lodash";
import { useGetImagesQuery } from "@/services/imageApi";
import { useAppSelector } from "@/hooks/hooks";
import { router } from "expo-router";
import { ImageType } from "@/types/data";

let page = 1;
type ParamsType = {
  page: number;
  q?: string;
};
const HomePage = () => {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState<ImageType[]>([]);
  const [isEndReached, setIsEndReached] = useState(false);
  const [newPage, setNewPage] = useState(1);
  const searchInputRef = useRef<TextInput>();
  const scrollRef = useRef<ScrollView>();
  const { token, isAuthenticated } = useAppSelector((state) => state.auth);

  // I haven't succeeded to infinit scroll using rtk query. the problem is that it doesn't fetch the next page.
  // const { data } = useGetImagesQuery({ key: token, search, page: newPage });
  // console.log()

  const fetchImages = async (
    params: ParamsType = { page: 1 },
    append = true
  ) => {
    const res = await apiCall(params);
    if (res && res.hits.length > 0) {
      if (append) {
        setImages((prev) => [...prev, ...res.hits]);
      } else {
        setImages(res.hits);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  const handleScroll = (event: any) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;

    if (scrollOffset >= bottomPosition - 1) {
      if (!isEndReached) {
        setIsEndReached(true);
        ++page;
        let params: ParamsType = {
          page,
        };
        setNewPage((prev) => prev + 1);
        if (search) {
          params.q = search;
        }
        fetchImages(params, true);
      }
    } else {
      setIsEndReached(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.length > 0) {
      setImages([]);
      fetchImages({ page: 1, q: value });
    } else {
      setImages([]);
      searchInputRef?.current?.clear();
      fetchImages({ page: 1 });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);
  const handleToTop = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleToTop}>
          <Text style={styles.title}>Pixabay</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ gap: 10 }}
        onScroll={handleScroll}
        scrollEventThrottle={5}
        ref={scrollRef as any}
      >
        {/* search bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather name="search" size={24} color="black" />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search photos"
            placeholderTextColor="gray"
            ref={searchInputRef as any}
            onChangeText={handleTextDebounce}
          />
          {search && (
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => handleSearch("")}
            >
              <EvilIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>

        {/* images */}
        <View>{images.length > 0 && <ImageGrid images={images} />}</View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  header: {
    marginHorizontal: wp(4),
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: 8,
    paddingLeft: 12,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,

    borderRadius: theme.radius.md,
  },
  closeIcon: {
    padding: 8,
    backgroundColor: theme.colors.neutral(0.1),
    borderRadius: theme.radius.xs,
  },
});
