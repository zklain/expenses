import {
  countMonthsDiff,
  countMonthsAvg,
  groupByDay,
  getMonthStartEnd,
} from './query-utils';
import { ExpenseDocType } from '../@types/expense';

describe('query utils', () => {
  describe('getMonthStartEnd', () => {
    it('should return the same months', () => {});

    it('should return 3 months back', () => {});
  });

  describe('countMonthsDiff', () => {
    it('same month', () => {
      const start = new Date('2020-06-01');
      const end = new Date('2020-06-30');
      const res = countMonthsDiff(start, end);
      expect(res).toEqual(0);
    });

    it('1 month', () => {
      const start = new Date('2020-05-01');
      const end = new Date('2020-06-30');
      const res = countMonthsDiff(start, end);
      expect(res).toEqual(1);
    });

    it('2 months', () => {
      const start = new Date('2020-05-01');
      const end = new Date('2020-07-30');
      const res = countMonthsDiff(start, end);
      expect(res).toEqual(2);
    });

    it('Same year', () => {
      const start = new Date('2020-01-01');
      const end = new Date('2020-12-30');
      const res = countMonthsDiff(start, end);
      expect(res).toEqual(11);
    });

    it('4 years span', () => {
      const end = new Date('2020-12-30');
      const start = new Date('2016-11-27');
      const res = countMonthsDiff(start, end);
      expect(res).toBe(49);
    });
  });

  describe('count months avg', () => {
    it('should return avg 0', () => {
      const all: ExpenseDocType[] = [];
      const res = countMonthsAvg(all);
      expect(res).toEqual({ avg: 0, months: [] });
    });

    it('should count single expense correctly', () => {
      const all = [
        {
          id: '2131c8a1-60fc-4216-924c-2ffec03264b6',
          amount: 80,
          createdAt: '2019-12-31T22:00:00.000Z',
          updatedAt: '2019-12-31T22:00:00.000Z',
          category: 'cigaretes',
          name: 'Expanse 7 65',
        },
      ];

      const res = countMonthsAvg(all);
      expect(res.avg).toBe(80);
      expect(res.months[0].total).toBe(0.8);
      expect(res.months[0].name).toBe('Dec');
    });

    it('should count one month properly', () => {
      const all = [
        {
          id: '2131c8a1-60fc-4216-924c-2ffec03264b6',
          amount: 80,
          createdAt: '2019-12-13T22:00:00.000Z',
          updatedAt: '2019-12-13T22:00:00.000Z',
          category: 'cigaretes',
          name: 'Expanse 7 65',
        },

        {
          id: '28f7a4a2-59f2-4d38-aa47-54aeb7827b3f',
          amount: 20,
          createdAt: '2019-12-31T22:00:00.000Z',
          updatedAt: '2019-12-31T22:00:00.000Z',
          category: 'cigaretes',
          name: 'Expanse 7 23',
        },
      ];

      const res = countMonthsAvg(all);

      expect(res.avg).toBe(50);
      expect(res).toStrictEqual({
        avg: 50,
        months: [{ name: 'Dec', total: 1 }],
      });
    });

    it('should count 2 months correctly', () => {});

    it('should count multiple months correctly', () => {
      const all = [
        {
          id: '225ef26b-6a50-4a21-baaa-42f54535f980',
          amount: 90,
          createdAt: '2019-11-27T21:00:00.000Z',
          updatedAt: '2019-11-30T23:00:00.000Z',
          category: 'cigaretes',
          name: 'Expanse 8 37',
        },
        {
          id: '2131c8a1-60fc-4216-924c-2ffec03264b6',
          amount: 80,
          createdAt: '2019-12-20T21:00:00.000Z',
          updatedAt: '2019-12-31T23:00:00.000Z',
          category: 'cigaretes',
          name: 'Expanse 7 65',
        },
        {
          id: '28f7a4a2-59f2-4d38-aa47-54aeb7827b3f',
          amount: 80,
          createdAt: '2019-12-13T21:00:00.000Z',
          updatedAt: '2019-12-31T23:00:00.000Z',
          category: 'cigaretes',
          name: 'Expanse 7 23',
        },
        {
          id: '310b9c47-2518-40b2-96d0-9089bce320a0',
          amount: 70,
          createdAt: '2020-01-31T21:00:00.000Z',
          updatedAt: '2020-01-31T23:00:00.000Z',
          category: 'cigaretes',
          name: 'Expanse 6 65',
        },
      ];

      const res = countMonthsAvg(all);
      expect(res).toStrictEqual({
        avg: 80,
        months: [
          { name: 'Nov', total: 0.9 },
          { name: 'Dec', total: 1.6 },
          { name: 'Jan', total: 0.7 },
        ],
      });

      // todo: test if wrong month is taken
    });
  });

  describe('group by day', () => {
    it('should group by day', () => {
      const testDocs: ExpenseDocType[] = [
        {
          id: '225ef26b-6a50-4a21-baaa-42f54535f980',
          amount: 90,
          createdAt: '2019-11-30T21:00:00.000Z',
          updatedAt: '2019-11-30T23:00:00.000Z',
          category: 'cigaretes',
          name: 'Expanse 8 37',
        },
        {
          id: '225ef26b-6a50-4a21-baaa-42f54535f980',
          amount: 180,
          createdAt: '2019-11-30T21:00:00.000Z',
          updatedAt: '2019-11-30T23:00:00.000Z',
          category: 'cigaretes',
          name: 'Expanse 8 37',
        },
        {
          id: '225ef26b-6a50-4a21-baaa-42f54535f980',
          amount: 90,
          createdAt: '2019-11-30T21:00:00.000Z',
          updatedAt: '2019-11-30T23:00:00.000Z',
          category: 'cigaretes',
          name: 'Expanse 8 37',
        },
        {
          id: '2131c8a1-60fc-4216-924c-2ffec03264b6',
          amount: 84,
          createdAt: '2019-11-31T21:00:00.000Z',
          updatedAt: '2019-11-31T23:00:00.000Z',
          category: 'cigaretes',
          name: 'Expanse 7 65',
        },
        {
          id: '28f7a4a2-59f2-4d38-aa47-54aeb7827b3f',
          amount: 80,
          createdAt: '2019-11-31T21:00:00.000Z',
          updatedAt: '2019-11-31T23:00:00.000Z',
          category: 'cigaretes',
          name: 'Expanse 7 23',
        },
        {
          id: '310b9c47-2518-40b2-96d0-9089bce320a0',
          amount: 70,
          createdAt: '2020-01-15:00:00.000Z',
          updatedAt: '2020-01-15:00:00.000Z',
          category: 'cigaretes',
          name: 'Expanse 6 65',
        },
      ];
      const result = groupByDay(testDocs);
      expect(result.length).toBe(3);
      expect(result[0].length).toBe(1);
      expect(result[1].length).toBe(2);
      expect(result[2].length).toBe(3);
    });

    it('should not throw when empty', () => {
      const res = groupByDay([]);
      expect(res).toBeDefined();
    });
  });
});
