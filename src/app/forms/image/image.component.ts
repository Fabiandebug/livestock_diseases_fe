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
export class ImageComponent {
  imageForm!: FormGroup;

  // @Inject(MAT_DIALOG_DATA) public data: any,
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _snackBarService: SnackBarService,
    private _imageService: ImageService
  ) {
    const diseaseId = this.data.diseaseId;
  }

  ngOnInit() {
    this.imageForm=this._fb.group({
      disease:[null,Validators.required],
      description:[null,Validators.required],
      image:[null,Validators.required]
    });
  }

  uploadFile(event:any) {
    console.log("file selected");

    const inputEvent = event as InputEvent;
    const target = inputEvent.target as HTMLInputElement;
    const file = target?.files?.[0];

    if (file) {
      console.log("File selected:", file);
    } else {
      console.log("No file selected.");
    }

    this.imageForm.patchValue({
      image: file
    });
    this.imageForm.get('image')?.updateValueAndValidity();

  }
  submitForm() {
    const formData:any=new FormData();

    formData.append('disease',this.data.diseaseId)
    formData.append('description',this.imageForm.get('description')?.value)
    formData.append('image',this.imageForm.get('image')?.value)

     // Check if image or description is empty
    if (!formData.get('description') || !formData.get('image')) {
      this._snackBarService.openSnackBar('Please enter both image and description', 'Close');
      return; // Exit the method if fields are empty
    }

    console.log('Form Data Values:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    this._imageService.addImage(formData).subscribe(
      (imageResponse) => {
        this._snackBarService.openSnackBar('Image Uploaded Successfully', 'Close');
      },
      (imageError) => {
        this._snackBarService.openSnackBar('Upload Failed', 'Close');
        console.error(imageError);
      }
    );
  }


  clearFields(fileInput: any) {
    this.imageForm.reset();
    fileInput.nativeElement.value = ''; // Clear the file input value
  }
}
