import React, { useEffect, createContext, useMemo, useContext } from 'react';

export interface ThemeContextProps {
    theme: string;
    style: Record<string, string>;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'default',
    style: {},
});

interface Props {
    theme: string;
    styles: Record<string, Record<string, string>>;
    children: React.ReactNode;
    elementRef?: React.RefObject<HTMLElement>;
    defaultTheme?: string;
}

export const ThemeProvider: React.FC<Props> = ({ theme, styles, children, defaultTheme, elementRef }) => {
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
        const elementStyle: CSSStyleDeclaration | undefined = elementRef
            ? elementRef?.current?.style
            : document?.documentElement?.style;

        if (elementStyle) {
            const styleNames = Object.keys(themeStyle);
            for (const styleName of styleNames) {
                const styleValue = themeStyle[styleName];

                elementStyle.setProperty(`--${styleName}`, styleValue);
            }
        }
    }, [themeStyle, elementRef]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
    return useContext(ThemeContext);
};
