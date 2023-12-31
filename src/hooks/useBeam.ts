import { useState, useEffect } from 'react'
import {
  Beam,
  NewLoad,
  NewSupport,
  SolvedSupport,
  Support,
  SupportDirection,
} from '../types/staticAnalysis'
import BeamAnalyzer from '../services/beam-analyzer/BeamAnalyzer'

export default function useBeam() {
  const [beam, setBeam] = useState<Beam>({
    length: null,
    supports: [],
    loads: [],
  })
  const [staticallyIndeterminate, setStaticallyIndeterminate] = useState(false)
  const [supportVals, setSupportVals] = useState<null | SolvedSupport[]>(null)
  const [supportCnt, setSupportCnt] = useState(0)

  useEffect(() => {
    setStaticallyIndeterminate(false)
  }, [beam.supports])

  function addSupport(support: NewSupport) {
    const supports: Support[] = []
    const id = supportCnt
    const { x, rfx, rfy, rmz } = support

    if (rfx) {
      supports.push({ id, x, name: `R_Fx_${id}`, direction: SupportDirection.Fx })
    }
    if (rfy) {
      supports.push({ id, x, name: `R_Fy_${id}`, direction: SupportDirection.Fy })
    }
    if (rmz) {
      supports.push({ id, x, name: `R_Mz_${id}`, direction: SupportDirection.Mz })
    }

    setBeam({ ...beam, supports: [...beam.supports, ...supports] })
    setSupportCnt(supportCnt + 1)
  }

  function addLoad(load: NewLoad) {
    const loadToAdd = { id: beam.loads.length, ...load }
    setBeam({ ...beam, loads: [...beam.loads, loadToAdd] })
  }

  function solveBeam() {
    const { supports, loads } = beam

    const beamAnalyzer = new BeamAnalyzer({ supports, loads })
    try {
      const solvedSupportValues = beamAnalyzer.solveReactionForces()
      // assume beam.supports and solvedSupportValues are the same length
      setSupportVals(
        beam.supports.map((support, idx) => ({
          name: support.name,
          value: Number(solvedSupportValues[idx]),
        })),
      )
    } catch {
      setStaticallyIndeterminate(true)
    }
  }

  return {
    beam,
    setBeam,
    staticallyIndeterminate,
    setStaticallyIndeterminate,
    supportVals,
    addSupport,
    addLoad,
    solveBeam,
  }
}
