
# Options

## readyTransition

- Type: `boolean`
- Default: `true`

Determines if a loading indicator will be displayed while waiting for the site to initialize, and if a fade transition will be used after initialization is complete.

**Example**

```javascript
window.$docsify = {
  // ...
  themeable: {
    readyTransition: true // default
  }
}
```

## responsiveTables

- Type: `boolean`
- Default: `true`

Determines if `<table>` elements will be displayed as responsive tables on smaller screens.

When `true`, the `<table>` layout will be adjusted on smaller screens to display a single heading and value on each row, allowing the table to flow vertically instead of horizontally. This prevents users from having to scroll horizontally to see table data, making the table data easier to read. When `false`, `<table>` elements will be displayed as they are on larger screens, with a horizontal scrollbar if necessary.

**Example**

```javascript
window.$docsify = {
  // ...
  themeable: {
    responsiveTables: true // default
  }
}
```
