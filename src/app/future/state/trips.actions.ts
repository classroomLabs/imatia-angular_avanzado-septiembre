import { createAction, props } from "@ngrx/store";
import { Trip } from "src/app/models/trip.interface";

export const loadTrips = createAction("[Trips] Load Trips");
export const loadTripsSuccess = createAction(
  "[Trips] Load Trips Success",
  props<{ trips: Trip[] }>()
);
export const loadTripsFailure = createAction(
  "[Trips] Load Trips Failure",
  props<{ error: string }>()
);

export enum TripsActionTypes {
  LoadTrips = "[Trips] Load Trips",
  LoadTripsSuccess = "[Trips] Load Trips Success",
  LoadTripsFailure = "[Trips] Load Trips Failure",
}

class LoadTrips {
  type = TripsActionTypes.LoadTrips;
}

class LoadTripsSuccess {
  type = "[Trips] Load Trips Success";
  constructor(public payload: { trips: Trip[] }) {}
}

class LoadTripsFailure {
  type = "[Trips] Load Trips Failure";
  constructor(public payload: { error: string }) {}
}

export type TripsActions = LoadTrips | LoadTripsSuccess | LoadTripsFailure;
