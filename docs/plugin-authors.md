# Plugin Authors

## CSS Hooks

Docsify-themeable provides access to individual style values using CSS custom properties (see [Customization](customization) for details). Use these values along with a fallback value to easily specify styles for docsify-themeable as well as docsify's default themes.

```css
.myclass {
  /* Color will be --theme-color for docsify-themeable themes */
  /* Color will be red for other themes */
  color: var(--theme-color, red);
}
```

Docsify-themeable also adds a `themeable` class to the `<html>` element during initialization. This class can be used to create styles that will only be applied when docsify-themeable is used.

```html
<html lang="en" class="themeable"></html>
```

```css
.myclass {
  background: red;
}

/* docsify-themeable (recommended - does not increase specificity) */
:where(.themeable) .myclass {
  background: blue;
}

/* docsify-themeable (increases specificity) */
.themeable .myclass {
  color: blue;
}
```

## JavaScript Hooks

There are several ways to detect if docsify-themeable is being used via JavaScript. The first is to test for the existence of the `themeable` class on the document:

```js
var isThemeable = document.documentElement.classList.contains('themeable');

console.log(isThemeable); // true|false (Boolean)
```

Another way is to check for the existence of a docsify-themeable version in the `$docsify` configuration object. Checking the version is also useful if your plugin's behavior is dependent on the version of docsify-themeable being used.

```js
var themeableVersion = (window.$docsify.themeable || {}).version;
var themeableSemVer = (window.$docsify.themeable || {}).semver;

console.log(themeableVersion); // "<Number>.<Number>.<Number>" (String)
console.log(themeableSemVer); // [<Number>, <Number>, <Number>] (Array)
```
