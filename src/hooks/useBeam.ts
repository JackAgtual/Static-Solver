import { useState, useEffect } from 'react'
import { Beam, SolvedSupport } from '../types/staticAnalysis'
import BeamAnalyzer from '../services/beam-analyzer/BeamAnalyzer'

export default function useBeam() {
  const [beam, setBeam] = useState<Beam>({
    length: null,
    supports: [],
    loads: [],
  })
  const [staticallyIndeterminate, setStaticallyIndeterminate] = useState(false)
  const [supportVals, setSupportVals] = useState<null | SolvedSupport[]>(null)

  useEffect(() => {
    setStaticallyIndeterminate(false)
  }, [beam.supports])

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
    solveBeam,
  }
}
