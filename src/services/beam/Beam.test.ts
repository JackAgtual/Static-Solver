import Beam, { Load, Support } from './Beam'

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
        fy: 0,
        mz: 0,
      }
      const negativeXLoad: Load = {
        x: -3,
        fx: 0,
        fy: -11,
        mz: 0,
      }
      expect(() => beam.addLoad(overBoundsLoad)).toThrowError()
      expect(() => beam.addLoad(negativeXLoad)).toThrowError()
    })

    it('allows loads to be added on the boundary', () => {
      const boundaryLoad: Load = {
        x: beamLength,
        fx: 0,
        fy: -200,
        mz: 0,
      }
      expect(() => beam.addLoad(boundaryLoad)).not.toThrowError()
    })

    it('adds load to beam instance', () => {
      const goodLoad: Load = {
        x: 10,
        fx: 0,
        fy: 200,
        mz: 0,
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

  describe('addSupport', () => {
    it('does not add supports out of bounds', () => {
      const negativeXSupport: Support = {
        x: -1,
        rfx: true,
        rfy: false,
        rmz: false,
      }
      const outOfBoundsSupport: Support = {
        x: beamLength + 3,
        rfx: false,
        rfy: false,
        rmz: true,
      }

      expect(() => beam.addSupport(negativeXSupport)).toThrowError()
      expect(() => beam.addSupport(outOfBoundsSupport)).toThrowError()
    })

    it('adds valid support to beam instance', () => {
      const validSupport1: Support = {
        x: 4,
        rfx: true,
        rfy: true,
        rmz: false,
      }
      const validSupport2: Support = {
        x: 5,
        rfx: false,
        rfy: true,
        rmz: false,
      }
      beam.addSupport(validSupport1)
      expect(beam.supports.length).toBe(1)
      beam.addSupport(validSupport2)
      expect(beam.supports.length).toBe(2)
    })

    it('does not allow repeat supports', () => {
      const existingLoad: Support = {
        x: 10,
        rfx: true,
        rfy: false,
        rmz: false,
      }
      const repeatSupport: Support = {
        x: 10,
        rfx: true,
        rfy: false,
        rmz: false,
      }
      beam.addSupport(existingLoad)
      expect(() => beam.addSupport(repeatSupport)).toThrowError()
    })

    it('allows supports to be added one component at a time', () => {
      const x = 10
      const rxSupport: Support = {
        x,
        rfx: true,
        rfy: false,
        rmz: false,
      }
      const rySupport: Support = {
        x,
        rfx: false,
        rfy: true,
        rmz: false,
      }
      const rmzSupport: Support = {
        x,
        rfx: false,
        rfy: false,
        rmz: true,
      }
      expect(() => beam.addSupport(rxSupport)).not.toThrowError()
      expect(() => beam.addSupport(rySupport)).not.toThrowError()
      expect(() => beam.addSupport(rmzSupport)).not.toThrowError()
    })
  })
})
