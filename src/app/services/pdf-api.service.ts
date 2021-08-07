import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Pdf } from '../interfaces/pdf';

@Injectable({
  providedIn: 'root'
})
export class PdfApiService {
  private readonly baseURL: string = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  generatePdf(pdfTitle: string, url: string): Observable<Pdf> {
    return this.http.post<Pdf>(`${this.baseURL}/pdf`, { pdfTitle, url })
  }
}
