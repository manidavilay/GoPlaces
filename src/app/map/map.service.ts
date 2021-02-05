import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OpenStreetMapProvider, GeoSearchControl, GeoSearch } from 'leaflet-geosearch';

const LOCATIONS_API = 'https://api.insee.fr/entreprises/sirene/V3/siret?q=libelleCommuneEtablissement:PARIS%20AND%20codePostal2Etablissement:75011%20AND%20activitePrincipaleUniteLegale:56.10C&';

@Injectable({ providedIn: 'root' })
export class MapService {
  private myAccessToken: '7887b45f-92e7-331a-b897-c366087c1e9b';

  constructor(private http: HttpClient) {
  }

  data: {};

  getMyAccessToken() {
    return this.myAccessToken;
  }

  getLocationsInformations() {
    this.http.get(LOCATIONS_API)
    .subscribe(data => {
      this.data = data;
      data['etablissements'].map(etablissement => {
        let object = etablissement.adresseEtablissement;
        if (object.numeroVoieEtablissement && object.typeVoieEtablissement && object.libelleVoieEtablissement && object.codePostalEtablissement && object.libelleCommuneEtablissement) {
          let address = object.numeroVoieEtablissement + ' ' + object.typeVoieEtablissement + ' ' + object.libelleVoieEtablissement + ' ' + object.codePostalEtablissement + ' ' + object.libelleCommuneEtablissement;
          console.log(address)
          this.getLatLng(address)
        }
      });
    });
  }

  getLatLng(address) {
    const provider = new OpenStreetMapProvider();
    provider.search({query : address}).then(results => {
      console.log(results)
    });
  }
}
