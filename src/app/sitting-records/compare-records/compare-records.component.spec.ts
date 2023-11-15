import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompareRecordsComponent } from './compare-records.component';
import { CompareRecordsWorkflowService } from 'src/app/_workflows/compare-record-workflow.service';
import { of } from 'rxjs';

describe('CompareRecordsComponent', () => {
  let component: CompareRecordsComponent;
  let fixture: ComponentFixture<CompareRecordsComponent>;
  const mockCompareRecordsWorkflowService = jasmine.createSpyObj(['getSittingRecordsData']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareRecordsComponent ],
      providers: [
        { provide: CompareRecordsWorkflowService, useValue: mockCompareRecordsWorkflowService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle file selection and set page sizing', () => {
    const mockFile = new File([''], 'test.txt', { type: 'text/plain', lastModified: Date.now() });
    const mockEvt = { target: { files: [mockFile] } } as unknown as Event;
    component.onFileSelected(mockEvt);

    expect(component.selectedFile).toEqual(mockFile);
    expect(component.pageSizing).toBeCloseTo(mockFile.size * 1.2);
  });

  it('should not upload when no file is selected', () => {
    spyOn(console, 'log');

    component.onUpload();

    expect(console.log).toHaveBeenCalledWith(null);
  });

  it('should call getSittingRecordsData on upload', () => {
    const mockFile = new File([''], 'test.txt', { type: 'text/plain', lastModified: Date.now() });
    component.selectedFile = mockFile;
    mockCompareRecordsWorkflowService.getSittingRecordsData.and.returnValue(of({}));

    component.onUpload();

    expect(mockCompareRecordsWorkflowService.getSittingRecordsData).toHaveBeenCalledWith(0);
  });

  // Additional test cases...
});
