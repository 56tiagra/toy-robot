import { cloneDeep } from "lodash";

export type Direction = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

export type Position = {
  coordinate: {
    x: number;
    y: number
  };
  rotate: number, 
  facing: Direction
}

export const FACING = {
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  EAST: 'EAST',
  WEST: 'WEST'
}
export const ROTATE_DIRECTION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
}

export const calculateRotation = (facing: Direction): number => {
  switch (facing) {
    case FACING.NORTH:
      return 0;
    case FACING.EAST:
      return 90;
    case FACING.SOUTH:
      return 180;
    case FACING.WEST:
      return 270;
    default:
      return 0;
  }
}

export const move = (position: Position) => {
  let positionCopy = cloneDeep(position);
  if(position.facing === FACING.NORTH && position.coordinate.y > 0) {
    positionCopy.coordinate.y--;
  }
  else if(position.facing === FACING.SOUTH && position.coordinate.y < 4) {
    positionCopy.coordinate.y++;
  }
  else if(position.facing === FACING.EAST && position.coordinate.x < 4) {
    positionCopy.coordinate.x++;
  }
  else if(position.facing === FACING.WEST && position.coordinate.x > 0) {
    positionCopy.coordinate.x--;
  }
  return positionCopy;
}

export const convertFacingBasedOnRoation = (degree: number): Direction => {
  if(degree%90!==0) {
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

export const rotate = (currentDegree: number, direction: string): number => {
  if (currentDegree < 0 || currentDegree > 270 || currentDegree % 90 !== 0) {
    //default to 0 if not validate
    return 0
  }
  if (direction === ROTATE_DIRECTION.LEFT) {
    if (currentDegree === 0) {
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
