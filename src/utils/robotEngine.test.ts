import { cloneDeep } from 'lodash';
import { calculateRotation, convertFacingBasedOnRoation, Direction, FACING, move, rotate, ROTATE_DIRECTION } from "./robotEngine"

describe('Robot Engine Test', () => {
  const initalData = {
    coordinate: {
      x: 2,
      y: 2
    },
    rotate: 0,
    facing: FACING.NORTH as Direction
  }
  it('test calculateRotation return right rotation degree with given facing direction', () => {

    const northFacingDegree = calculateRotation(FACING.NORTH as Direction)
    expect(northFacingDegree).toEqual(0)

    const southFacingDegree = calculateRotation(FACING.SOUTH as Direction)
    expect(southFacingDegree).toEqual(180)

    const eastFacingDegree = calculateRotation(FACING.EAST as Direction)
    expect(eastFacingDegree).toEqual(90)

    const westFacingDegree = calculateRotation(FACING.WEST as Direction)
    expect(westFacingDegree).toEqual(270)
  })
  it('test move to the correct coordinate and without side effect', () => {
    //arrange
    const initalStateCopy = cloneDeep(initalData);
    //act
    const newPosition = move(initalData);
    //assert
    expect(newPosition.coordinate.y).toEqual(initalData.coordinate.y-1);
    expect(JSON.stringify(initalData)).toEqual(JSON.stringify(initalStateCopy))
  })
  it('test convertFacingBasedOnRoation return right facing direction with given degree', () => {

    const facing0Degree = convertFacingBasedOnRoation(0)
    expect(facing0Degree).toEqual(FACING.NORTH)

    const facing90Degree = convertFacingBasedOnRoation(90)
    expect(facing90Degree).toEqual(FACING.EAST)

    const facing180Degree = convertFacingBasedOnRoation(180)
    expect(facing180Degree).toEqual(FACING.SOUTH)

    const facing270Degree = convertFacingBasedOnRoation(270)
    expect(facing270Degree).toEqual(FACING.WEST)
  })
  it('test rotate to the right degree with given direction', ()=> {
    //arrange 
    const initalDegree = 0
    //act
    const rightRotationDegree = rotate(initalDegree, ROTATE_DIRECTION.RIGHT)
    const leftRotationDegree = rotate(initalDegree, ROTATE_DIRECTION.LEFT)
    //assert
    expect(rightRotationDegree).toEqual(90)
    expect(leftRotationDegree).toEqual(270)

  })
})