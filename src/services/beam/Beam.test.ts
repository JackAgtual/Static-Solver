import Beam, { NewLoad, NewSupport, Load, Support, SupportDirection } from './Beam'

describe('Beam', () => {
  const beamLength = 20
  let beam: Beam
  beforeEach(() => {
    beam = new Beam(beamLength)
  })

  describe('addLoad', () => {
    it('does not allow loads to be applied off of the beam', () => {
      const overBoundsLoad: NewLoad = {
        x: 30,
        fx: 30,
        fy: 0,
        mz: 0,
      }
      const negativeXLoad: NewLoad = {
        x: -3,
        fx: 0,
        fy: -11,
        mz: 0,
      }
      expect(() => beam.addLoad(overBoundsLoad)).toThrowError()
      expect(() => beam.addLoad(negativeXLoad)).toThrowError()
    })

    it('allows loads to be added on the boundary', () => {
      const boundaryLoad: NewLoad = {
        x: beamLength,
        fx: 0,
        fy: -200,
        mz: 0,
      }
      expect(() => beam.addLoad(boundaryLoad)).not.toThrowError()
    })

    it('adds load to beam instance', () => {
      const goodLoad: NewLoad = {
        x: 10,
        fx: 0,
        fy: 200,
        mz: 0,
      }
      beam.addLoad(goodLoad)
      expect(beam.loads.length).toBe(1)
      const addedLoad = beam.loads[0]
      expect(addedLoad.hasOwnProperty('id')).toBeTruthy()
      expect(addedLoad.id).toBeTruthy()
    })

    it('does not allow a load to be added at the same location', () => {
      const load: NewLoad = {
        x: 15,
        fx: -30,
        fy: 1000,
        mz: 10,
      }
      const loadAtSameLocation: NewLoad = {
        x: 15,
        fx: 0,
        fy: 0,
        mz: 300,
      }
      beam.addLoad(load)
      expect(() => beam.addLoad(loadAtSameLocation)).toThrowError()
      expect(beam.loads).toHaveLength(1)
    })

    it('generates an enumerated id for the load', () => {
      const load1: NewLoad = {
        x: 1,
        fx: 0,
        fy: -200,
        mz: 0,
      }
      const load2: NewLoad = {
        x: 3,
        fx: 0,
        fy: -200,
        mz: 0,
      }

      const oneLoad = beam.addLoad(load1)
      const twoLoads = beam.addLoad(load2)

      expect(oneLoad[0].id).toBe(1)
      expect(twoLoads[0].id).toBe(1)
      expect(twoLoads[1].id).toBe(2)
    })
  })

  describe('addSupport', () => {
    it('does not add supports out of bounds', () => {
      const negativeXSupport: NewSupport = {
        x: -1,
        rfx: true,
        rfy: false,
        rmz: false,
      }
      const outOfBoundsSupport: NewSupport = {
        x: beamLength + 3,
        rfx: false,
        rfy: false,
        rmz: true,
      }

      expect(() => beam.addSupport(negativeXSupport)).toThrowError()
      expect(() => beam.addSupport(outOfBoundsSupport)).toThrowError()
    })

    it('adds valid support to beam instance', () => {
      const validSupport1: NewSupport = {
        x: 4,
        rfx: true,
        rfy: true,
        rmz: false,
      }
      const validSupport2: NewSupport = {
        x: 5,
        rfx: false,
        rfy: true,
        rmz: false,
      }
      const oneSupport = beam.addSupport(validSupport1)
      expect(oneSupport.length).toBe(2)
      const allSupports = beam.addSupport(validSupport2)
      expect(allSupports.length).toBe(3)
    })

    it('does not allow repeat supports', () => {
      const existingSupport: NewSupport = {
        x: 10,
        rfx: true,
        rfy: false,
        rmz: false,
      }
      const repeatSupport: NewSupport = {
        x: 10,
        rfx: true,
        rfy: false,
        rmz: false,
      }

      beam.addSupport(existingSupport)
      expect(() => beam.addSupport(repeatSupport)).toThrowError()
    })

    it('does not allow supports to be added one component at a time', () => {
      const x = 10
      const rxSupport: NewSupport = {
        x,
        rfx: true,
        rfy: false,
        rmz: false,
      }
      const rySupport: NewSupport = {
        x,
        rfx: false,
        rfy: true,
        rmz: false,
      }
      const rmzSupport: NewSupport = {
        x,
        rfx: false,
        rfy: false,
        rmz: true,
      }
      expect(() => beam.addSupport(rxSupport)).not.toThrowError()
      expect(() => beam.addSupport(rySupport)).toThrowError()
      expect(() => beam.addSupport(rmzSupport)).toThrowError()
    })

    it('generates an enumerated id for the support', () => {
      const support1: NewSupport = {
        x: 0,
        rfx: true,
        rfy: true,
        rmz: false,
      }
      const support2: NewSupport = {
        x: 10,
        rfx: false,
        rfy: true,
        rmz: false,
      }
      const oneSupport = beam.addSupport(support1)
      const twoSupports = beam.addSupport(support2)

      expect(oneSupport[0].id).toBe(1)
      expect(twoSupports[0].id).toBe(1)
      expect(twoSupports[1].id).toBe(1)
      expect(twoSupports[2].id).toBe(2)
    })

    it('generates a valid name for each support', () => {
      const cantilever: NewSupport = {
        x: 0,
        rfx: true,
        rfy: true,
        rmz: true,
      }
      const cantileverSupport = beam.addSupport(cantilever)

      expect(cantileverSupport[0].name).toBe('R_Fx_1')
      expect(cantileverSupport[1].name).toBe('R_Fy_1')
      expect(cantileverSupport[2].name).toBe('R_Mz_1')

      const simplySupportedBeam = new Beam(20)
      const support1: NewSupport = {
        x: 0,
        rfx: true,
        rfy: true,
        rmz: false,
      }
      const support2: NewSupport = {
        x: 20,
        rfx: false,
        rfy: true,
        rmz: false,
      }
      simplySupportedBeam.addSupport(support1)
      const supports = simplySupportedBeam.addSupport(support2)

      expect(supports[0].name).toBe('R_Fx_1')
      expect(supports[1].name).toBe('R_Fy_1')
      expect(supports[2].name).toBe('R_Fy_2')
    })

    it.todo('populates a direction for the added support')
  })

  describe('removeLoad', () => {
    let getLoadsMock = jest.spyOn(Beam.prototype, 'loads', 'get')

    beforeEach(() => {
      getLoadsMock.mockClear()
    })

    it('gets loads from the beam instance', () => {
      beam.removeLoad(3)
      expect(getLoadsMock).toBeCalledTimes(1)
    })

    it('does not remove a load if load id does not exist', () => {
      const addedLoads: Load[] = [
        {
          id: 1,
          x: 1,
          fx: 0,
          fy: 100,
          mz: 0,
        },
        {
          id: 2,
          x: 1,
          fx: 0,
          fy: 100,
          mz: 0,
        },
      ]
      getLoadsMock.mockReturnValue(addedLoads)
      const removedLoadThatDidntExist = beam.removeLoad(12)

      expect(addedLoads).toEqual(expect.arrayContaining(removedLoadThatDidntExist))
      expect(removedLoadThatDidntExist).toEqual(expect.arrayContaining(addedLoads))
    })

    it('removes an existing load from the beam instance', () => {
      const addedLoads: Load[] = [
        {
          id: 1,
          x: 1,
          fx: 1,
          fy: 1,
          mz: 1,
        },
        {
          id: 2,
          x: 2,
          fx: 2,
          fy: 2,
          mz: 2,
        },
        {
          id: 3,
          x: 3,
          fx: 3,
          fy: 3,
          mz: 3,
        },
      ]

      getLoadsMock.mockReturnValue(addedLoads)
      const remainingLoads = beam.removeLoad(2)

      const expectedRemainingLoads = [
        {
          id: 1,
          x: 1,
          fx: 1,
          fy: 1,
          mz: 1,
        },
        {
          id: 2,
          x: 3,
          fx: 3,
          fy: 3,
          mz: 3,
        },
      ]

      expect(expectedRemainingLoads).toEqual(expect.arrayContaining(remainingLoads))
      expect(remainingLoads).toEqual(expect.arrayContaining(expectedRemainingLoads))
    })
  })

  describe('removeSupport', () => {
    let getSupportsMock = jest.spyOn(Beam.prototype, 'supports', 'get')

    beforeEach(() => {
      getSupportsMock.mockClear()
    })

    it('gets support from the beam instance for invalid load removal', () => {
      beam.removeSupport(3)
      expect(getSupportsMock).toBeCalledTimes(1)
    })

    it('gets support from the beam instance for valid load removal', () => {
      beam.addSupport({ x: 0, rfx: true, rfy: true, rmz: true })
      beam.removeSupport(1)
      expect(getSupportsMock).toBeCalledTimes(1)
    })

    it('does not remove a support if support id does not exist', () => {
      const addedSupports: Support[] = [
        {
          id: 1,
          x: 0,
          direction: SupportDirection.Fx,
          name: 'R_Fx_1',
        },
        {
          id: 1,
          x: 0,
          direction: SupportDirection.Fy,
          name: 'R_Fy_1',
        },
        {
          id: 2,
          x: 10,
          direction: SupportDirection.Fy,
          name: 'R_Fy_2',
        },
      ]

      getSupportsMock.mockReturnValue(addedSupports)
      const removedSupportThatDidntExist = beam.removeSupport(12)

      expect(addedSupports).toEqual(expect.arrayContaining(removedSupportThatDidntExist))
      expect(removedSupportThatDidntExist).toEqual(expect.arrayContaining(addedSupports))
    })

    it('removes an existing support from the beam instance', () => {
      const addedSupports: Support[] = [
        {
          id: 1,
          x: 0,
          direction: SupportDirection.Fy,
          name: 'R_Fy_1',
        },
        {
          id: 2,
          x: 10,
          direction: SupportDirection.Fy,
          name: 'R_Fy_2',
        },
        {
          id: 3,
          x: 15,
          direction: SupportDirection.Fx,
          name: 'R_Fx_3',
        },
      ]

      getSupportsMock.mockReturnValue(addedSupports)
      const remainingSupports = beam.removeSupport(1)

      const expectedRemainingSupports: Support[] = [
        {
          id: 1,
          x: 10,
          direction: SupportDirection.Fy,
          name: 'R_Fy_1',
        },
        {
          id: 2,
          x: 15,
          direction: SupportDirection.Fx,
          name: 'R_Fx_2',
        },
      ]

      expect(expectedRemainingSupports).toEqual(expect.arrayContaining(remainingSupports))
      expect(remainingSupports).toEqual(expect.arrayContaining(expectedRemainingSupports))
    })
  })
})
