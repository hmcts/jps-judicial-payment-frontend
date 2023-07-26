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
    it('should return "Full Day" when am and pm are passed', () => {
      expect(service.getPeriod("AM", "PM")).toEqual('Full day');
    });
  
    it('should return "Morning" when AM is passed and PM is null', () => {
      expect(service.getPeriod("AM", "null")).toEqual('Morning');
    });
  
    it('should return "Afternoon" when PM is passed and am is null', () => {
      expect(service.getPeriod("null", "PM")).toEqual('Afternoon');
    });
  
    it('should return an empty string when both am and pm are null', () => {
      expect(service.getPeriod("null", "null")).toEqual('');
    });
  });

});
