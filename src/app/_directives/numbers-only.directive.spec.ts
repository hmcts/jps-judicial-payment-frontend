import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { NumberDirective } from './numbers-only.directive';

@Component({
  template: `<input type="text" appNumbersOnly >`
})
class TestComponent {}

describe('NumberDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent, NumberDirective ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new NumberDirective(inputEl);
    expect(directive).toBeTruthy();
  });

  it('should restrict input to numbers only on keydown event', () => {
    const event = new KeyboardEvent('keydown', { key: 'a' });
    inputEl.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe('');
  });

  it('should allow navigation keys on keydown event', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    inputEl.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe('');
  });
});