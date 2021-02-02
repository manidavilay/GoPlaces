import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

import { MapService } from './map.service';

const LOCATIONS_API = 'https://api.insee.fr/entreprises/sirene/V3/siret?q=libelleCommuneEtablissement:PARIS%20AND%20codePostal2Etablissement:75011%20AND%20activitePrincipaleUniteLegale:56.10C&';

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
  data: {};

  ngOnInit() {
    this.getLocationsInformations();
  }

  ngAfterViewInit() {
    // mapboxgl.accessToken = 'pk.eyJ1IjoibWFuaWRhIiwiYSI6ImNramxzaXF0NTNmNHQzMXNjeTRvdHByY2IifQ.7yoL_dmU_SiIlJ3KjTCf2g';
    // var map = new mapboxgl.Map({
    //   container: 'map',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [-79.4512, 43.6568],
    //   zoom: 13
    // });

    // map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl
    //   })
    // );
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

  getLocationsInformations() {
    this.http.get(LOCATIONS_API)
    .subscribe(data => {
      this.data = data;
      data['etablissements'].map(etablissement => {
        let object1 = etablissement.adresseEtablissement;
        // let name1 = etablissement.uniteLegale.denominationUniteLegale;
        // if (name1) {
          let address1 = object1.numeroVoieEtablissement + ' ' + object1.typeVoieEtablissement + ' ' + object1.libelleVoieEtablissement + ' ' + object1.codePostalEtablissement + ' ' + object1.libelleCommuneEtablissement;
          console.log(address1)
          this.getLatLng(address1)
        // }
        // let object2 = etablissement.adresse2Etablissement;
        // let name2 = etablissement.uniteLegale.denominationUniteLegale;
        // if (name2) {
        //   let address2 = name2 + ', ' + object2.numeroVoie2Etablissement + ' ' + object2.typeVoie2Etablissement + ' ' + object2.libelleVoie2Etablissement + ' ' + object2.codePostal2Etablissement + ' ' + object2.libelleCommune2Etablissement;
        //   console.log(address2)
        // }
        // let location1 = geocode(address1);
        // // SAVE DB
        // let location2 = geocode(address2);
        // // SAVE DB
      });
    });
  }

  getLatLng(address1) {
    this.http.get('https://nominatim.openstreetmap.org/search?format=json&q='+address1)
    .subscribe(data => {
      console.log(data);
   });
  }
}
