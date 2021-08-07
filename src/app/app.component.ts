import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import validator from 'validator';
import { PdfApiService } from './services/pdf-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mainContentOpacity: number = 1
  pdfGenerationViewOpacity: number = 0
  removeMainContent: boolean = false
  pdfDownloadUrl: string | null = null
  loadingContentOpacity: number = 1
  successContentOpacity: number = 0
  errorContentOpacity: number = 0
  errorMessage: string | null = null

  title: FormControl = new FormControl('', [
    Validators.required
  ])

  url: FormControl = new FormControl('', [
    Validators.required
  ])

  constructor(private pdfApiService: PdfApiService) {}

  startPdfGeneration(): void | any {
    if (!validator.isURL(this.url.value)) {
      alert('A URL informada é inválida')
      this.url.setErrors(Validators.required)
      return
    }

    this.mainContentOpacity = 0
    setTimeout(() => {
      this.removeMainContent = true
      this.pdfGenerationViewOpacity = 1

      let pdfTitle = this.title.value
      let url = this.url.value

      this.pdfApiService.generatePdf(pdfTitle, url).subscribe(({ pdfUrl }) => {
        this.loadingContentOpacity = 0
        setTimeout(() => {
          this.pdfDownloadUrl = pdfUrl
          this.successContentOpacity = 1
        }, 500)
      }, (error: HttpErrorResponse) => {
        this.loadingContentOpacity = 0
        setTimeout(() => {
          this.errorMessage = error.error.message
          this.errorContentOpacity = 1
        }, 500)
      })
    }, 500)
  }

  reset() {
    this.pdfGenerationViewOpacity = 0
    setTimeout(() => {
      this.removeMainContent = false
      setTimeout(() => {
        this.mainContentOpacity = 1
      }, 15)
    }, 500)
  }
}
