import { Component } from '@angular/core';
import { DiseaseService } from 'src/app/service/disease/disease.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  identifiers: any[] = [];
  selectedIdentifier: string = '';
  selectedLanguage: string = '';

  constructor(private _diseaseService: DiseaseService) {}

  diseaseData: any;

  ngOnInit(): void {
    this.getIdentifiers();
  }

  getIdentifiers(): void {
    this._diseaseService.getIdentifiers().subscribe(
      (data) => {
        this.identifiers = data;
      },
      (error) => {
        console.error('Failed to fetch identifiers:', error);
      }
    );
  }

  getDiseaseData(): void {
    if (this.selectedIdentifier && this.selectedLanguage) {
      this._diseaseService.getDisease(this.selectedIdentifier, this.selectedLanguage).subscribe(
        (data) => {
          this.diseaseData = data;
          console.log('Disease data:', this.diseaseData);
          // Handle the fetched disease data here
        },
        (error) => {
          console.error('Failed to fetch disease data:', error);
        }
      );
    }
  }
}
