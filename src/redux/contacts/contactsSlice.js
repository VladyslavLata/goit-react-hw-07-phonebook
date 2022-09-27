import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addNewContact, deleteContact } from './operations';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null, filter: '' },
  reducers: {
    filter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    [fetchContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addNewContact.pending]: state => {
      state.isLoading = true;
    },
    [addNewContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items.unshift(action.payload);
    },
    [addNewContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteContact.pending]: state => {
      state.isLoading = true;
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      const contactIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );
      state.items.splice(contactIndex, 1);
    },
    [deleteContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { filter } = contactsSlice.actions;
