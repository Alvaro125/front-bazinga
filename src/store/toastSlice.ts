import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface PostProps {
  comments: Array<{
    _id: string;
    content: string;
    create_at: string;
    id_creator: {
      _id: string;
      name: string;
      nick: string;
      avatar: string;
    };
  }>;
  content: string;
  create_at: string;
  img: string;
  id_creator: {
    _id: string;
    name: string;
    nick: string;
    avatar: string;
  };
  likes: string[];
  __v: number;
  _id: string;
}
export interface ToastState {
  error: true;
}

const initialState: ToastState = {
  showComments: false,
  posts: []
};

export const toastSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    show: (state) => {
      state.showComments = true;
    }
  },
});

// Action creators are generated for each case reducer function
export const { show, hidden,review } = toastSlice.actions;

export default postSlice.reducer;
