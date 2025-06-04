import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { signal } from '@angular/core';

let readings_count = signal(0);
let to_get_readings = signal(true);

// Readings class to store sensor readings
class reading {
  time: String;
  temperature: Number;
  pressure: Number;
  humidity: Number;
  co2ppm: Number;
  tvoc: Number;

  constructor(time: String, temperature: Number, pressure: Number, humidity: Number, 
      co2ppm: Number, tvoc: Number) {
    this.time = time;
    this.temperature = temperature;
    this.pressure = pressure;
    this.humidity = humidity;
    this.co2ppm = co2ppm;
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
  </tr>
    @for (reading of readings; track reading.time) {
      <tr>
        <td>{{ reading.time }}</td>
        <td>{{ reading.temperature }}</td>
        <td>{{ reading.pressure }}</td>
        <td>{{ reading.humidity }}</td>
    </tr>
    }
  </tbody>
  </table>
  `,
  styleUrl: './app.css'
})
export class ReadingsList {
  readings: Array<reading> = [];

  getReadings() {
    let new_reading = new reading("tda", 514, 751, 1725, 715, 816);
    this.readings.push(new_reading);
  }
}

@Component({
  selector: 'app-root',
  imports: [ReadingsList],
  // templateUrl: './app.html',
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
