import BeamAnalyzer from './BeamAnalyzer'
import Beam from '../beam/Beam'

// TODO: Mock Beam
describe('BeamAnalyzer', () => {
  describe('solveReactionForces', () => {
    let beam: Beam
    beforeEach(() => {
      beam = new Beam(20)
    })

    it.todo('gets loads from beam')

    it.todo('gets supports from beam')

    it.todo('throws error if system is not static')

    it('throws error if statically indeterminate', () => {
      beam.addSupport({ x: 10, rfy: true, rfx: false, rmz: false })
      beam.addSupport({ x: 9, rfy: true, rfx: false, rmz: false })
      beam.addSupport({ x: 8, rfy: true, rfx: false, rmz: false })
      beam.addLoad({ x: 10, fx: 100, fy: -300, mz: 0 })
      const beamAnalyzer = new BeamAnalyzer(beam)
      expect(() => beamAnalyzer.solveReactionForces()).toThrowError()

      beam = new Beam(20)
      beam.addLoad({ x: 20, fy: -200, fx: 0, mz: 0 })
      beam.addSupport({ x: 0, rfy: true, rfx: false, rmz: false })
      const beamAnalyzerWithTooFewSupports = new BeamAnalyzer(beam)
      expect(() => beamAnalyzerWithTooFewSupports.solveReactionForces()).toThrowError()
    })

    it.only('correctly solves for reaction forces', () => {
      beam.addSupport({ x: 0, rfx: true, rfy: true, rmz: true })
      beam.addLoad({ x: 20, fx: 100, fy: -300, mz: 0 })
      const beamAnalyzer = new BeamAnalyzer(beam)
      const supports = beamAnalyzer.solveReactionForces()
      expect(supports[0]).toBe(-100)
      expect(supports[1]).toBe(300)
      expect(supports[1]).toBe(6000)
    })
  })
})
