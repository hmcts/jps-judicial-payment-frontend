import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompareRecordsComponent } from './compare-records.component';
import { CompareRecordsWorkflowService } from 'src/app/_workflows/compare-record-workflow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('CompareRecordsComponent', () => {
  let component: CompareRecordsComponent;
  let fixture: ComponentFixture<CompareRecordsComponent>;
  let comparisonWorkflow: CompareRecordsWorkflowService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompareRecordsComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareRecordsComponent);
    component = fixture.componentInstance;
    comparisonWorkflow = TestBed.inject(CompareRecordsWorkflowService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update pageSizing when a file is selected', () => {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([''], 'test-file.pdf'))

    const inputDebugEl  = fixture.debugElement.query(By.css('input[type=file]'));
    inputDebugEl.nativeElement.files = dataTransfer.files;

    inputDebugEl.nativeElement.dispatchEvent(new InputEvent('change'));

    fixture.detectChanges();

    expect(component.selectedFile).toBeTruthy()
  });

  it('should not update pageSizing when no file is selected', () => {
    const event = { target: { files: [] } } as unknown as Event;

    component.onFileSelected(event);

    expect(component.pageSizing).toBe(0);
  });

  it('should call onUpload when a file is selected', () => {
    const file = new File(['test'], 'test.txt');
    const event = { target: { files: [file] } } as unknown as Event;
    spyOn(component, 'onUpload');

    component.onFileSelected(event);

    expect(component.onUpload).toHaveBeenCalled();
  });

  it('should not call onUpload when no file is selected', () => {
    const event = { target: { files: [] } } as unknown as Event;
    spyOn(component, 'onUpload');

    component.onFileSelected(event);

    expect(component.onUpload).not.toHaveBeenCalled();
  });

  it('should call comparisonWorkFlow.getSittingRecordsData when onUpload is called with a selected file', () => {
    const file = new File(['test'], 'test.txt');
    component.selectedFile = file;
    spyOn(comparisonWorkflow, 'getSittingRecordsData').and.returnValue(of({ sittingRecords:[] }));

    component.onUpload();

    expect(comparisonWorkflow.getSittingRecordsData).toHaveBeenCalledWith(0);
  });

  it('should not call comparisonWorkFlow.getSittingRecordsData when onUpload is called without a selected file', () => {
    component.selectedFile = null;
    spyOn(comparisonWorkflow, 'getSittingRecordsData');

    component.onUpload();

    expect(comparisonWorkflow.getSittingRecordsData).not.toHaveBeenCalled();
  });


});