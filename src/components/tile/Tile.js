import React, { PureComponent } from 'react'
import { Container } from './styles'

class Tile extends PureComponent {
  handleOnClickSetValid = () => {
    this.props.onClickSetValid(this.props.x, this.props.y)
  }

  render() {
    const { children, isInvalid } = this.props

    return (
      <Container onClick={this.handleOnClickSetValid}>
        {isInvalid ? 'X' : children}
      </Container>
    )
  }
}

export default Tile
