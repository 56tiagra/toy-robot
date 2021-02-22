import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { cloneDeep } from 'lodash'
import {calculateRotation, Direction, FACING, Position, ROTATE_DIRECTION} from './utils/robotEngine'

function App() {
  const [position, setposition] = useState<Position>({
    coordinate: {
      x: 1,
      y: 1
    },
    rotate: 0,
    facing: FACING.NORTH as Direction
  });
  const xCoordinate = useRef<any>(null)
  const yCoordinate = useRef<any>(null)
  const facing = useRef<any>(null)

  const placeRobot = () => {
    const newCoordinate: Position = {
      coordinate: {
        x: parseInt(xCoordinate.current.value) || 0,
        y: parseInt(yCoordinate.current.value) || 0
      },
      rotate: calculateRotation(facing.current.value || FACING.NORTH),
      facing: facing.current.value
    }
    setposition(newCoordinate);
  }

  const convertFacingBasedOnRoation = (degree: number): Direction => {
    if(degree%90!=0) {
      return FACING.NORTH as Direction;
    }
    switch (degree) {
      case 0:
        return FACING.NORTH as Direction;
      case 90:
        return FACING.EAST as Direction;
      case 180:
        return FACING.SOUTH as Direction;
      case 270:
        return FACING.WEST as Direction
    }
    return FACING.NORTH as Direction;
  }

  const rotate = (currentDegree: number, direction: string): number => {
    if (currentDegree < 0 || currentDegree > 270 || currentDegree % 90 !== 0) {
      //default to 0 if not validate
      return 0
    }
    if (direction === ROTATE_DIRECTION.LEFT) {
      if (currentDegree == 0) {
        return 270;
      }
      return currentDegree - 90;
    }
    else if (direction === ROTATE_DIRECTION.RIGHT) {
      if (currentDegree === 270) {
        return 0;
      }
      return currentDegree + 90
    }
    return currentDegree;
  }

  const onRotationClick = (direction: string) => {
      const newRotation = rotate(position.rotate, direction)
      let positionCopy: Position = cloneDeep(position);
      positionCopy.rotate = newRotation || 0;
      positionCopy.facing = convertFacingBasedOnRoation(newRotation)
      setposition(positionCopy)
  }

  const move = (position: Position) => {
    let positionCopy = cloneDeep(position);
    if(position.facing == FACING.NORTH || position.coordinate.y < 4) {
      positionCopy.coordinate.y = positionCopy.coordinate.y + 1;
    }
    else if(position.facing == FACING.SOUTH || position.coordinate.y > 1) {
      positionCopy.coordinate.y--;
    }
    else if(position.facing == FACING.EAST || position.coordinate.x < 4) {
      positionCopy.coordinate.x++;
    }
    else if(position.facing == FACING.WEST || position.coordinate.x > 1) {
      positionCopy.coordinate.x--;
    }
    return positionCopy;
  }

  const onMoveClick = () => {
    const newPosition = move(position);
    setposition(newPosition)
  }

  return (
    <div className="container">
      <h1 className="header">Robot toy</h1>
      <div className="robot__table__container">
        <div className="robot__table">
          <div className="robot" style={{ top: position.coordinate.y * 100, left: position.coordinate.x * 100, transform: `rotate(${position.rotate}deg)` }}>
            ^Robot^
          </div>
        </div>
      </div>

      <div className="robot__controls">
        <div className="robot__controls__place-control">
          <label>X Coordinate:</label>
          <input type='number' defaultValue={0} ref={xCoordinate} />

          <label>Y Coordinate:</label>
          <input type='number' defaultValue={0} ref={yCoordinate} />

          <label>Facing:</label>
          <select ref={facing}>
            <option value={FACING.NORTH}>North</option>
            <option value={FACING.SOUTH}>South</option>
            <option value={FACING.EAST}>East</option>
            <option value={FACING.WEST}>West</option>
          </select>
          <button className="btn" onClick={placeRobot}>Place</button>

        </div>
        <hr />
        <div className="robot__controls__btn-group">

          <button className="btn" onClick={()=> onRotationClick(ROTATE_DIRECTION.LEFT)
          }>Rotate Left</button>
          <button className="btn"  onClick={()=> onRotationClick(ROTATE_DIRECTION.RIGHT)
          }>Rotate Right</button>
          <button className="btn" onClick={onMoveClick}>Move</button>
          <button className="btn">Report</button>
        </div>
        <div className="row">
          <div className="robot__controls__display">
            <p>test output</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
