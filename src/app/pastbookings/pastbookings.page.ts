import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-pastbookings',
  templateUrl: './pastbookings.page.html',
  styleUrls: ['./pastbookings.page.scss'],
})
export class PastbookingsPage implements OnInit {
  
  db = firebase.firestore();
  storage = firebase.firestore();
  requests=[];
  NewRequeste = [];
  constructor() { 
    // this.db.collection('request').onSnapshot(snapshot => {
    //   snapshot.forEach(doc => {
    //     // this.users = doc.data();
    //     this.requests.push(doc.data());
    //     console.log('The requests:',this.requests);
    //   })
    // });

    this.storage.collection('request').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        // this.users = doc.data();
        // this.addMarkersOnTheCustomersCurrentLocation(this.users.coords.lat, this.users.coords.lng);
        this.requests.push(doc.data());
        console.log('My array is ',this.requests);
        

        this.requests.forEach(Customers => {
          console.log('Customers in my array', Customers.schooluid);
          console.log('Owners UID logged in', firebase.auth().currentUser.uid);
          if(Customers.schooluid === firebase.auth().currentUser.uid){
             this.NewRequeste.push(doc.data())
          }
        }) 

      })
    });
    
console.log("Data in my New Array is:", this.NewRequeste);


  }

  ngOnInit() {
  }

}
