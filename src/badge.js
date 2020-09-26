import pixelWidth from 'string-pixel-width'

export default class Badge {
  constructor(logo, label, padding) {
    this.logo = logo
    this.label = label
    this.padding = parseInt(padding)
    this.labelWidth = pixelWidth(label, { font: 'open sans', size: 18, bold: true })
  }

  build() {
    const desiredWidth = 2 + this.padding + 32 + 2 + this.labelWidth + this.padding * 2
    const desiredBorderWidth = desiredWidth - 1

    return `
    <svg id="badge" fill="none" width="${desiredWidth}" height="48" viewBox="0 0 ${desiredWidth} 48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style type="text/css">
          @import url('https://fonts.googleapis.com/css2?family=Nunito');
        </style>
      </defs>
      <g>
        <rect id="badge-border" x="0.5" y="0.5" rx="4.5" height="99%" width="${desiredBorderWidth}" stroke="#E4E2E2"
          fill="#fffefe" stroke-opacity="1" />
        <g transform="translate(${this.padding}, ${this.padding})">
          <svg id="badge-logo" class="icon" x="0" y="0" viewBox="0 0 32 32" width="32" height="32">
            ${this.logo}
          </svg>
          <text id="badge-label" x="34" y="22"
            style="font-family: Open Sans, sans-serif; font-size: 18px; font-weight: 500; fill: black">
            ${this.label}
          </text>
        </g>
      </g>
    </svg>
    `
  }
}
