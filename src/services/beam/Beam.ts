export type Load = {
  x: number
  fx: number
  fy: number
  mz: number
}

export type Support = {
  x: number
  rfx: boolean
  rfy: boolean
  rmz: boolean
}

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

  addLoad(load: Load) {
    if (load.x < 0 || load.x > this.length) {
      throw new Error('Load is outside bounds')
    }
    this.#loads.push(load)
  }

  #supportAlreadyExists(support: Support) {
    console.log('support: ', support)
    const supportsAtSameLocation = this.#supports.filter(
      (existingSupport) => existingSupport.x === support.x,
    )
    for (const existingSupport of supportsAtSameLocation) {
      if (
        (existingSupport.rfx && support.rfx) ||
        (existingSupport.rfy && support.rfy) ||
        (existingSupport.rmz && support.rmz)
      ) {
        return true
      }
    }
    return false
  }

  addSupport(support: Support) {
    if (support.x < 0 || support.x > this.length) {
      throw new Error('Support outside bounds')
    }

    if (this.#supportAlreadyExists(support)) {
      throw new Error('Support already exists')
    }

    this.#supports.push(support)
  }
}
