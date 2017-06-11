import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Restaurant } from './restaurant/restaurant.model';
import { MEAT_API } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';

@Injectable()
export class RestaurantService {
    constructor(private http: Http) { }

    restaurants(): Observable<Restaurant[]> {
        return (
            this.http
                .get(`${MEAT_API}/restaurants`)
                .map(response => response.json())
                .catch(ErrorHandler.handleError)
        );
    }

    restaurantById(id: string): Observable<Restaurant> {
        return (
            this
                .http
                .get(`${MEAT_API}/restaurants/${id}`)
                .map(response => response.json())
                .catch(ErrorHandler.handleError)
        );
    }

    /**
     * @param id receives an string with the id of the route
     * @returns returns an Observable
     */
    reviewsOfRestaurant(id: string): Observable<any> {
        return (
            this
                .http
                .get(`${MEAT_API}/restaurants/${id}/reviews`)
                .map(response => response.json())
                .catch(ErrorHandler.handleError)
        );
    }

    /**
     * @param id receives an string with the id of the route
     * @returns returns an array of MenuItem Observable
     */
    menuOfRestaurant(id: string): Observable<MenuItem[]> {
        return (
            this
                .http
                .get(`${MEAT_API}/restaurants/${id}/menu`)
                .map(response => response.json())
                .catch(ErrorHandler.handleError)
        );
    }
}
