import React, { PureComponent } from 'react'
import { Container, Image } from './styles'
import robotImg from './robot_3Dred.png'

class Robot extends PureComponent {
  render() {
    const { rotation } = this.props

    return (
      <Container>
        <Image src={robotImg} angle={rotation} />
      </Container>
    )
  }
}

export default Robot
