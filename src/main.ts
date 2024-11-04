import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
//import { AppComponent } from './app/app.component';
import {RootComponent} from './app/component/root/root.component'

bootstrapApplication(RootComponent, appConfig)
  .catch((err) => console.error(err));
