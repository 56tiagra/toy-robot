import React, { useRef, useState } from 'react';
import './App.css';
import { cloneDeep } from 'lodash'
import {calculateRotation, convertFacingBasedOnRoation, Direction, FACING, move, Position, rotate, ROTATE_DIRECTION} from './utils/robotEngine'

function App() {
  const [position, setposition] = useState<Position>({
    coordinate: {
      x: 0,
      y: 0
    },
    rotate: 0,
    facing: FACING.NORTH as Direction
  });

  const [output, setoutput] = useState<string[]>([])
  const xCoordinate = useRef<any>(null)
  const yCoordinate = useRef<any>(null)
  const facing = useRef<any>(null)

  const onPlaceClick = () => {
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


  const onRotationClick = (direction: string) => {
      const newRotation = rotate(position.rotate, direction)
      let positionCopy: Position = cloneDeep(position);
      positionCopy.rotate = newRotation || 0;
      positionCopy.facing = convertFacingBasedOnRoation(newRotation)
      setposition(positionCopy)
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
          <button className="btn" onClick={onPlaceClick}>Place</button>

        </div>
        <hr />
        <div className="robot__controls__btn-group">

          <button className="btn" onClick={()=> onRotationClick(ROTATE_DIRECTION.LEFT)
          }>Rotate Left</button>
          <button className="btn"  onClick={()=> onRotationClick(ROTATE_DIRECTION.RIGHT)
          }>Rotate Right</button>
          <button className="btn" onClick={onMoveClick}>Move</button>
          <button className="btn" onClick={()=>{setoutput([`${position.coordinate.x},${position.coordinate.y},${position.facing}`,...output])}}>Report</button>
        </div>
        <div className="row">
          <div className="robot__controls__display">
            {output.map((value, index)=> <p>
              {value}
            </p>)}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
