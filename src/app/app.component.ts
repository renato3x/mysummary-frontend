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

      this.pdfApiService.generatePdf(pdfTitle, url).subscribe(response => {
        console.log(response)
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
