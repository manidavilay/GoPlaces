import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import * as L from 'leaflet';
import { latLng, tileLayer, Icon, icon, Marker } from "leaflet";
import 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
declare let L;

// import { MapService } from './map.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, AfterViewInit {

  // Declare variables related to map
  private map: L.Map;
  private osmUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png';
  private osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
  private osmSub = 'abcd';
  private osm = new L.TileLayer(this.osmUrl, {
    attribution: this.osmAttrib,
    subdomains: this.osmSub
  })
  private initialState = {
    lng: 2.3488,
    lat: 48.8534,
    zoom: 15,
    watch: true,
    drawControl: true
  }

  // Declare variables related to markers on map
  private locationMarker = L.icon({
    iconUrl: '../../assets/img/marker-icon.png',
    iconSize: [38, 41]
  })

  private userMarker = L.icon({
    iconUrl: '../../assets/img/user-marker.png',
    iconSize: [38, 41]
  })

  private markerGroup = L.featureGroup()

  // Declare variables related to map container
  @ViewChild('map')
  private mapContainer: ElementRef < HTMLElement >

  // Declare variable related to locations API stored in database
  private addressesUrl = 'http://localhost:3000/api/address/getall';

  // Declare variable related to displayed markers on map view
  private markersGeo = 'http://localhost:3000/api/address/geo';

  address: any;
  addressesArray = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUserLocation()
  }

  ngAfterViewInit() {
    this.displayMap()
    this.displayMarkers()
    this.getMapBounds()
    // this.drawPath()
  }

  // Display map function
  displayMap() {
    this.map = new L.Map(this.mapContainer.nativeElement).addLayer(this.osm).setView(
      [this.initialState.lat, this.initialState.lng],
      this.initialState.zoom,
    )
  }

  // Fetch addresses in database and add markers on map function
  displayMarkers() {
    this.http.get(this.addressesUrl)
    .subscribe(locations => {
      this.address = locations;
      this.addressesArray = this.address.list;
      for (let item in locations) {
        const coordinates = locations[item].location.coordinates
        if (locations[item].name && locations[item].label) {
          const locationName = locations[item].name
          const locationAddress = locations[item].label
          L.marker([coordinates[1], coordinates[0]], {
            icon: this.locationMarker
          }).bindPopup(locationName + '<br><br>' + locationAddress).addTo(this.markerGroup).openPopup();
          this.markerGroup.addTo(this.map)
        }
      }
    })
  }

  // Get user's geolocation
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        console.log(position)
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        L.marker([lat, lng], {
          icon: this.userMarker
        }).bindPopup('Votre position actuelle').addTo(this.markerGroup).openPopup();
        this.markerGroup.addTo(this.map)
      })
    } else {
      console.log('User\'s location not found')
    }
  }

  // Get displayed map area on device
  getMapBounds() {
    this.map.on('dragend', () => {
      let width = this.map.getBounds().getEast() - this.map.getBounds().getWest()
      let height = this.map.getBounds().getNorth() - this.map.getBounds().getSouth()
      /* console.log(
        'center:' + this.map.getCenter() +'\n'+
        'width:' + width +'\n'+
        'height:' + height +'\n'+
        'size in pixels:' + this.map.getSize()
      ) */
      let mapBounds = this.map.getBounds()
      const polygon = [
        [ mapBounds["_northEast"].lng, mapBounds["_northEast"].lat ],
        [ mapBounds["_southWest"].lng, mapBounds["_northEast"].lat ],
        [ mapBounds["_southWest"].lng, mapBounds["_southWest"].lat ],
        [ mapBounds["_northEast"].lng, mapBounds["_southWest"].lat ]
      ]
      this.fetchMarkerGeo(polygon)
    })
  }

  fetchMarkerGeo(polygon) {
    // let myHeader = new HttpHeaders();
    // myHeader.append('Content-Type', 'application/json');
    this.http.post(this.markersGeo, {polygon})
    .subscribe(locations => {
      console.log(locations)
    })
    // return { headers: myHeader, withCredentials: true};
  }

  // drawPath() {
  //   L.Routing.control({
  //     waypoints: [
  //       L.latLng(48.8514206, 2.3820639999999997),
  //       L.latLng(48.86744600000000105, 2.3762449999999999406)
  //     ],
  //     routeWhileDragging: true
  //   }).addTo(this.map);
  // }
}
