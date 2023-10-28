import BeamAnalyzer from './BeamAnalyzer'
import { SupportDirection } from '../../types/staticAnalysis'

describe('BeamAnalyzer', () => {
  describe('solveReactionForces', () => {
    it('throws error if system is not static', () => {
      const supports = [{ x: 0, direction: SupportDirection.Fy, id: 1, name: 'R_Fy_1' }]
      const loads = [{ id: 1, x: 10, fx: 0, fy: -300, mz: 0 }]
      const beamAnalyzer = new BeamAnalyzer({ supports, loads })
      expect(() => beamAnalyzer.solveReactionForces()).toThrowError()
    })

    it('throws error if statically indeterminate', () => {
      const tooManySupports = [
        { id: 1, x: 10, direction: SupportDirection.Fy, name: 'R_Fy_1' },
        { id: 2, x: 9, direction: SupportDirection.Fy, name: 'R_Fy_2' },
        { id: 3, x: 8, direction: SupportDirection.Fy, name: 'R_Fy_3' },
      ]
      const loads1 = [{ id: 1, x: 10, fx: 100, fy: -300, mz: 0 }]

      const beamAnalyzerWithToomanySupports = new BeamAnalyzer({
        supports: tooManySupports,
        loads: loads1,
      })
      expect(() => beamAnalyzerWithToomanySupports.solveReactionForces()).toThrowError()

      const loads2 = [{ id: 1, x: 20, fy: -200, fx: 0, mz: 0 }]
      const tooFewSupports = [
        { id: 1, x: 0, direction: SupportDirection.Fy, name: 'R_Fy_1' },
      ]
      const beamAnalyzerWithTooFewSupports = new BeamAnalyzer({
        supports: tooFewSupports,
        loads: loads2,
      })
      expect(() => beamAnalyzerWithTooFewSupports.solveReactionForces()).toThrowError()
    })

    it('correctly solves for reaction force values', () => {
      const supports1 = [
        { id: 1, x: 0, direction: SupportDirection.Fx, name: 'R_Fx_1' },
        { id: 1, x: 0, direction: SupportDirection.Fy, name: 'R_Fy_1' },
        { id: 1, x: 0, direction: SupportDirection.Mz, name: 'R_Mz_1' },
      ]
      const loads1 = [{ id: 1, x: 20, fx: 100, fy: -300, mz: 0 }]

      const beamAnalyzer1 = new BeamAnalyzer({ supports: supports1, loads: loads1 })
      const solvedCantileverSupports = beamAnalyzer1.solveReactionForces()
      expect(solvedCantileverSupports[0]).toBe(-100)
      expect(solvedCantileverSupports[1]).toBe(300)
      expect(solvedCantileverSupports[2]).toBe(6000)

      const supports2 = [
        { id: 1, x: 0, direction: SupportDirection.Fx, name: 'R_Fx_1' },
        { id: 1, x: 0, direction: SupportDirection.Fy, name: 'R_Fy_1' },
        { id: 2, x: 20, direction: SupportDirection.Fy, name: 'R_Fy_2' },
      ]
      const loads2 = [{ id: 1, x: 15, fx: 0, fy: -600, mz: 0 }]
      const beamAnalyzer2 = new BeamAnalyzer({ supports: supports2, loads: loads2 })
      const solvedSimpleSupports = beamAnalyzer2.solveReactionForces()
      expect(solvedSimpleSupports[0]).toBe(0)
      expect(solvedSimpleSupports[1]).toBe(150)
      expect(solvedSimpleSupports[2]).toBe(450)
    })

    it('returns values based on the order of supports', () => {
      const loads = [{ id: 1, x: 20, fx: 100, fy: -300, mz: 0 }]

      const supports1 = [
        { id: 1, x: 0, direction: SupportDirection.Fx, name: 'R_Fx_1' },
        { id: 1, x: 0, direction: SupportDirection.Fy, name: 'R_Fy_1' },
        { id: 1, x: 0, direction: SupportDirection.Mz, name: 'R_Mz_1' },
      ]
      const beamAnalyzer1 = new BeamAnalyzer({ supports: supports1, loads })
      const solvedSupports1 = beamAnalyzer1.solveReactionForces()
      expect(solvedSupports1[0]).toBe(-100)
      expect(solvedSupports1[1]).toBe(300)
      expect(solvedSupports1[2]).toBe(6000)

      const supports2 = [
        { id: 1, x: 0, direction: SupportDirection.Fx, name: 'R_Fx_1' },
        { id: 1, x: 0, direction: SupportDirection.Mz, name: 'R_Mz_1' },
        { id: 1, x: 0, direction: SupportDirection.Fy, name: 'R_Fy_1' },
      ]
      const beamAnalyzer2 = new BeamAnalyzer({ supports: supports2, loads })
      const solvedSupports2 = beamAnalyzer2.solveReactionForces()
      expect(solvedSupports2[0]).toBe(-100)
      expect(solvedSupports2[1]).toBe(6000)
      expect(solvedSupports2[2]).toBe(300)

      const supports3 = [
        { id: 1, x: 0, direction: SupportDirection.Mz, name: 'R_Mz_1' },
        { id: 1, x: 0, direction: SupportDirection.Fx, name: 'R_Fx_1' },
        { id: 1, x: 0, direction: SupportDirection.Fy, name: 'R_Fy_1' },
      ]
      const beamAnalyzer3 = new BeamAnalyzer({ supports: supports3, loads })
      const solvedSupports3 = beamAnalyzer3.solveReactionForces()
      expect(solvedSupports3[0]).toBe(6000)
      expect(solvedSupports3[1]).toBe(-100)
      expect(solvedSupports3[2]).toBe(300)

      const supports4 = [
        { id: 1, x: 0, direction: SupportDirection.Mz, name: 'R_Mz_1' },
        { id: 1, x: 0, direction: SupportDirection.Fy, name: 'R_Fy_1' },
        { id: 1, x: 0, direction: SupportDirection.Fx, name: 'R_Fx_1' },
      ]
      const beamAnalyzer4 = new BeamAnalyzer({ supports: supports4, loads })
      const solvedSupports4 = beamAnalyzer4.solveReactionForces()
      expect(solvedSupports4[0]).toBe(6000)
      expect(solvedSupports4[1]).toBe(300)
      expect(solvedSupports4[2]).toBe(-100)

      const supports5 = [
        { id: 1, x: 0, direction: SupportDirection.Fy, name: 'R_Fy_1' },
        { id: 1, x: 0, direction: SupportDirection.Fx, name: 'R_Fx_1' },
        { id: 1, x: 0, direction: SupportDirection.Mz, name: 'R_Mz_1' },
      ]
      const beamAnalyzer5 = new BeamAnalyzer({ supports: supports5, loads })
      const solvedSupports5 = beamAnalyzer5.solveReactionForces()
      expect(solvedSupports5[0]).toBe(300)
      expect(solvedSupports5[1]).toBe(-100)
      expect(solvedSupports5[2]).toBe(6000)

      const supports6 = [
        { id: 1, x: 0, direction: SupportDirection.Fy, name: 'R_Fy_1' },
        { id: 1, x: 0, direction: SupportDirection.Mz, name: 'R_Mz_1' },
        { id: 1, x: 0, direction: SupportDirection.Fx, name: 'R_Fx_1' },
      ]
      const beamAnalyzer6 = new BeamAnalyzer({ supports: supports6, loads })
      const solvedSupports6 = beamAnalyzer6.solveReactionForces()
      expect(solvedSupports6[0]).toBe(300)
      expect(solvedSupports6[1]).toBe(6000)
      expect(solvedSupports6[2]).toBe(-100)
    })
  })
})
