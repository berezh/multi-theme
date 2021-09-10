export const setCustomProperties = (
    elementStyle: CSSStyleDeclaration | undefined,
    properties: Record<string, string | undefined>
) => {
    if (elementStyle) {
        const styleNames = Object.keys(properties);
        for (const styleName of styleNames) {
            const styleValue = properties[styleName];
            const propertyName = `--${styleName}`;

            if (typeof styleValue === 'string' || typeof styleValue === 'number') {
                elementStyle.setProperty(propertyName, styleValue);
            } else {
                elementStyle.removeProperty(propertyName);
            }
        }
    }
};
