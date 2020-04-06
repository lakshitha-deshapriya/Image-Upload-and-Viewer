import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageDetailsList: AngularFireList<any>;

  constructor( private fireBase: AngularFireDatabase ) { }

  getImageDetailsList()
  {
    this.imageDetailsList = this.fireBase.list('imageDetails');
  }

  insertImageDetails( imageDetails )
  {
    this.imageDetailsList.push(imageDetails);
  }
}
