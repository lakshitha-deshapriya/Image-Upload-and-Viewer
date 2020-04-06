import { Component, OnInit } from '@angular/core';
import {ImageService} from '../services/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  constructor( private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getImageDetailsList();
  }

}
