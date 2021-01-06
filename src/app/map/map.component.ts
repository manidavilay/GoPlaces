import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map: L.Map;

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const myAPIKey = '9af511211df4449d9de273288b3e8ac8';
    const mapStyle = 'https://maps.geoapify.com/v1/styles/klokantech-basic/style.json';

    const initialState =  {
      lng: 11,
      lat: 49,
      zoom: 4
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
  }
}
