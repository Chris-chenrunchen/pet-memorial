declare module 'markdown-it' {
  export interface MarkdownItOptions {
    html?: boolean
    xhtmlOut?: boolean
    breaks?: boolean
    langPrefix?: string
    linkify?: boolean
    typographer?: boolean
    quotes?: string
    highlight?: (str: string, lang: string) => string
  }

  export interface MarkdownItInstance {
    render: (markdown: string) => string
    renderInline: (markdown: string) => string
  }

  function markdownIt(options?: MarkdownItOptions): MarkdownItInstance
  export = markdownIt
}