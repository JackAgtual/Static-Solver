export type NewLoad = {
  x: number
  fx: number
  fy: number
  mz: number
}

export type Load = NewLoad & { id: number }

export type NewSupport = {
  x: number
  rfx: boolean
  rfy: boolean
  rmz: boolean
}

export type Support = NewSupport & { id: number }

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

    const id = this.#loads.length + 1

    this.#loads.push({ id, ...load })
    return this.#loads
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

    const id = this.#supports.length + 1

    this.#supports.push({ id, ...support })
    return this.#supports
  }
}
