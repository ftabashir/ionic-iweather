import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider} from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  city: string;
  weather: any;
  error: any;
  loading: any;

  constructor(public navCtrl: NavController, 
              private weatherProvider: WeatherProvider, 
              private storage: Storage,
              private loadingCtrl: LoadingController) {

  }

  fetchWeatherData(city){
    this.weatherProvider.getWeather(city)
    .subscribe(
      weatherObservable => {
        if(weatherObservable.current_observation){
          this.weather = weatherObservable.current_observation;
          this.error = undefined;
          this.loading.dismiss();
        }
        else if(weatherObservable.response && weatherObservable.response.results)
          this.fetchWeatherData(`zmw:${weatherObservable.response.results[0].zmw}`);
        else{
          if(weatherObservable.response && weatherObservable.response.error)
            this.error = JSON.stringify(weatherObservable.response && weatherObservable.response.error);
          else 
            this.error = JSON.stringify(weatherObservable);
          this.weather = undefined;
          this.loading.dismiss();
        }
      },
      error => {
        this.error = JSON.stringify(error);
        this.loading.dismiss();
      }
    );
  }

  getLoadingTitle(){
    return this.city? `Loading weather of ${this.city}`: "Loading weather based on your ip address";
  }

  ionViewWillEnter(){
    this.loading = this.loadingCtrl.create({
      content: this.getLoadingTitle()
    });
    this.loading.present();
    this.storage.get("city").then(city=>{
      this.city = city;
      this.loading.data.content = this.getLoadingTitle();
      this.fetchWeatherData(this.city);
    })

    
  }

}
