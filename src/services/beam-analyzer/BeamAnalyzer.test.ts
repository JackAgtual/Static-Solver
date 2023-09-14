import BeamAnalyzer from './BeamAnalyzer'
import Beam from '../beam/Beam'
import { SupportDirection } from '../../types/staticAnalysis'

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

    afterAll(() => {
      getLoadsMock.mockRestore()
      getSupportsMock.mockRestore()
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
        { x: 0, direction: SupportDirection.Fy, id: 1, name: 'R_Fy_1' },
      ])
      getLoadsMock.mockReturnValue([{ id: 1, x: 10, fx: 0, fy: -300, mz: 0 }])
      expect(() => beamAnalyzer.solveReactionForces()).toThrowError()
    })

    it('throws error if statically indeterminate', () => {
      getSupportsMock.mockReturnValue([
        { id: 1, x: 10, direction: SupportDirection.Fy, name: 'R_Fy_1' },
        { id: 2, x: 9, direction: SupportDirection.Fy, name: 'R_Fy_2' },
        { id: 3, x: 8, direction: SupportDirection.Fy, name: 'R_Fy_3' },
      ])
      getLoadsMock.mockReturnValue([{ id: 1, x: 10, fx: 100, fy: -300, mz: 0 }])

      expect(() => beamAnalyzer.solveReactionForces()).toThrowError()

      getLoadsMock.mockClear().mockReturnValue([{ id: 1, x: 20, fy: -200, fx: 0, mz: 0 }])
      getSupportsMock
        .mockClear()
        .mockReturnValue([
          { id: 1, x: 0, direction: SupportDirection.Fy, name: 'R_Fy_1' },
        ])
      const beamAnalyzerWithTooFewSupports = new BeamAnalyzer(beam)
      expect(() => beamAnalyzerWithTooFewSupports.solveReactionForces()).toThrowError()
    })

    it('correctly solves for reaction force values', () => {
      getSupportsMock.mockReturnValue([
        { id: 1, x: 0, direction: SupportDirection.Fx, name: 'R_Fx_1' },
        { id: 1, x: 0, direction: SupportDirection.Fy, name: 'R_Fy_1' },
        { id: 1, x: 0, direction: SupportDirection.Mz, name: 'R_Mz_1' },
      ])
      getLoadsMock.mockReturnValue([{ id: 1, x: 20, fx: 100, fy: -300, mz: 0 }])

      const solvedSupports = beamAnalyzer.solveReactionForces()

      expect(solvedSupports[0]).toBe(-100)
      expect(solvedSupports[1]).toBe(300)
      expect(solvedSupports[2]).toBe(6000)
    })
  })
})
