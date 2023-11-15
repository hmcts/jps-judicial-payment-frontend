import { Component, ElementRef, ViewChild } from '@angular/core';
import { CompareRecordsWorkflowService } from 'src/app/_workflows/compare-record-workflow.service';

@Component({
  selector: 'app-compare-records',
  templateUrl: './compare-records.component.html',
  styleUrls: ['./compare-records.component.scss']
})
export class CompareRecordsComponent {

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | null = null;
  selectedFile: File | null = null;
  pageSizing = 0;

  constructor(
    private comparisonWorkFlow: CompareRecordsWorkflowService,
  ) {}
  
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] || null;

    if (file) {
      const originalSize = file.size;
      this.pageSizing = Math.round(originalSize * 1.2); 
      this.selectedFile = file
      console.log(this.pageSizing)
      this.onUpload();
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      console.log(this.selectedFile)
      return;
    }
    console.log('111')

    this.comparisonWorkFlow.getSittingRecordsData(0)
    .subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })

  }
}
