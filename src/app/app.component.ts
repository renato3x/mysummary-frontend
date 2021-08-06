import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mainContentOpacity: number = 1
  pdfGenerationViewOpacity: number = 0
  removeMainContent: boolean = false

  startPdfGeneration() {
    this.mainContentOpacity = 0
    setTimeout(() => {
      this.removeMainContent = true
      this.pdfGenerationViewOpacity = 1
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
