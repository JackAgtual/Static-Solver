import Beam, { Load } from './Beam'

describe('Beam', () => {
  const beamLength = 20
  let beam: Beam
  beforeEach(() => {
    beam = new Beam(beamLength)
  })

  describe('addLoad', () => {
    it('does not allow loads to be applied off of the beam', () => {
      const overBoundsLoad: Load = {
        x: 30,
        fx: 30,
      }
      expect(() => beam.addLoad(overBoundsLoad)).toThrowError()
    })

    it('does not allow negative x loads to be added', () => {
      expect(() => beam.addLoad)
    })

    it('allows loads to be added on the boundary', () => {
      const boundaryLoad: Load = { x: beamLength, fy: -200 }
      expect(() => beam.addLoad(boundaryLoad)).not.toThrowError()
    })

    it('adds load to beam instance', () => {
      const goodLoad: Load = {
        x: 10,
        fy: 200,
      }
      beam.addLoad(goodLoad)
      expect(beam.loads.length).toBe(1)
    })

    it('can add a load at the same location', () => {
      const repeatLoad: Load = {
        x: 15,
        fx: -30,
        fy: 1000,
        mz: 10,
      }
      beam.addLoad(repeatLoad)
      beam.addLoad(repeatLoad)
      expect(beam.loads.length).toBe(2)
    })
  })
})
