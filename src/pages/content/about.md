---
templateKey: 'about-page'
path: /about
title: About Dynamic Pages
subtitle: This is front the subtitle field, inserted in the template
---
The content folder is where all your information lives.

You can create markdown files in here and use that data in other pages.

The `templateKey` field above tells Gatsby which template in your `src/templates` folder to use when turning this markdown file into an actual page.

You might just want to use dynamic pages for blog posts anyways and not use markdown files for other pages. To just create normal pages, you can do things like in `src/pages/page-2.js`.
