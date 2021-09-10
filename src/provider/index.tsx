import React, { useEffect, createContext, useMemo, useContext } from 'react';

import { setCustomProperties } from './set-custom-properties';

export { setCustomProperties };

export interface ThemeContextProps {
    theme: string;
    style: Record<string, string | undefined>;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'default',
    style: {},
});

interface Props {
    theme: string;
    styles: Record<string, Record<string, string | undefined>>;
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

        setCustomProperties(elementStyle, themeStyle);
    }, [themeStyle, elementRef]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
    return useContext(ThemeContext);
};
