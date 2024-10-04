import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryCompany } from 'app/types/delivery-company.type';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeliveryCompanieService {

    private _deliveryCompany: BehaviorSubject<DeliveryCompany | null> = new BehaviorSubject(null);
    private _deliveryCompanies: BehaviorSubject<DeliveryCompany[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for deliveryCompany
 */
    get deliveryCompany$(): Observable<DeliveryCompany> {
        return this._deliveryCompany.asObservable();
    }

    /**
     * Getter for deliveryCompanies
     */
    get deliveryCompanies$(): Observable<DeliveryCompany[]> {
        return this._deliveryCompanies.asObservable();
    }


    getDeliveryCompanies():
        Observable<DeliveryCompany[]> {
        return this._httpClient.get<DeliveryCompany[]>('/api/delivery-companies').pipe(
            tap((response) => {
                // Set value for current deliveryCompanies
                this._deliveryCompanies.next(response);
            }),
        );
    }

    /**
     * Get deliveryCompany by id
     */
    getDeliveryCompanyById(id: string): Observable<DeliveryCompany> {
        return this.deliveryCompanies$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<DeliveryCompany>('/api/delivery-companies/' + id).pipe(
                map((deliveryCompany) => {

                    // Set value for current deliveryCompany
                    this._deliveryCompany.next(deliveryCompany);

                    // Return the new deliveryCompany
                    return deliveryCompany;
                })
            ))
        );
    }

    /**
* Create deliveryCompany
*/
    createDeliveryCompany(data) {
        return this.deliveryCompanies$.pipe(
            take(1),
            switchMap((deliveryCompanies) => this._httpClient.post<DeliveryCompany>('/api/delivery-companies', data).pipe(
                map((newdeliveryCompany) => {

                    // Update deliveryCompanies
                    if (deliveryCompanies) {
                        this._deliveryCompanies.next([newdeliveryCompany, ...deliveryCompanies]);
                    }

                    // Return new deliveryCompany
                    return newdeliveryCompany;
                })
            ))
        )
    }

    /**
    * Update deliveryCompany
    */
    updateDeliveryCompany(id: string, data) {
        return this.deliveryCompanies$.pipe(
            take(1),
            switchMap((deliveryCompanies) => this._httpClient.put<DeliveryCompany>('/api/delivery-companies/' + id, data).pipe(
                map((updatedProvince) => {

                    if (deliveryCompanies) {

                        // Update deliveryCompanies
                        this._deliveryCompanies.next(deliveryCompanies);
                    }

                    // Update deliveryCompany
                    this._deliveryCompany.next(updatedProvince);

                    // Return updated deliveryCompany
                    return updatedProvince;
                })
            ))
        )
    }

    deleteDeliveryCompany(id: string): Observable<boolean> {
        return this.deliveryCompanies$.pipe(
            take(1),
            switchMap(deliveryCompanies => this._httpClient.delete('/api/delivery-companies/' + id).pipe(
                map(() => {
                    // Find the index of the deleted deliveryCompany
                    const index = deliveryCompanies.findIndex(item => item.id === id);

                    // Delete the deliveryCompany
                    deliveryCompanies.splice(index, 1);

                    // Update the deliveryCompanies
                    this._deliveryCompanies.next(deliveryCompanies);

                    // Return the deleted status
                    return true;
                }),
            )),
        );
    }
}