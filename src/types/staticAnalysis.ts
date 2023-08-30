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

export type Support = NewSupport & { id: number }
