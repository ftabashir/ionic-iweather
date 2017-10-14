import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  apiKey = "58a2c4c87fdf5295";
  url =`http://api.wunderground.com/api/${this.apiKey}/conditions`;

  constructor(public http: Http) {
    
  }

  getWeather(city="autoip"){
    var requestUrl = `${this.url}/q/${city}.json`;
    return this.http.get(requestUrl).map(result => result.json());
  }

}
