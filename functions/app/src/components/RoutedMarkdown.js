import React from 'react'
import ReactMarkdown from 'react-markdown'
import { preventOrphans } from '../style'
import { Link } from 'react-router-dom'

const renderLink = ({ href, children }) => {
  if (href[0] === '/') return <Link to={href}>{children}</Link>
  else return <a href={href}>{children}</a>
}

export default ({ source, withHTML, transforms = {} }) => {
  const params = {
    children: preventOrphans(source),
    escapeHtml: !withHTML,
    renderers: Object.assign(
      {
        link: renderLink,
      },
      transforms
    ),
    ...(withHTML && { rehypePlugins: [import('rehype-raw')] }),
  }
  return <ReactMarkdown {...params} />
}
