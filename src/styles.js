import styled, { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    margin: 0;
    font-family: 'Helvetica Neue', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

export const TilesContainer = styled.div`

`

export const TileRow = styled.div`
  display: flex;
`
