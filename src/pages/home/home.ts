import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider} from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  city: string;
  weather: any;
  error: any;

  constructor(public navCtrl: NavController, private weatherProvider: WeatherProvider, private storage: Storage) {

  }

  fetchWeatherData(city){
    this.weatherProvider.getWeather(city)
    .subscribe(weatherObservable => {
      if(weatherObservable.current_observation)
        this.weather = weatherObservable.current_observation;
      else if(weatherObservable.response && weatherObservable.response.results)
        this.fetchWeatherData(`zmw:${weatherObservable.response.results[0].zmw}`);
      else if(weatherObservable.response && weatherObservable.response.error)
        this.error = JSON.stringify(weatherObservable.response && weatherObservable.response.error);
      else this.error = JSON.stringify(weatherObservable);
    })
  }

  ionViewWillEnter(){
    this.storage.get("city").then(city=>{
      this.city = city;
      this.fetchWeatherData(this.city);
    })

    
  }

}
