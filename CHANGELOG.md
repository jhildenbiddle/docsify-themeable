# Change Log

## 0.8.4

*2020.11.06*

- Fix text selection inconsistencies

## 0.8.3

*2020.10.02*

- Add support for docsify's `hideSidebar` option (#55)
- Fix font size of `<code>` elements nested within headings (#56)
- Fix position of headings on scroll events (now flush with top of viewport)
- Update docs to recommend full URL to `docsify.min.js` to avoid 404 errors for
  sourcemaps (#54)

## 0.8.1

*2020.05.02*

- Fix max-width on images
- Update dependencies

## 0.8.0

*2020.02.10*

- Add additional Sass file to npm package (#26)
- Fix zoom image plugin z-index issue introduced in docsify 4.10 (#37)
- Fix table overflow behavior (#38)
- Update dependencies
- Remove sentry.io from website

## 0.7.2

*2019.04.14*

- Fix font weight rendering in Edge 17/18
- Fix `.app-name` shift on sidebar hover (#22)

## 0.7.1

*2019.02.27*

- Fix custom scrollbar styles for moz- and webkit-based based browsers on
  non-macOS platforms

## 0.7.0

*2019.02.21*

- Add `--search-result-item-color` theme property
- Add `--search-result-item-weight` theme property

## 0.6.3

*2019.02.08*

- Fix sidebar toggle in Firefox

## 0.6.2

*2019.01.25*

- Update styles for docsify-copy-code 2.1.x

## 0.6.1

*2019.01.16*

- Add rendered/markdown tabs to Markdown section of website
- Fix font size of paragraph elements following H5 and H6 headings
- Fix Autoprefixr behavior by updating browserslist settings
- Update invisible sidebar left-edge toggle on appearance so it only appears
  on smaller screens
- Update zoom image plugin default overlay color
- Update CDN links to jsDelivr

## 0.6.0

*2018.12.07*

- Add support for docsify's `onlyCover` option
- Add support for full-width landscape presentation for "notched" devices
- Fix search placeholder text vertical centering on Safari (iOS/Mac)

## 0.5.1

*2018.11.09*

- Fix `<th>` center and right alignment

## 0.5.0

*2018.11.01*

- Add conditional loading of plugins based on docsify version
- Add docsify version check before loading `pluginFixSearchResults`
- Add docsify version check before loading `pluginFixZoomImage`
- Update CSS and set seach options to provide compatibility with the new
  `hideOtherSidebarContent` option added to the search plugin in docsify 4.8.0

## 0.4.0

*2018-10-10*

- Add docsify-tabs support and demo
- Add heading level 5-6 styles
- Fix `<small>` line height presentation

## 0.3.0

*2018-08-07*

- Add `--sidebar-nav-pagelink-background-size` property

## 0.2.0

*2018-08-07*

- Update css-vars-ponyfill dependency to address potential issues with
  CSS custom properties in legacy browsers

## 0.1.2

*2018-06-23*

- Update Simple and Simple-Dark themes: Fixed `--notice-tip-border-color`
  value inheriting from `-theme-color`
- Fix high CPU usage in Safari when using Simple or Simple-Dark themes

## 0.1.1

*2018-06-08*

- Update package.json, index.md and README copy
- Update default theme: remove borders from `<table>` and `<kbd>`
- Update simple theme: change `<blockquote>` style to match important/tip style

## 0.1.0

*2018-06-07*

- Initial release
