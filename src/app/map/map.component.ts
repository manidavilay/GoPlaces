import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

import { MapService } from './map.service';

@Component({
  selector: 'app-root',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map: L.Map;

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

  constructor(public mapService: MapService, private http: HttpClient) { }

  ngOnInit() {
    this.mapService.getLocationsInformations();
  }

  ngAfterViewInit() {
    const myAPIKey = '9af511211df4449d9de273288b3e8ac8';
    const mapStyle = 'https://maps.geoapify.com/v1/styles/klokantech-basic/style.json';

    const initialState =  {
      lng: 2.3488,
      lat: 48.8534,
      zoom: 14
    }

    const map = new L.Map(this.mapContainer.nativeElement).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );

    map.attributionControl
    .setPrefix('')
    .addAttribution(
      'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
    );

    L.mapboxGL({
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      accessToken: 'pk.eyJ1IjoibWFuaWRhIiwiYSI6ImNramxzaXF0NTNmNHQzMXNjeTRvdHByY2IifQ.7yoL_dmU_SiIlJ3KjTCf2g'
    }).addTo(map);

    const myIcon = L.icon({
      iconUrl: '../../assets/img/marker-icon.png',
      iconSize: [38, 41]
    });
    L.marker([48.8534, 2.3488], {icon: myIcon}).bindPopup('Ceci est un marqueur').addTo(map).openPopup();
  }
}
