

export default function renderHTML(content, css) {
  const cacheBreak = new Date().getTime();
  return `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="https://readme-design-system.netlify.app/transformations/fds-web/rds.css?${cacheBreak}" />
    <script src="https://readme-design-system.netlify.app/transformations/fds-web/icons/fds-widget-web-comp.js?${cacheBreak}"></script>
    <style>
      ${css}
    </style>
    <link rel="stylesheet" href="./assets/styles.css?${cacheBreak}" />
  </head>
  <body class="markdown-body">
      <div class="header">
        <div class="header-content">
        </div>
      </div>
      <div class="markdown-content">
        ${content}
      </div>
  </body>
</html>`;
}