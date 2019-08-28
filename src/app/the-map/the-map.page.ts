import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import {ViewChild ,ElementRef } from '@angular/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
 


declare var google;
@Component({
  selector: 'app-the-map',
  templateUrl: './the-map.page.html',
  styleUrls: ['./the-map.page.scss'],
})

export class TheMapPage implements OnInit {


  options : GeolocationOptions;
  currentPos : Geoposition;
  @ViewChild('map', {static: false}) mapElement: ElementRef;
   map: any;
   latitude : number;
  longitude : number;

  constructor( private geolocation : Geolocation,  private nativeGeocoder: NativeGeocoder) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getUserPosition();
    // this.loadMap() ;
} 

  getUserPosition(){
    this.options = {
        enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;      
        console.log(pos);
        this.addMap(pos.coords.latitude, pos.coords.longitude);
        this.addMarker();
    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });
}



addMap(lat,long){
  let latLng = new google.maps.LatLng(lat, long);
  let mapOptions = {
  center: latLng,
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP
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
addMarkersOnTheCustomersCurrentLocation(){
  
  // let marker = new google.maps.Marker({
  //   map: this.map,
  //   animation: google.maps.Animation.DROP,
  //   position: this.map.getCenter()
   
  // });

  let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(-26.2601316, 27.9495796),
 
  });
console.log('Marker', marker);

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
}

}
