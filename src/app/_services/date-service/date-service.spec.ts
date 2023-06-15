import { TestBed } from '@angular/core/testing';
import { DateService, dateObj } from './date-service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('formatDateFromForm', () => {
    it('should format the date correctly', () => {
      const date: dateObj = { dateDay: '01', dateMonth: '01', dateYear: '2023' };
      const formattedDate = service.formatDateFromForm(date);
      expect(formattedDate).toEqual('01/01/2023');
    });
  });

  describe('convertPeriod', () => {
    it('should convert the period correctly', () => {
      expect(service.convertPeriod('am')).toBe('Morning');
      expect(service.convertPeriod('pm')).toBe('Afternoon');
      expect(service.convertPeriod('both')).toBe('Full Day');
      expect(service.convertPeriod('')).toBe('');
    });
  });
});
