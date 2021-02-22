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

