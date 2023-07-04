import { Component } from '@angular/core';
import { LoaderComponent } from './loader/loader.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public spinnerComponent = LoaderComponent;

}
