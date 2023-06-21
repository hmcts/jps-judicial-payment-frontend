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
      expect(formattedDate).toEqual('2023-01-01');
    });
  });

  describe('getPeriod', () => {
    it('should return "Full Day" when am and pm are true', () => {
      expect(service.getPeriod("true", "true")).toEqual('Full Day');
    });
  
    it('should return "Morning" when am is true and pm is false', () => {
      expect(service.getPeriod("true", "false")).toEqual('Morning');
    });
  
    it('should return "Afternoon" when pm is true and am is false', () => {
      expect(service.getPeriod("false", "true")).toEqual('Afternoon');
    });
  
    it('should return an empty string when both am and pm are false', () => {
      expect(service.getPeriod("false", "false")).toEqual('');
    });
  });

});
