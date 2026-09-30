/**
 * Demotes every Markdown heading by one level (h1→h2 … h5→h6).
 *
 * Project pages already render the project name as the page's single <h1>;
 * without this the article's own leading heading produced a second <h1> and a
 * broken outline. Shifting keeps every heading — and its text — intact.
 */
type HastNode = {
  type?: string
  tagName?: string
  children?: HastNode[]
}

export function rehypeShiftHeadings() {
  return (tree: HastNode) => {
    const walk = (node: HastNode) => {
      if (node.type === 'element' && node.tagName && /^h[1-5]$/.test(node.tagName)) {
        node.tagName = `h${Number(node.tagName.slice(1)) + 1}`
      }
      node.children?.forEach(walk)
    }
    walk(tree)
  }
}
