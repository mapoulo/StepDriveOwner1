import { Component, OnInit } from '@angular/core';
import { SaveDataService } from '../save-data.service';


@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  Mydata : any;

  constructor(public data: SaveDataService) {
    
   }

   ionViewWillEnter(){
    this.Mydata = this.data.DataSaved;
    console.log('This is my data', this.Mydata);
    
   }

  ngOnInit() {
  }

}
