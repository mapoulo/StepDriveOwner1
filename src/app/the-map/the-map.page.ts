import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import {ViewChild ,ElementRef } from '@angular/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import * as firebase from 'firebase';
import { AuthService } from '../../app/user/auth.service';
import { LoginPage } from '../login/login.page';
import { Router } from '@angular/router';

 


declare var google;
@Component({
  selector: 'app-the-map',
  templateUrl: './the-map.page.html',
  styleUrls: ['./the-map.page.scss'],
})

export class TheMapPage implements OnInit {

  // toggles the div, goes up if true, goes down if false
  display = false;
  swipeUp() {
    this.display = !this.display;
  }
  options : GeolocationOptions;
  currentPos : Geoposition;
  @ViewChild('map', {static: false}) mapElement: ElementRef;
  db = firebase.firestore();
  users = [];
   map: any;
   latitude : number;
  longitude : number;
  NewUseArray = {};
  schools = [];
  requests = [];
  NewRequeste = [];

  constructor( private geolocation : Geolocation, public AuthService : AuthService,  public router:Router, private nativeGeocoder: NativeGeocoder) { 


   
   


      // this.db.collection("users").where("DSuid", "==", firebase.auth().currentUser.uid)
      // .get()
      // .then(function(querySnapshot) {
      //     querySnapshot.forEach(function(doc) {
      //         // doc.data() is never undefined for query doc snapshots
      //         // doc.id, " => ",
      //         console.log( doc.data());
      //     });
      // })
      // .catch(function(error) {
      //     console.log("Error getting documents: ", error);
      // });

  
  }

  ionViewDidEnter(){
    this.getUserPosition();

    this.db.collection('bookings').onSnapshot(snapshot => {
      snapshot.forEach(doc => {

        this.requests.push(doc.data());
        
        this.requests.forEach(Customers => {
          console.log('Customers in my array', Customers.schooluid);
          console.log('Owners UID logged in', firebase.auth().currentUser.uid);
          if(Customers.schooluid === firebase.auth().currentUser.uid){
            this.NewRequeste  = [];
             this.NewRequeste.push(doc.data())
          }
        }) 
      })
    });
   
  
    let booking = {
      docid: '',
      doc: {}
    }
    
 
      this.db.collection('bookings').onSnapshot(snapshot => {

          snapshot.forEach(doc => {
          booking.docid = doc.id
          booking.doc = doc.data()
          // console.log('The obj is', booking);
          console.log('The id is',booking.docid);
          this.users.push(booking);
          console.log('The obj is', booking);
          console.log('The array is', this.users);
          // console.log('The id is',booking.docid);
        });


        this.users.forEach(Customers => {          
          console.log('Owners UID logged in', firebase.auth().currentUser.uid);
          if(Customers.doc.schooluid === firebase.auth().currentUser.uid){
            this.addMarkersOnTheCustomersCurrentLocation(Customers.doc.location.lat, Customers.doc.location.lng);
          }
        })

       
      });
      console.log('My array is ',this.users);
  
  }

  Array(){
    console.log('Array Data:', this.users);
    
  }


  Accept(){

  }

  
  ngOnInit() {
    // this.add()
  }


  Decline(doc, docid){

    console.log('Decline method called', doc, docid);
    let doc_id : string;

    this.db.collection('bookings').doc(docid).set({confirmed: false}, {merge: true});
    //   //  console.log('Decline method is called', obj);
    //   //  var docRef = firebase.firestore().collection("users").doc(obj.uid);
    //   //  docRef.update({confirmed: false});
    //   //  let documentRef = this.db.firestore.doc('col/doc');

    //   //  documentRef.update({foo: 'bar'}).then(res => {
    //   //    console.log(`Document updated at ${res.updateTime}`);
    //   //  });
  
  }


   Logout() {
      this.users = [];
      console.log("The user array is empty see?",this.users);
      
      this.requests = [];
      this.NewRequeste = [];
      console.log('Your array is :', this.users);
      firebase.auth().signOut().then(res => {
        this.router.navigateByUrl('/login');
      })
    }

 











add(){
  
  let userid = firebase.auth().currentUser.uid;
  let schools = []
  this.db.collection("request").where("schooluid", "==", userid)
     .get()
     .then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
             console.log(doc.data());
             schools.push(doc.data())      
         });   
     })
     .catch(function(error) {
         console.log("Error getting documents: ", error);
     });
     this.schools = schools;
     console.log('Request', this.schools);
   console.log('The add method called');

   schools.forEach(Customers => {
    this.addMarkersOnTheCustomersCurrentLocation(Customers.coords.lat, Customers.coords.lng);
  })

 }
 

