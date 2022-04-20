# multi-theme

Multi theme solution based on [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

---

<a href="https://www.npmjs.com/package/multi-theme">
    <img src="https://nodei.co/npm/multi-theme.png?mini=true"/>
</a>

[DEMO](https://varp.com/multi-theme)

---

## install

```tsx
npm i multi-theme
```

## Glossary

- [Usage](#Usage)
- [ThemeProvider](#ThemeProvider) 
- [useTheme](#useTheme)
## Usage

```js
/* 1. Set up provider */

import { ThemeProvider } from 'multi-theme';

...

/* 2. Define all styles container */
const styles = {
    light: {
        fontColor: '#000000', // => '--fontColor'
        backgroundColor: '#ffffff' // => '--backgroundColor'
    },
    dark: {
        fontColor: '#ffffff', // => '--fontColor'
        backgroundColor: '#000000' // => '--backgroundColor'
    }
}

/* 3. Set up locale name */
<ThemeProvider theme="light" styles={styles}>
/* App */
</ThemeProvider>

```

```scss
/* 4. Define styles using CSS Custom Properties. Names should be equal to container's properties */
.container {
    color: var(--fontColor);
    background-color: var(--backgroundColor);
}
```

## ThemeProvider

Provider to wrap the application or specific element

| Name           | Description                                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `theme`        | Theme name                                                                                                             |
| `defaultTheme` | Default theme name, means that if current theme does not have a value for specific style the default one will be used. |
| `styles`       | Theme style container                                                                                                  |
| `elementRef`   | Reference to element where provider will be applied                                                                    |

## useTheme

Hook to access theme context properties.

```tsx
import { useTheme } from 'multi-theme';

...

const { theme, style } = useTheme();
```

| Name    | Description        |
| ------- | ------------------ |
| `theme` | Current theme name |
| `style` | Curent style set   |
