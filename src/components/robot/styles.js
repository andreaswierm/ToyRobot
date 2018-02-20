import styled from 'styled-components'

export const Container = styled.div`

`

export const Image = styled.img`
  height: 18px;
  width: 18px;
  transform: rotate(${props => props.angle}deg);
`
