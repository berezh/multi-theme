import React, { useEffect, createContext, useMemo, useContext } from 'react';

type MultiThemeStyles = { [theme: string]: { [style: string]: React.ReactText } };

export interface ThemeContextProps {
    theme: string;
    styles: MultiThemeStyles;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'default',
    styles: {},
});

interface Props {
    theme: string;
    styles: MultiThemeStyles;
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ theme, styles, children }) => {
    const value = useMemo<ThemeContextProps>(() => {
        return {
            theme,
            styles,
        };
    }, [theme, styles]);

    useEffect(() => {
        if (document) {
            const themeStyles = styles[theme] || {};
            Object.keys(themeStyles).map((style) => {
                const value = themeStyles[style];
                document.documentElement.style.setProperty(`--${style}`, `${value}`);
            });
        }
    }, [theme, styles]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
    return useContext(ThemeContext);
};
