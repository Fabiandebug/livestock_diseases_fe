import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DiseaseService } from 'src/app/service/disease/disease.service';
import { ImageService } from 'src/app/service/image/image.service';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { MatDialogRef } from '@angular/material/dialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.css']
})
export class DiseaseComponent implements OnInit {
  public Editor=ClassicEditor

  diseaseForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    private _diseaseService: DiseaseService,
    private _imageService: ImageService,
    private _snackBarService: SnackBarService
  ) {
    this.diseaseForm = this._fb.group({
      identifier: [''],
      language: [''],
      name: [''],
      local_names: [''],
      other_livestock_affected: [''],
      transmission: ['',Validators.required],
      number_affected_in_herd: [''],
      death_rate: [''],
      predisposing_factors: [''],
      key_signs: [''],
      other_signs: [''],
      prevention: [''],
      images: this._fb.array([]) // Add images as a form array for multiple images
    });

  }

  ngOnInit(): void {

  }

  // Helper method to add an image control to the images form array
  addImage() {
    const imageGroup = this._fb.group({
      image: [null],
      description: ['']
    });
    this.images.push(imageGroup);
  }

  // Helper method to remove an image control from the images form array
  removeImage(index: number) {
    this.images.removeAt(index);
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

          // Check if images are available
          const images = this.images.value;
          if (images.some((image:any) => image.image !== null)) {
            this._imageService.addImage({ diseaseId: diseaseId, images: images }).subscribe(
              (imageResponse) => {
                console.log('Image response:', imageResponse); // Check the response from addImage()
                // Handle success response
                this._snackBarService.openSnackBar('Disease information saved successfully');
              },
              (imageError) => {
                console.error('Failed to save images:', imageError); // Log the error response
                this._snackBarService.openSnackBar('Failed to save images');
              }
            );
          } else {
            // No image selected, handle accordingly
            this._snackBarService.openSnackBar('Disease information saved successfully');
          }
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

  // Getter for the images form array
  get images() {
    return this.diseaseForm.get('images') as FormArray;
  }


onChangeFile(event:any){

  if(event.target.files.length>0){
    const file=event.target.files[0];

  }

}



}
