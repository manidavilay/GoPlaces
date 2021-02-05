import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

import { MapService } from './map.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map: L.Map;

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

  constructor(public mapService: MapService, private http: HttpClient) {
  }

  ngOnInit() {
    this.mapService.getLocationsInformations();
  }

  ngAfterViewInit() {
    this.displayMap();
  }

  displayMap() {
    const osmUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png';
    const osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
    const osmSub = 'abcd';
    const osm = new L.TileLayer(osmUrl, {attribution: osmAttrib, subdomains: osmSub});
    const initialState =  {
      lng: 2.3488,
      lat: 48.8534,
      zoom: 14
    }

    const map = new L.Map(this.mapContainer.nativeElement).addLayer(osm).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    )

    const myIcon = L.icon({
      iconUrl: '../../assets/img/marker-icon.png',
      iconSize: [38, 41]
    });

    L.marker([48.8534, 2.3488], {icon: myIcon}).bindPopup('Ceci est un marqueur').addTo(map).openPopup();
  }
}
