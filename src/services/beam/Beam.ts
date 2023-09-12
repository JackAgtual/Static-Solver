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

export enum SupportDirection {
  Fx,
  Fy,
  Mz,
}

export type Support = {
  x: number
  direction: SupportDirection
  id: number
  name: string
}

export default class Beam {
  length: number
  #loads: Load[]
  #supports: Support[]
  #supportCnt = 1

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

    if (this.#loadAlreadyExistsAtLocation(load)) {
      throw new Error('Load already exists at location')
    }

    const id = this.#loads.length + 1

    this.#loads.push({ id, ...load })
    return this.#loads
  }

  #loadAlreadyExistsAtLocation(newLoad: NewLoad) {
    return this.#loads.some((existingLoad) => existingLoad.x === newLoad.x)
  }

  #supportAlreadyExistsAtLocation(newSupport: NewSupport) {
    return this.#supports.some((existingSupport) => existingSupport.x === newSupport.x)
  }

  addSupport(support: NewSupport) {
    if (support.x < 0 || support.x > this.length) {
      throw new Error('Support outside bounds')
    }

    if (this.#supportAlreadyExistsAtLocation(support)) {
      throw new Error('Support already exists at location')
    }

    const id = this.#supportCnt

    if (support.rfx) {
      this.#supports.push({
        id,
        x: support.x,
        name: `R_Fx_${id}`,
        direction: SupportDirection.Fx,
      })
    }
    if (support.rfy) {
      this.#supports.push({
        id,
        x: support.x,
        name: `R_Fy_${id}`,
        direction: SupportDirection.Fy,
      })
    }
    if (support.rmz) {
      this.#supports.push({
        id,
        name: `R_Mz_${id}`,
        x: support.x,
        direction: SupportDirection.Mz,
      })
    }

    this.#supportCnt++
    return this.#supports
  }

  removeLoad(id: number): Load[] {
    return this.loads
      .filter((load) => load.id !== id)
      .map((load, idx) => {
        return {
          ...load,
          id: idx + 1,
        }
      })
  }

  removeSupport(id: number): Support[] {
    const supports = this.supports
    if (!supports.some((support) => support.id === id)) return supports

    return supports
      .filter((support) => support.id !== id)
      .map((support, idx) => {
        const id = idx + 1

        let name
        switch (support.direction) {
          case SupportDirection.Fx:
            name = `R_Fx_${id}`
            break
          case SupportDirection.Fy:
            name = `R_Fy_${id}`
            break
          case SupportDirection.Mz:
            name = `R_Mz_${id}`
            break
        }

        this.#supportCnt--
        return {
          ...support,
          id,
          name,
        }
      })
  }
}
