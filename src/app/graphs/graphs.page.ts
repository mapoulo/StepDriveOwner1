import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import * as firebase from 'firebase';
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.page.html',
  styleUrls: ['./graphs.page.scss'],
})
export class GraphsPage implements OnInit {
  
  @ViewChild('barChart', {static: false}) barChart;
//database 
db = firebase.firestore();
//array from database
data =[];

  bars: any;
  colorArray: any;
  constructor() {
    this.db.collection('businesses').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        // this.users = doc.data();
        this.data.push(doc.data());
        console.log('The number of bookings is:',this.data.length);
        
        
      })
    });
    
   }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'Augu','Sep','Oct','Nov','Dec',],
        datasets: [{
          label: 'Lessons offered per week',
          data: [9.0, 3.8, 5, 6.9, 6.9, 7.5, 10, 17, 18,19, 15,16],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
}
}
