
export let darkMode: string;

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    darkMode = 'dark'
} else {
    darkMode = 'light'
}

export const toggle = () => {
    darkMode = darkMode ? 'dark' : 'light'
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
}