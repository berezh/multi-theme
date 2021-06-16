import React, { useEffect, createContext, useMemo, useContext } from 'react';

export interface ThemeContextProps {
    theme: string;
    style: Record<string, React.ReactText>;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'default',
    style: {},
});

interface Props {
    theme: string;
    styles: Record<string, Record<string, React.ReactText>>;
    children: React.ReactNode;
    defaultTheme?: string;
}

export const ThemeProvider: React.FC<Props> = ({ theme, styles, children, defaultTheme }) => {
    const themeStyle = useMemo(() => {
        return { ...(styles[theme] || {}), ...(defaultTheme ? styles[defaultTheme] || {} : {}) };
    }, [styles, theme, defaultTheme]);

    const value = useMemo<ThemeContextProps>(() => {
        return {
            theme,
            style: themeStyle,
        };
    }, [theme, themeStyle]);

    useEffect(() => {
        if (document) {
            const styleNames = Object.keys(themeStyle);
            for (const styleName of styleNames) {
                const styleValue = themeStyle[styleName];
                document.documentElement.style.setProperty(`--${styleName}`, `${styleValue}`);
            }
        }
    }, [theme, defaultTheme, styles, themeStyle]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
    return useContext(ThemeContext);
};
