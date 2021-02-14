import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

// import { MapService } from './map.service';
import { ThrowStmt } from '@angular/compiler';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
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
  });
  private initialState = {
    lng: 2.3488,
    lat: 48.8534,
    zoom: 14
  }

  // Declare variables related to markers on map
  private myIcon = L.icon({
    iconUrl: '../../assets/img/marker-icon.png',
    iconSize: [38, 41]
  });
  private markerGroup = L.layerGroup()

  // Declare variables related to map container
  @ViewChild('map')
  private mapContainer: ElementRef < HTMLElement > ;

  // Declare variables related to locations API stored in database
  private addressesUrl = 'http://localhost:3000/api/address/getall';

  address: any;
  addressesArray = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.displayMarkers()
  }

  ngAfterViewInit() {
    this.displayMap();
  }

  // Display map function
  displayMap() {
    this.map = new L.Map(this.mapContainer.nativeElement).addLayer(this.osm).setView(
      [this.initialState.lat, this.initialState.lng],
      this.initialState.zoom
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
        L.marker([coordinates[1], coordinates[0]], {
          icon: this.myIcon
        }).bindPopup('Ceci est un marqueur').addTo(this.markerGroup).openPopup();
        this.markerGroup.addTo(this.map)
      }
    })
  }
}
