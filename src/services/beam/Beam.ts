import { v4 as uuidv4 } from 'uuid'

export type NewLoad = {
  x: number
  fx: number
  fy: number
  mz: number
}

export type Load = NewLoad & { id: string }

export type NewSupport = {
  x: number
  rfx: boolean
  rfy: boolean
  rmz: boolean
}

export type Support = NewSupport & { id: string }

export default class Beam {
  length: number
  #loads: Load[]
  #supports: Support[]

  constructor(length: number) {
    this.length = length
    this.#loads = []
    this.#supports = []
  }

  get loads() {
    return this.#loads
  }

  get supports() {
    return this.#supports
  }

  addLoad(load: NewLoad) {
    if (load.x < 0 || load.x > this.length) {
      throw new Error('Load is outside bounds')
    }

    this.#loads.push({ id: uuidv4(), ...load })
  }

  #supportAlreadyExists(support: NewSupport) {
    return this.#supports.some((existingSupport) => existingSupport.x === support.x)
  }

  addSupport(support: NewSupport) {
    if (support.x < 0 || support.x > this.length) {
      throw new Error('Support outside bounds')
    }

    if (this.#supportAlreadyExists(support)) {
      throw new Error('Support already exists')
    }

    this.#supports.push({ id: uuidv4(), ...support })
  }
}
