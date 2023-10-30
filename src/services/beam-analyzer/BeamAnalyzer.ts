import { Load, Support, SupportDirection } from '../../types/staticAnalysis'
import { zeros, matrix, lusolve } from 'mathjs'

export type CoefficientMatrix = number[][]
export type ColumnVector = number[]

export type ReducedSupports = {
  x: number
  eqnIdx: number
}[]

type BeamAnalyzerConstructor = {
  supports: Support[]
  loads: Load[]
}

export default class BeamAnalyzer {
  supports: Support[]
  loads: Load[]
  degreesOfFreedom = 3
  #eqnIdxThatGeneratesMoment = 1
  #momentEqnIdx = 2

  constructor({ supports, loads }: BeamAnalyzerConstructor) {
    this.supports = supports
    this.loads = loads
  }

  #calculateCoefficientMatrix() {
    const coefficientMatrix = matrix(zeros(this.degreesOfFreedom, this.degreesOfFreedom))

    this.supports.forEach((support, supportIdx) => {
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

  #calculateColumnVector() {
    const columnVector = matrix(zeros(this.degreesOfFreedom, 1))

    for (const load of this.loads) {
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

    try {
      const coefficientMatrix = this.#calculateCoefficientMatrix()
      const columnVector = this.#calculateColumnVector()
      return lusolve(coefficientMatrix, columnVector)
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
