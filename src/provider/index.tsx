import React, { useEffect, createContext, useMemo, useContext } from 'react';

interface ThemeContextProps {
    theme: string;
    styles: Record<string, Record<string, React.ReactText>>;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'default',
    styles: {},
});

interface Props {
    theme: string;
    styles: Record<string, Record<string, React.ReactText>>;
    children: React.ReactNode;
    defaultTheme?: string;
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
            const themeStyle = { ...(styles[theme] || {}), ...(defaultTheme ? styles[defaultTheme] || {} : {}) };
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
