import { daysInRangeIncl, incrementDate, nDaysFromDate, validateDateStr } from "../utils/dates"

describe("dateUtil", () => {
  describe("validateDateStr", () => {
    it("does nothing when passed valid date string", async () => {
      expect(()=> validateDateStr('2020-08-12')).not.toThrow()
      expect(()=> validateDateStr('1970-01-01')).not.toThrow()
    })
    it("throws error if invalid date format", async () => {
      expect(()=> validateDateStr('202-08-12')).toThrow()
      expect(()=> validateDateStr('-2020-08-12')).toThrow()
      expect(()=> validateDateStr('')).toThrow()
      expect(()=> validateDateStr('aaaaaa')).toThrow()
      expect(()=> validateDateStr('20200810')).toThrow()
    })
    it("throws error if invalid date", async () => {
      expect(()=> validateDateStr('2020-50-01')).toThrow()
      expect(() => validateDateStr('2020-12-50')).toThrow()
      expect(()=> validateDateStr('2020-02-32')).toThrow()
    })
  })

  describe('nDaysFromDate', () => {
    it('returns date str with correct day offset', async () => {
      expect(nDaysFromDate('2020-08-12', 0)).toMatch('2020-08-12')
      expect(nDaysFromDate('2020-08-12', 1)).toMatch('2020-08-13')
      expect(nDaysFromDate('2020-08-12', -1)).toMatch('2020-08-11')
      expect(nDaysFromDate('2020-08-12', 30)).toMatch('2020-09-11')
      expect(nDaysFromDate('2020-08-12', -30)).toMatch('2020-07-13')
      expect(nDaysFromDate('2020-12-01', 90)).toMatch('2021-03-01')
      expect(nDaysFromDate('2021-03-01', -90)).toMatch('2020-12-01')
      expect(nDaysFromDate('2020-02-28', 1)).toMatch('2020-02-29') // leap year
      expect(nDaysFromDate('2020-02-28', 2)).toMatch('2020-03-01') // leap year
      expect(nDaysFromDate('2021-02-28', 1)).toMatch('2021-03-01') // not leap year
    })
    it('throws error if invalid date str passed', async () => {
      expect(() => nDaysFromDate('202-08-12', 1)).toThrow()
      expect(() => nDaysFromDate('-2020-08-12', 1)).toThrow()
      expect(() => nDaysFromDate('', 1)).toThrow()
      expect(() => nDaysFromDate('aaaaaa', 1)).toThrow()
      expect(() => nDaysFromDate('20200810', 1)).toThrow()
      expect(() => nDaysFromDate('2020-50-12', 1)).toThrow()
    })
  })

  describe('daysInRangeIncl', () => {
    it('returns accurate number of days between two dates', async () => {
      expect(daysInRangeIncl('2020-08-12', '2020-08-13')).toBe(2)
      expect(daysInRangeIncl('2020-08-12', '2020-08-14')).toBe(3)
      expect(daysInRangeIncl('2020-08-12', '2020-08-12')).toBe(1)
      expect(daysInRangeIncl('2020-12-25', '2021-01-03')).toBe(10)
      expect(daysInRangeIncl('2020-01-01', '2020-12-31')).toBe(366)
    })
  })
  describe('incrementDate', () => {
    it('returns accurate number of days between two dates', async () => {
      expect(incrementDate('2020-08-12')).toMatch('2020-08-13')
      expect(incrementDate('2020-12-31')).toMatch('2021-01-01')
      expect(incrementDate('2020-02-28')).toMatch('2020-02-29') // leap year
    })
  })
})