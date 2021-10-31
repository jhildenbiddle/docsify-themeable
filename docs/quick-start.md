# Quick Start

## HTML Template

The quickest way to get started is by creating an `index.html` file that contains the HTML markup below. This markup contains everything needed for [docsify](https://docsify.js.org/), docsify-themeable, recommended [plugins](https://docsify.js.org/#/plugins), auto light/dark themes, and placeholders for your docsify configuration and custom theme styles.

After copying the template, be sure to complete the following tasks:

1. Create a [homepage](https://docsify.js.org/#/configuration?id=homepage) in the same directory (e.g., `README.md`)
1. Add a description to the `<meta name="description">` tag
1. Add a title to the `<title>` tag
1. Add custom styles to the `<style>` tag
1. Configure [docsify options](https://docsify.js.org/#/configuration) and [docsify-themeable options](options) in the `<script>` tag

!> Note the `@` version number lock in the URLs below. This prevents breaking changes in future releases from affecting your project and is therefore the safest method of loading dependencies from a CDN. When a new major version is released, you will need to manually update your CDN URLs by changing the version number after the @ symbol.

```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no, viewport-fit=cover">
   <meta name="description" content="">
   <title></title>

   <!-- Themes (light + dark) -->
   <link rel="stylesheet" media="(prefers-color-scheme: light)" href="https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple.css">
   <link rel="stylesheet" media="(prefers-color-scheme: dark)" href="https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple-dark.css">

   <!-- Custom Styles -->
   <style>
     :root {
       /* --theme-hue: 325; */
     }
   </style>
</head>
<body>
   <div id="app"></div>

   <script>
     // Docsify Configuration
     window.$docsify = {
       // ..
     };
   </script>

   <!-- Required -->
   <script src="https://cdn.jsdelivr.net/npm/docsify@4/lib/docsify.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/js/docsify-themeable.min.js"></script>

   <!-- Recommended -->
   <script src="https://cdn.jsdelivr.net/npm/docsify@4/lib/plugins/search.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/docsify@4/lib/plugins/zoom-image.min.js"></script>
</body>
</html>
```

## Step-by-step

Existing site owners may prefer to modify their existing `index.html` file using the following steps:

!> Note the `@` version number lock in the URLs below. This prevents breaking changes in future releases from affecting your project and is therefore the safest method of loading dependencies from a CDN. When a new major version is released, you will need to manually update your CDN URLs by changing the version number after the @ symbol.

1. Replace the docsify theme with a docsify-themeable theme from the [Themes](themes) section:

   ```html
   <!-- Theme: Simple -->
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple.css">
   ```

   For automatic light/dark mode support based on the user's operating system preference, specify a light and dark theme with appropriate `media` attribute:

   ```html
   <!-- Theme: Simple (light + dark) -->
   <link rel="stylesheet" media="(prefers-color-scheme: light)" href="https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple.css">
   <link rel="stylesheet" media="(prefers-color-scheme: dark)" href="https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple-dark.css">
   ```

1. Add the docsify-themeable plugin after docsify.js:

   ```html
   <!-- docsify -->
   <script src="https://cdn.jsdelivr.net/npm/docsify@4/lib/docsify.min.js"></script>

   <!-- docsify-themeable -->
   <script src="https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/js/docsify-themeable.min.js"></script>
   ```

1. Review the [Customization](customization) section and set theme properties as needed. For example:

   ```html
   <style>
     :root {
       --theme-hue: 325;
     }
   </style>
   ```

1. Review the docsify-themeable [options](options) section and configure as needed. For example:

   ```html
   <script>
     window.$docsify = {
         // ...
         themeable: {
             readyTransition : true, // default
             responsiveTables: true  // default
         }
     }
   </script>
   ```

## Local Preview

Previewing your site locally requires serving your files from a web server.

The docsify [Quick Start](//docsify.js.org/#/quickstart) guide recommends [docsify-cli](//github.com/QingWei-Li/docsify-cli) for previewing your site:

```bash
# Install docsify-cli globally
npm install -g docsify-cli

# Serve current directory
docsify serve

# Serve ./docs directory
docsify serve docs
```

A simple [Python](https://www.python.org/) web server can also be used and is likely pre-installed with your operating system:

```bash
# Change to site directory
cd /path/to/site/files

# Show Python version
python --version

# Launch web server (Python 2.x)
python -m SimpleHTTPServer

# Launch web server (Python 3.x)
python -m http.server
```

## Hosting

Sites powered by [docsify.js](//docsify.js.org/) can be hosted on any web server. The [docsify website](//docsify.js.org/) provides a helpful [deployment guide](//docsify.js.org/#/deploy) with tips for hosting your site on several platforms.
