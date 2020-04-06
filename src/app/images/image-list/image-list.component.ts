import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  imageList: any[];
  rowIndex: any[];

  constructor( private service: ImageService ) { }

  ngOnInit(): void {
    this.service.imageDetailsList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => item.payload.val() );
        this.rowIndex = Array.from(Array(Math.ceil((this.imageList.length + 1) / 3)).keys());
      }
    );
  }

}
