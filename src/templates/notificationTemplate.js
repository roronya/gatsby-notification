import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components'

const Container = styled.div`
  body {
    margin: 0;
  }
  main {
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", YuGothic, "ヒラギノ角ゴ ProN W3", Hiragino Kaku Gothic ProN, Arial, "メイリオ", Meiryo, sans-serif;
    box-sizing: border-box;
    margin: 16px;
  }
  p {
    color: rgba(51,51,51,1);
    font-size: 13px;
  }
  h1 {
      padding-left: 4px;
      color: rgba(85,85,85,1);
      border-left: 4px solid rgba(85,85,85,1);
      font-size: 13px;
  }
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { html } = markdownRemark
  return <Container dangerouslySetInnerHTML={{ __html: html }} />
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
    }
  }
`
