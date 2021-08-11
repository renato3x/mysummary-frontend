import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import validator from 'validator';
import { RequestData } from './interfaces/request-data';
import { PdfApiService } from './services/pdf-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mainContentOpacity: number = 1
  removeMainContent: boolean = false

  errorMessage: string | null = null
  pdfDownloadUrl: string | null = null

  pdfGenerationViewOpacity: number = 0
  loadingContentOpacity: number = 1
  successContentOpacity: number = 0
  errorContentOpacity: number = 0
  
  requestQuantity: number = 0
  canRequest: boolean = true

  title: FormControl = new FormControl('', [
    Validators.required
  ])

  url: FormControl = new FormControl('', [
    Validators.required
  ])

  constructor(private pdfApiService: PdfApiService, private socket: Socket) {}

  ngOnInit() {
    this.socket.on('requestQuantity', (response: RequestData) => {
      this.requestQuantity = response.requestQuantity
      this.canRequest = response.canRequest
    })
  }

  startPdfGeneration(): void | any {
    if (!validator.isURL(this.url.value)) {
      alert('A URL informada é inválida')
      this.url.setErrors(Validators.required)
      return
    }

    if (!this.canRequest) {
      alert('Não é mais possível gerar PDFs hoje pois o limite já foi alcançado. Tente novamente amanhã.')
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
        this.loadingContentOpacity = 1
        this.errorContentOpacity = 0
        this.successContentOpacity = 0

        this.pdfDownloadUrl = null
        this.errorMessage = null
      }, 15)
    }, 500)
  }
}
