/**
 * Sets inline styles.
 *
 * Example usage:
 *
 * {
 * 		color: 'red',
 * 		position: 'relative'
 * }
 *
 * Note: To unset a style pass the property name with a NULL value.
 *
 * @param {HtmlElement} node  The element that you want to apply styles to.
 * @param {Object} styles   Plain object that contains your desired styles.
 */
export default function setStyles (node, styles) {
  if (typeof styles !== 'object') {
    throw new Error('Styles must be a key value pair.')
  }

  for (let key in styles) {
    if (styles.hasOwnProperty(key)) {
      node.style[key] = styles[key]
    }
  }
}
