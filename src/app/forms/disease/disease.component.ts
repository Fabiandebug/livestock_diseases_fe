import  ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DiseaseService } from 'src/app/service/disease/disease.service';
import { ImageService } from 'src/app/service/image/image.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageComponent } from '../image/image.component';



@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['/disease.component.css']
})
export class DiseaseComponent implements OnInit {
  public Editor=ClassicEditor

  diseaseForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _diseaseService: DiseaseService,
    private _imageService: ImageService,
    private _snackBarService: SnackBarService,
    private _dialog:MatDialog
  ) {
    this.diseaseForm = this._fb.group({
      identifier: [''],
      language: [''],
      name: [''],
      local_names: [''],
      other_livestock_affected: [''],
      transmission: [''],
      number_affected_in_herd: [''],
      death_rate: [''],
      predisposing_factors: [''],
      key_signs: [''],
      other_signs: [''],
      prevention: [''],
      images: this._fb.array(['']) // Add images as a form array for multiple images
    });

  }



  ngOnInit(): void {

  }

   // Submit the form
   onSubmit() {
    if (this.diseaseForm.valid) {
      const formData = this.diseaseForm.value;
      // First, save the disease information
      this._diseaseService.addDisease(formData).subscribe(
        (diseaseResponse) => {
          // Handle success response
          const diseaseId = diseaseResponse.id;

          // Handle success response
          this._snackBarService.openSnackBar('Disease information saved successfully');
          this._dialog.open(ImageComponent, {
            data: { diseaseId: diseaseId }
          });
        },
        (diseaseError) => {
          console.error('Failed to save disease information:', diseaseError); // Log the error response
          this._snackBarService.openSnackBar('Failed to save disease information');
        }
      );
    } else {
      // Handle form validation errors
      this._snackBarService.openSnackBar('Please fill in all the required fields');
    }
  }




}
