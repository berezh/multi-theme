export const setupStyles = ({
    ref,
    documentNode,
    styles,
}: {
    ref?: React.RefObject<HTMLElement>;
    documentNode?: HTMLElement;
    styles: Record<string, string | undefined>;
}) => {
    const elementStyle: CSSStyleDeclaration | undefined = ref
        ? ref?.current?.style
        : documentNode
        ? documentNode.style
        : document?.documentElement?.style;

    if (elementStyle) {
        const styleNames = Object.keys(styles);
        for (const styleName of styleNames) {
            const styleValue = styles[styleName];
            const propertyName = `--${styleName}`;

            if (typeof styleValue === 'string' || typeof styleValue === 'number') {
                elementStyle.setProperty(propertyName, styleValue);
            } else {
                elementStyle.removeProperty(propertyName);
            }
        }
    }
};
