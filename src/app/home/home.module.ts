import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AgenciesComponent } from "./agencies.component";
// import { HomeComponent } from "./home.component";
import { HomePage } from "./home.page";
import { TripsComponent } from "./trips.component";
import { AgencyStatusPipe } from './agency-status.pipe';

@NgModule({
  declarations: [
    // HomeComponent,
    AgenciesComponent,
    TripsComponent,
    HomePage,
    AgencyStatusPipe,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    // HomeComponent,
    HomePage,
  ],
})
export class HomeModule {}
