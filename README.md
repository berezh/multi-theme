# multi-theme

<a href="https://www.npmjs.com/package/multi-theme">
    <img src="https://nodei.co/npm/multi-theme.png?mini=true"/>
</a>


Multi theme support for react based on [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

[Demo](https://varp.com/multi-theme)

---

## ThemeProvider

Installation

```tsx
import { ThemeProvider } from 'multi-theme';

...

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

<ThemeProvider theme="light" styles={styles}>
/* App */
</ThemeProvider>

```

Use [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) in your styles

```scss
.container {
    color: var(--fontColor);
    background-color: var(--backgroundColor);
}
```

```tsx
<div className="container">
    Multi Theme
</div>
```


## useTheme

Use `useTheme` react hook for getting current theme values


```tsx
import { useTheme } from 'multi-theme';

...

const { theme } = useTheme();
```