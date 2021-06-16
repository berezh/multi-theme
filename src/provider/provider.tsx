import React, { useEffect, createContext, useMemo, useContext } from 'react';

type ThemeStyles = { [theme: string]: { [style: string]: React.ReactText } };

export interface ThemeContextProps {
    theme: string;
    styles: ThemeStyles;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'default',
    styles: {},
});

interface Props {
    theme: string;
    styles: ThemeStyles;
    children: React.ReactNode;
    defaultTheme: string;
}

export const ThemeProvider: React.FC<Props> = ({ theme, styles, children, defaultTheme }) => {
    const value = useMemo<ThemeContextProps>(() => {
        return {
            theme,
            styles,
        };
    }, [theme, styles]);

    useEffect(() => {
        if (document) {
            const themeStyle = { ...(styles[theme] || {}), ...(styles[defaultTheme] || {}) };
            const styleNames = Object.keys(themeStyle);

            for (const styleName of styleNames) {
                const styleValue = themeStyle[styleName];
                document.documentElement.style.setProperty(`--${styleName}`, `${styleValue}`);
            }
        }
    }, [theme, defaultTheme, styles]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
    return useContext(ThemeContext);
};
