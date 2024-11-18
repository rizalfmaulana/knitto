import { ImageType } from "@/types/data";
import { createSlice } from "@reduxjs/toolkit";

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmark: [] as ImageType[],
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
