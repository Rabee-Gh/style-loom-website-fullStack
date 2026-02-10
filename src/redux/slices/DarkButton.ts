import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
    mode: 'light' | 'dark';
}
const initialState = (): ThemeState => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') return { mode: 'dark' };
    if (savedTheme === 'light') return { mode: 'light' };;

    localStorage.setItem('theme', 'dark');
    return { mode: 'dark' };
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark';
            const root = document.documentElement;
            if (state.mode === 'dark') {
                root.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                root.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        },
        setTheme: (state, action) => {
            state.mode = action.payload;
        }
    }
})
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;