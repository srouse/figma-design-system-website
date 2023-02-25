

export default function renderHTML(content, css) {
  return `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <style>
      ${css}
    </style>
    <style>
      :root {
        --white-color: #fff;

        --primary-color: #A164F9;
        --primary-dark-color: #7014F6;
      }

      html, body {
        margin: 0; padding: 0;
      }

      .header {
        background-color: var( --primary-dark-color );
        color: var( --white-color );
        font-size: 1.4em;
        height: 140px;
        display: flex;
        justify-content: center;
      }

        .header-content {
          display: flex;
          justify-content: start;
          align-items: center;
          width: 100%;
        }

        .markdown-content,
        .header-content {
          padding-left: 80px;
          padding-right: 80px;
          max-width: 1000px;
          margin: 0 auto;
          font-size: 16px;
          --color-accent-fg: var( --primary-dark-color );
        }

        .markdown-content {
          padding-top: 40px;
          padding-bottom: 80px;
        }

      @media (max-width:768px) {
        .markdown-content,
        .header-content {
          padding-left: 40px;
          padding-right: 40px;
          font-size: 14px;
        }
        .markdown-content {
          padding-top: 30px;
          padding-bottom: 40px;
        }
      }
      @media (max-width:500px) {
        .markdown-content, .header-content {
          font-size: 12px;
        }
        .markdown-content {
          padding-top: 20px;
          padding-bottom: 30px;
        }
      }
    </style>
  </head>
  <body class="markdown-body">
      <div class="header">
        <div class="header-content">
          <svg xmlns="http://www.w3.org/2000/svg"
            style="margin-right: 20px;"
            viewBox="0 0 640 512"
            width="40px" height="40px"
            fill="#fff">
            <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path d="M144 64C138.6 64 133.2 64.39 128 65.13V464C128 472.8 120.8 480 112 480C103.2 480 96 472.8 96 464V74.78C58.16 92.75 32 131.3 32 176V464C32 472.8 24.84 480 16 480C7.164 480 0 472.8 0 464V176C0 96.47 64.47 32 144 32H150.6C196.8 32 240.2 54.2 267.3 91.69L392.7 265.4C417.5 299.7 457.2 320 499.6 320H512C565 320 608 277 608 224V218.1C608 178.1 581.1 143.6 544 132.1V255.1C544 264.8 536.8 271.1 528 271.1C519.2 271.1 512 264.8 512 255.1V128.1C489.5 128.9 467.6 134.9 448 145.5V240C448 248.8 440.8 256 432 256C423.2 256 416 248.8 416 240V168.1L394.6 187.1C388 193.8 377.9 193.2 372 186.6C366.2 180 366.8 169.9 373.4 164L399.8 140.6C432.1 111.9 473.8 96 517 96C584.9 96 640 151.1 640 218.1V464C640 472.8 632.8 480 624 480C615.2 480 608 472.8 608 464V308.7C584.5 335.2 550.2 352 512 352V464C512 472.8 504.8 480 496 480C487.2 480 480 472.8 480 464V350.8C457.2 348.1 435.4 340.6 416 329.1V464C416 472.8 408.8 480 400 480C391.2 480 384 472.8 384 464V304.3C377.8 298.1 372 291.4 366.8 284.1L319.1 219.3V464C319.1 472.8 312.8 480 303.1 480C295.2 480 287.1 472.8 287.1 464V175L241.3 110.4C236.3 103.4 230.4 97.03 223.1 91.44V464C223.1 472.8 216.8 480 207.1 480C199.2 480 191.1 472.8 191.1 464V71.95C178.1 66.77 164.9 64 150.6 64L144 64z"/>
          </svg>  
          <div style="font-size: 1.5em;">Figma Design System</div>
        </div>
      </div>
      <div class="markdown-content">
        ${content}
      </div>
  </body>
</html>`;
}