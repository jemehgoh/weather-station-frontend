import { Component, inject, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Readings class to store sensor readings
class reading {
  time: String;
  temperature: Number;
  pressure: Number;
  humidity: Number;
  co2Ppm: Number;
  tvoc: Number;

  constructor(time: String, temperature: Number, pressure: Number, humidity: Number, 
      co2Ppm: Number, tvoc: Number) {
    this.time = time;
    this.temperature = temperature;
    this.pressure = pressure;
    this.humidity = humidity;
    this.co2Ppm = co2Ppm;
    this.tvoc = tvoc;    
  }
}

// Component to generate readings
@Component({
  selector: 'app-readings',
  template: `
    <button (click) = "getReadings()">Get readings</button>
    <br>
    <table>
    <tbody>
      <tr>
      <th>Time</th>
      <th>Temperature</th>
      <th>Pressure</th>
      <th>Humidity</th>
      <th>CO2 (ppm)</th>
      <th>TVOC</th>
  </tr>
    @for (reading of readings; track reading.time) {
      <tr>
        <td>{{ reading.time }}</td>
        <td>{{ reading.temperature }}</td>
        <td>{{ reading.pressure }}</td>
        <td>{{ reading.humidity }}</td>
        <td>{{ reading.co2Ppm }}</td>
        <td>{{ reading.tvoc }}</td>
    </tr>
    }
  </tbody>
  </table>
  `,
  styleUrl: './app.css'
})
@Injectable({providedIn: 'root'})
export class ReadingsList {
  private http = inject(HttpClient);
  readings: Array<reading> = [];

  getReadings() {
    this.readings = [];
    this.http.get<Array<reading>>('http://localhost:8080/readings')
        .subscribe((subscriber) => {
          for (let i = 0; i < subscriber.length; i++) {
            let new_reading = new reading(subscriber[i].time, subscriber[i].temperature, 
              subscriber[i].pressure, subscriber[i].humidity, subscriber[i].co2Ppm, subscriber[i].tvoc);  
            this.readings.push(new_reading)
            }
        });
  }
}

@Component({
  selector: 'app-root',
  imports: [ReadingsList],
  template: `
  <h1>ESP32 Weather Station</h1>
  <!-- <readings-selector /> -->
  <hr>
  <app-readings />
  `,
  styleUrl: './app.css'
})
export class App {
  protected title = 'weather-station-frontend';
}
