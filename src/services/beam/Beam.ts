export type Load = {
  x: number
} & ({ fx: number } | { fy: number } | { mz: number })

export default class Beam {
  length: number
  #loads: Load[]

  constructor(length: number) {
    this.length = length
    this.#loads = []
  }

  get loads() {
    return this.#loads
  }

  addLoad(load: Load) {
    if (load.x < 0 || load.x > this.length) {
      throw new Error('Load is outside bounds')
    }
    this.#loads.push(load)
  }
}
