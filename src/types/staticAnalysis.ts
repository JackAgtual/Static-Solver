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

export type SolvedSupport = {
  name: string
  value: number
}
export type Beam = {
  length: number | null
  supports: Support[]
  loads: Load[]
}

export type BeamState = {
  beam: Beam
  setBeam: React.Dispatch<React.SetStateAction<Beam>>
}
