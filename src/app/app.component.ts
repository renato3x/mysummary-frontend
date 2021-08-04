import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import validator from 'validator'
import { PdfApiService } from './services/pdf-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showGenerationPdfView: boolean | null = null
  pdfNotYetGenerated: boolean = true
  downloadUrl: string = ''
  pdfSuccess: boolean | null = null
  pdfError: boolean | null = null
  errorMessage: string = ''

  //controls
  pdfTitle: FormControl = new FormControl('', [Validators.required])
  pdfUrl: FormControl = new FormControl('', [Validators.required])

  constructor(private pdfApiService: PdfApiService) {}

  startPdfGeneration() {
    if (!validator.isURL(this.pdfUrl.value)) {
      this.pdfUrl.setErrors(Validators.required)
      alert('A URL informada não é funcional.')
    } else {
      this.showGenerationPdfView = true
      this.pdfApiService.generatePdf(this.pdfTitle.value, this.pdfUrl.value).subscribe(({ pdfUrl }) => {
        this.downloadUrl = pdfUrl
        this.pdfSuccess = true
        this.pdfError = false
        this.pdfNotYetGenerated = false
      }, (error: HttpErrorResponse) => {
        this.pdfError = true
        this.pdfSuccess = false
        this.pdfNotYetGenerated = false
        this.errorMessage = error.error.message
      })
    }
  }

  reset() {
    this.showGenerationPdfView = false
    this.downloadUrl = ''
    this.pdfSuccess = null
    this.pdfError = null
    this.errorMessage = ''
    setTimeout(() => {
      this.pdfNotYetGenerated = true
    }, 2000)
  }
}
