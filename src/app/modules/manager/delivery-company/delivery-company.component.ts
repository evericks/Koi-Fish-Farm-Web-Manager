import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'delivery-company',
    templateUrl: './delivery-company.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class DeliveryCompanyComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
