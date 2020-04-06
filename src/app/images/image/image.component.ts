import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required),
  });
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  constructor( private storage: AngularFireStorage,
               private service: ImageService ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  storeImage( event: any ) {
    if (event.target.files && event.target.files[0])
    {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else
    {
      this.imgSrc = '/assets/img/images.jpeg';
      this.selectedImage = null;
    }
  }

  onSubmit(value: any) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      const filePath = `${value.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            value.imageUrl = url;
            this.service.insertImageDetails( value );
            this.resetForm();
          });
        })
      ).subscribe();
    }
  }

  get formControls()
  {
    return this.formTemplate.controls;
  }

  resetForm()
  {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      imageUrl: '',
      category: 'Animal'
    });
    this.imgSrc = '/assets/img/images.jpeg';
    this.isSubmitted = false;
    this.selectedImage = null;
  }
}
