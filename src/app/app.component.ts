import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showPdfGenerationView: boolean = false
  removeMainContent: boolean = false

  startPdfGeneration() {
    this.showPdfGenerationView = true
    setTimeout(() => {
      this.removeMainContent = true
    }, 500)
  }
}
