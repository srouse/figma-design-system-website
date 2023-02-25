

export default function renderHTML(content, css) {
  return `
<html>
  <head>
    <style>
      ${css}

      :root {
        --primary-color: #A164F9;
      }

      .markdown-body {
        padding: 80px;
        max-width: 1000px;
        margin: 0 auto;

        --color-accent-fg: var( --primary-color );
      }
    </style>
  </head>
  <body class="markdown-body">
      ${content}
  </body>
</html>`;
}