import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Robot from './components/robot/Robot'
import round from 'lodash/round'
import Tile from './components/tile/Tile'
import times from 'lodash/times'

import {
  Container,
  TilesContainer,
  TileRow,
} from './styles'

const movableArea = {
  height: 10,
  width: 10,
}

class App extends Component {
  state = {
    player1: {
      x: round(movableArea.width / 2),
      y: round(movableArea.height / 2),
      rotation: 0,
    },
    invalidTiles: {},
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleOnKeyDown)

    times(movableArea.width, widthCell => {
      this.setValid(0, widthCell)
      this.setValid(movableArea.height - 1, widthCell)
    })

    times(movableArea.height, heightRow => {
      this.setValid(heightRow, 0)
      this.setValid(heightRow, movableArea.width - 1)
    })
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleOnKeyDown)
  }

  handleOnKeyDown = event => {
    if (event.keyCode === 38) {
      this.handleMoveBy(1)
    } else if (event.keyCode === 40) {
      this.handleMoveBy(-1)
    } else if (event.keyCode === 37) {
      this.handleRotateBy(-90)
    } else if (event.keyCode === 39) {
      this.handleRotateBy(90)
    }
  }

  handleMoveBy = velocity => {
    this.setState(state => {
      let x = state.player1.x
      let y = state.player1.y

      if (state.player1.rotation === 0 || state.player1.rotation === 360) {
        x += velocity
      } else if (state.player1.rotation === 90) {
        y += velocity
      } else if (state.player1.rotation === 180) {
        x -= velocity
      } else if (state.player1.rotation === 270) {
        y -= velocity
      }

      if (!this.isTileValid(x, y)) {
        return state
      }

      return {
        player1: {
          ...state.player1,
          x,
          y,
        },
      }
    })
  }

  handleRotateBy = angle => {
    this.setState(state => {
      let rotation = state.player1.rotation + angle

      if (rotation > 360) {
        rotation = rotation - 360
      } else if (rotation < 0) {
        rotation = rotation + 360
      }

      return {
        player1: {
          ...state.player1,
          rotation,
        }
      }
    })
  }

  setValid = (x, y) => {
    this.setState(state => {
      const invalidTiles = state.invalidTiles

      invalidTiles[`${x}-${y}`] = !invalidTiles[`${x}-${y}`]

      return { invalidTiles }
    })
  }

  isTileValid = (x, y) => {
    const { invalidTiles } = this.state

    return !invalidTiles[`${x}-${y}`]
  }

  render() {
    const { player1 } = this.state

    return (
      <Container>
        <TilesContainer>
          {times(movableArea.height, heightRow => (
            <TileRow key={heightRow}>
              {times(movableArea.width, widthCell => (
                <Tile
                  key={`${heightRow}-${widthCell}`}
                  isInvalid={!this.isTileValid(heightRow, widthCell)}
                  onClickSetValid={this.setValid}
                  x={heightRow}
                  y={widthCell}
                >
                  {player1.x === widthCell && player1.y === heightRow && (
                    <Robot rotation={player1.rotation} />
                  )}
                </Tile>
              ))}
            </TileRow>
          ))}
        </TilesContainer>
      </Container>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
