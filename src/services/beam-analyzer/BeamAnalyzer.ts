import Beam from '../beam/Beam'
import { Load, Support, SupportDirection } from '../../types/staticAnalysis'
import { zeros, matrix, usolve } from 'mathjs'

export type CoefficientMatrix = number[][]
export type ColumnVector = number[]

export type ReducedSupports = {
  x: number
  eqnIdx: number
}[]

export default class BeamAnalyzer {
  beam: Beam
  degreesOfFreedom = 3
  #eqnIdxThatGeneratesMoment = 1
  #momentEqnIdx = 2

  constructor(beam: Beam) {
    this.beam = beam
  }

  #calculateCoefficientMatrix(supports: Support[]) {
    const coefficientMatrix = matrix(zeros(this.degreesOfFreedom, this.degreesOfFreedom))

    supports.forEach((support, supportIdx) => {
      const { x } = support
      let eqnIdx
      switch (support.direction) {
        case SupportDirection.Fx:
          eqnIdx = 0
          break
        case SupportDirection.Fy:
          eqnIdx = 1
          break
        case SupportDirection.Mz:
          eqnIdx = 2
          break
        default:
          throw new Error('Invalid SupportDirection')
      }

      const curVal = coefficientMatrix.get([eqnIdx, supportIdx])
      coefficientMatrix.set([eqnIdx, supportIdx], curVal + 1)

      if (eqnIdx === this.#eqnIdxThatGeneratesMoment) {
        const curVal = coefficientMatrix.get([this.#momentEqnIdx, supportIdx])
        coefficientMatrix.set([this.#momentEqnIdx, supportIdx], curVal + x)
      }
    })

    return coefficientMatrix
  }

  #calculateColumnVector(loads: Load[]) {
    const columnVector = matrix(zeros(this.degreesOfFreedom, 1))

    for (const load of loads) {
      const cur0 = columnVector.get([0, 0])
      const cur1 = columnVector.get([1, 0])
      const cur2 = columnVector.get([2, 0])

      columnVector.set([0, 0], cur0 - load.fx)
      columnVector.set([1, 0], cur1 - load.fy)
      columnVector.set([2, 0], cur2 - (load.mz + load.fy * load.x))
    }

    return columnVector
  }

  solveReactionForces() {
    // Solve the systems of equations of type A * x = b
    // each row in a is a static equilibrium equation
    // if A is not square the system is statically indeterminate

    const { loads, supports } = this.beam
    const coefficientMatrix = this.#calculateCoefficientMatrix(supports)
    const columnVector = this.#calculateColumnVector(loads)

    try {
      return usolve(coefficientMatrix, columnVector)
        .toArray()
        .map((element) => {
          if (Array.isArray(element)) {
            return element[0]
          } else {
            return element
          }
        })
    } catch {
      throw new Error('System is statically indeterminate')
    }
  }
}
