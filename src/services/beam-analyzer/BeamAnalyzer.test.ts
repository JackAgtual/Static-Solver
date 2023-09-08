import BeamAnalyzer from './BeamAnalyzer'
import Beam from '../beam/Beam'

describe('BeamAnalyzer', () => {
  describe('solveReactionForces', () => {
    let beam: Beam
    let beamAnalyzer: BeamAnalyzer
    let getLoadsMock = jest.spyOn(Beam.prototype, 'loads', 'get')
    let getSupportsMock = jest.spyOn(Beam.prototype, 'supports', 'get')

    beforeEach(() => {
      beam = new Beam(20)
      beamAnalyzer = new BeamAnalyzer(beam)
      getLoadsMock.mockClear()
      getSupportsMock.mockClear()
    })

    it('gets loads from beam', () => {
      beamAnalyzer.solveReactionForces()
      expect(getLoadsMock).toHaveBeenCalledTimes(1)
    })

    it('gets supports from beam', () => {
      beamAnalyzer.solveReactionForces()
      expect(getSupportsMock).toHaveBeenCalledTimes(1)
    })

    it('throws error if system is not static', () => {
      getSupportsMock.mockReturnValue([
        { id: 1, x: 0, rfy: true, rfx: false, rmz: false },
      ])
      getLoadsMock.mockReturnValue([{ id: 1, x: 10, fx: 0, fy: -300, mz: 0 }])
      expect(() => beamAnalyzer.solveReactionForces()).toThrowError()
    })

    it('throws error if statically indeterminate', () => {
      getSupportsMock.mockReturnValue([
        { id: 1, x: 10, rfy: true, rfx: false, rmz: false },
        { id: 2, x: 9, rfy: true, rfx: false, rmz: false },
        { id: 3, x: 8, rfy: true, rfx: false, rmz: false },
      ])
      getLoadsMock.mockReturnValue([{ id: 1, x: 10, fx: 100, fy: -300, mz: 0 }])

      expect(() => beamAnalyzer.solveReactionForces()).toThrowError()

      getLoadsMock.mockClear().mockReturnValue([{ id: 1, x: 20, fy: -200, fx: 0, mz: 0 }])
      getSupportsMock
        .mockClear()
        .mockReturnValue([{ id: 1, x: 0, rfy: true, rfx: false, rmz: false }])
      const beamAnalyzerWithTooFewSupports = new BeamAnalyzer(beam)
      expect(() => beamAnalyzerWithTooFewSupports.solveReactionForces()).toThrowError()
    })

    it('correctly solves for reaction force values', () => {
      getSupportsMock.mockReturnValue([{ id: 1, x: 0, rfx: true, rfy: true, rmz: true }])
      getLoadsMock.mockReturnValue([{ id: 1, x: 20, fx: 100, fy: -300, mz: 0 }])

      const supports = beamAnalyzer.solveReactionForces()

      // order of output is dependent on #calculateCoefficientMatrixAndVariableVector
      expect(supports[0].value).toBe(-100)
      expect(supports[1].value).toBe(300)
      expect(supports[2].value).toBe(6000)
    })

    it('corretly names multiple reaction forces', () => {
      getSupportsMock.mockReturnValue([
        { id: 1, x: 0, rfx: true, rfy: true, rmz: false },
        { id: 2, x: 20, rfx: false, rfy: true, rmz: false },
      ])
      const supports = beamAnalyzer.solveReactionForces()

      expect(supports[0].name).toBe('R_Fx_1')
      expect(supports[1].name).toBe('R_Fy_1')
      expect(supports[2].name).toBe('R_Fy_2')
    })
  })
})
