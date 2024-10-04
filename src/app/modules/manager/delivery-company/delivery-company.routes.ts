import { Routes } from '@angular/router';
import { DeliveryCompanyComponent } from './delivery-company.component';
import { DeliveryCompanyHeaderComponent } from './header/delivery-company-header.component';
import { inject } from '@angular/core';
import { DeliveryCompanieService } from './delivery-company.service';

export default [
    {
        path: '',
        component: DeliveryCompanyComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: ''
            },
            {
                path: '',
                component: DeliveryCompanyHeaderComponent,
                // Resolver
                resolve: {
                    students: () => inject(DeliveryCompanieService).getDeliveryCompanies()
                },
            },
        ]
    },
] as Routes;
