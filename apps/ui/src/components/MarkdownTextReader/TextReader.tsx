import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import type { PluggableList } from 'react-markdown/lib/react-markdown'
import styled from 'styled-components'

const TextReader = ({ text }: { text: string }) => {
  return (
    <StyledReactMarkdown rehypePlugins={[rehypeRaw] as PluggableList}>{text}</StyledReactMarkdown>
  )
}

export default TextReader

const StyledReactMarkdown = styled(ReactMarkdown)`
  color: ${({ theme }) => `${theme.body.textColorPrimary}`};

  a {
    color: ${({ theme }) => theme.body.linkTextColor || '#0000FF'};
  }
`
