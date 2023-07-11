import { Component, OnInit, Inject } from '@angular/core';
import { ImageService } from 'src/app/service/image/image.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  imageForm!: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _snackBarService: SnackBarService,
    private _imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.imageForm = this._fb.group({
      disease: ['', Validators.required],
      image: this._fb.array([])
    });
  }

  onChangeFile(event: any, index: number): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageControl = this.imageForm.get('image') as FormArray;
      imageControl.at(index).setValue(files[0]);
    }
  }

  removeImage(index: number): void {
    const imageControl = this.imageForm.get('image') as FormArray;
    imageControl.removeAt(index);
  }

  addImage(): void {
    const imageControl = this.imageForm.get('image') as FormArray;
    imageControl.push(new FormControl(null));
  }

  uploadImages(): void {
    if (this.imageForm.valid) {
      const diseaseId = this.imageForm.value.disease;
      const formData = new FormData();

      // Append disease ID to all images
      const images = this.imageForm.value.image;
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        formData.append(`image${i + 1}`, image);
        formData.append(`disease${i + 1}`, diseaseId);
      }

      this._imageService.addImage(formData).subscribe(
        (response) => {
          // Handle success
          console.log('Images uploaded successfully', response);
          // Reset the form
          this.imageForm.reset();
          // Show success message
          this._snackBarService.openSnackBar('Images uploaded successfully');
        },
        (error) => {
          // Handle error
          console.error('Error uploading images', error);
          // Show error message
          this._snackBarService.openSnackBar('Error uploading images');
        }
      );
    } else {
      // Handle form validation errors
      this._snackBarService.openSnackBar('Please fill in all required fields');
    }
  }

}
