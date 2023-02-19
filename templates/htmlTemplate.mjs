

export default function renderHTML(content, css) {
  return `
<html>
  <head>
    <style>
      ${css}
      .markdown-body {
        padding: 80px;
        max-width: 1000px;
        margin: 0 auto;

        --color-accent-fg: #00f;
      }
    </style>
  </head>
  <body class="markdown-body">
      ${content}
  </body>
</html>`;
}