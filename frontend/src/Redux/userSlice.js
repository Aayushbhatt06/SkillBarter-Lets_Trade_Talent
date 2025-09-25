import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: null,
  email: null,
  image: null,
  skills: [],
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { id, name, email, image, skills } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.image = image;
      state.skills = skills;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      Object.assign(state, initialState);
    },
    updateUser: (state, action) => {
      const { id, name, email, image, skills } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.image = image;
      state.skills = skills;
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
