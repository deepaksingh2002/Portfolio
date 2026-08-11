import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  activeSection: string;
  mobileMenuOpen: boolean;
  projectFilter: string;
  isScrolled: boolean;
}

const initialState: UIState = {
  activeSection: 'hero',
  mobileMenuOpen: false,
  projectFilter: 'All',
  isScrolled: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    setProjectFilter: (state, action: PayloadAction<string>) => {
      state.projectFilter = action.payload;
    },
    setScrolled: (state, action: PayloadAction<boolean>) => {
      state.isScrolled = action.payload;
    },
  },
});

export const {
  setActiveSection,
  toggleMobileMenu,
  closeMobileMenu,
  setProjectFilter,
  setScrolled,
} = uiSlice.actions;
export default uiSlice.reducer;