takeData(){
   this.db.collection("users").where("name", "==", 'Nkwe')
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log('The data',doc.id, " => ", doc.data());
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
}




  getUserPosition(){
    this.options = {
        enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;      
        console.log(pos);
        this.addMap(pos.coords.latitude, pos.coords.longitude);
        console.log('Current Location', pos);
        
        // let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        // let mapOptions = {
        // center: latLng,
        // zoom: 15,
        // disableDefaultUI: true,
        // mapTypeId: google.maps.MapTypeId.ROADMAP
        // }
        // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.addMarker();
    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });
}



addMap(lat:number,long:number){

  let latLng = new google.maps.LatLng(lat, long);

  var grayStyles = [
    {
      featureType: "all",
      stylers: [
        { saturation: -10 },
        { lightness: 0 }
      ]
    },
  ];

  let mapOptions = {
  center: latLng,
  zoom: 10,
  disableDefaultUI: true,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  styles: grayStyles
  }

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
}

//=====================

loadMap() {
  let latLng = new google.maps.LatLng(48.8513735, 2.3861292);
  
  let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);    
  
  var locations = [
    ['Bondi Beach', -33.890542, 151.274856, 4],
    ['Coogee Beach', -33.923036, 151.259052, 5],
    ['Cronulla Beach', -34.028249, 151.157507, 3],
    ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    ['Maroubra Beach', -33.950198, 151.259302, 1]
  ];
  
  var infowindow = new google.maps.InfoWindow();
  
  var marker, i;
  
  for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: this.map
    });
  
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(this.map, marker);
      }
    })(marker, i));
  }
  }

  //==============================
//addMarkers method adds the customer's location 
addMarkersOnTheCustomersCurrentLocation(lat, lng){
  console.log('Called ');
  // let marker = new google.maps.Marker({
  //   map: this.map,
  //   animation: google.maps.Animation.DROP,
  //   position: this.map.getCenter()
   
  // });

  // -26.260901, 27.949600699999998
//here
const icon = {
  url: '../../assets/icon/icon.png', // image url
  scaledSize: new google.maps.Size(50, 50), // scaled size
  origin: new google.maps.Point(0,0), // origin
  anchor: new google.maps.Point(0, 0) // anchor
};

  let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lat, lng),
      icon: icon
  });


  let content = "<p>Customer's Location!</p>"; 
           

  this.addInfoWindow(marker, content);

}


//getGeolocation method gets the surrent location of the device
getGeolocation(){
  this.geolocation.getCurrentPosition().then((resp) => {
    // this.geoLatitude = resp.coords.latitude;
    // this.geoLongitude = resp.coords.longitude; 
    // this.geoAccuracy = resp.coords.accuracy; 
    // this.getGeoencoder(this.geoLatitude,this.geoLongitude);
   }).catch((error) => {
     alert('Error getting location'+ JSON.stringify(error));
   });
}

// //  //geocoder method to fetch address from coordinates passed as arguments
//  getGeoencoder(latitude,longitude){
//   this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
//   .then((result: NativeGeocoderReverseResult[])  => {
//     this.geoAddress = this.generateAddress(result[0]);
//   })
//   .catch((error: any) => {
//     alert('Error getting location'+ JSON.stringify(error));
//   });
// }


addInfoWindow(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });

}

//addMarker method adds the marker on the on the current location of the device
addMarker(){

  //here
  let marker = new google.maps.Marker({
  map: this.map,
  animation: google.maps.Animation.DROP,
  position: this.map.getCenter()
  });

  let content = "<p>The Driving School Owner's location!</p>";          
  let infoWindow = new google.maps.InfoWindow({
  content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
  infoWindow.open(this.map, marker);
  });
//Add a radius on the map
  // new google.maps.Circle({
  //   strokeColor: '#FF0000',
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: '#FF0000',
  //   fillOpacity: 0.35,
  //   map: this.map,
  //   center: new google.maps.LatLng(-26.2601316, 27.9495796),
  //   radius: 25000
  // });


}


goToProfile(){
  this.router.navigate(['profile']);
}
}
