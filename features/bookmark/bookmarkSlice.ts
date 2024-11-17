import { createSlice } from "@reduxjs/toolkit";

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmark: [
      {
        collections: 421,
        comments: 18,
        downloads: 7727,
        id: 9179598,
        imageHeight: 2081,
        imageSize: 1796294,
        imageWidth: 3121,
        largeImageURL:
          "https://pixabay.com/get/g745d9b4bb5433982a28cda9ca850d54f0f8423b03daead01b988736006177f55ec78d7912b9488d5dd5f02f90fa7523d6891821da238737eaca418a52a3eecb0_1280.jpg",
        likes: 101,
        pageURL:
          "https://pixabay.com/photos/lizard-garden-lizard-tree-garden-9179598/",
        previewHeight: 100,
        previewURL:
          "https://cdn.pixabay.com/photo/2024/11/07/03/12/lizard-9179598_150.jpg",
        previewWidth: 150,
        tags: "lizard, garden lizard, tree",
        type: "photo",
        user: "breaklessbiker",
        userImageURL:
          "https://cdn.pixabay.com/user/2022/10/16/14-43-15-25_250x250.jpg",
        user_id: 27735510,
        views: 9658,
        webformatHeight: 427,
        webformatURL:
          "https://pixabay.com/get/g3a03927c552ca44845043e2cd32b3866544fff2a022b8905e09986b9b7b811a0de043d7f84d0aa143dd1f8461d6132c09d99f2107fd450482dda8325f3094a82_640.jpg",
        webformatWidth: 640,
      },
    ],
  },
  reducers: {
    addBookmark: (state, action) => {
      state.bookmark.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmark = state.bookmark.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
