import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { iif, Subject } from 'rxjs';

import { MapData } from './map-data.model';

const LOCATIONS_API = 'https://api.insee.fr/entreprises/sirene/V3/siret?q=libelleCommuneEtablissement:PARIS%20AND%20codePostal2Etablissement:75011%20AND%20activitePrincipaleUniteLegale:56.10A&';

@Injectable({ providedIn: 'root' })
export class MapService {
  private myAccessToken: 'e4681931-ed1f-3fa5-aa70-c519e0daa004';

  constructor(private http: HttpClient) {}
  data: {};

  getMyAccessToken() {
    return this.myAccessToken;
  }

  getLocationsInformations() {
    this.http.get('https://api.insee.fr/entreprises/sirene/V3/siret?q=libelleCommuneEtablissement:PARIS%20AND%20codePostal2Etablissement:75011%20AND%20activitePrincipaleUniteLegale:56.10A&')
    .subscribe(data => {
      this.data = data;
      console.log(data['etablissements']['0']['adresseEtablissement']);
    });
  }
}
