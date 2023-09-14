export type NewLoad = {
  x: number
  fx: number
  fy: number
  mz: number
}

export type NewSupport = {
  x: number
  rfx: boolean
  rfy: boolean
  rmz: boolean
}

export type Load = NewLoad & { id: number }

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
