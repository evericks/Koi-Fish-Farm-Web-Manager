import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions } from 'ag-grid-enterprise';
import { globalGridOptions } from 'app/modules/ag-grid/configuration/global-config';
import { DeliveryCompanieService } from '../delivery-company.service';
import { formatToMediumDate } from 'app/modules/utils/datetime.utils';
import { formatToDecimal } from 'app/modules/utils/number.utils';

@Component({
    selector: 'delivery-company-header',
    standalone: true,
    templateUrl: './delivery-company-header.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [AgGridAngular, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule,
        MatIconModule, MatButtonModule, RouterModule]
})
export class DeliveryCompanyHeaderComponent implements OnInit {

    private gridApi: GridApi;
    quickFilter: FormControl = new FormControl(null);
    rowData: any[] = [];
    /**
     * Constructor
     */
    constructor(private _deliveryCompanyService: DeliveryCompanieService) {
    }

    gridOptions: GridOptions = {
        ...globalGridOptions,
        onGridReady: (params) => {
            this.gridApi = params.api
        }
    };

    // Column Definitions: Defines the columns to be displayed.
    colDefs: ColDef[] = [
        {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: 'actionCellRenderer',
            sortable: false,
            filter: false,
            cellClass: () => {
                return 'flex justify-center item-center';
            },
            cellRendererParams: {
                onRemove: this.onRemoveButtonClicked.bind(this),
                onUpdate: this.onUpdateButtonClicked.bind(this),
                onSave: this.onSaveButtonClicked.bind(this),
            },
        },
        { field: "name", headerName: 'Name', editable: true },
        { field: "price", headerName: 'Price', editable: true, valueFormatter: (params) => formatToDecimal(params.value) },
        { field: "phone", headerName: 'Phone', editable: true },
        { field: "status", headerName: 'Status' },
        { field: "createAt", headerName: 'Create At', valueFormatter: (params) => formatToMediumDate(params.value) },
    ];

    ngOnInit(): void {
        this.quickFilter.valueChanges.subscribe(value => {
            this.gridApi.setGridOption('quickFilterText', value);
        });

        this._deliveryCompanyService.deliveryCompanies$.subscribe(data => {
            this.rowData = data;
        })
    }

    onAddButtonClicked() {
        if (this.rowData.some(x => x.isNew)) {
            return;
        }
        const newRow = {
            id: '',
            name: '',
            price: null,
            phone: null,
            status: 'Active',
            createAt: new Date().toISOString(),
            isNew: true
        };
        // Thêm hàng mới vào đầu mảng
        this.rowData = [newRow, ...this.rowData];
    }

    onRemoveButtonClicked(data) {
        if (data.isNew) {
            this.gridApi.applyTransaction({ remove: [data] });
            this.rowData.shift();
        } else {
            this._deliveryCompanyService.deleteDeliveryCompany(data.id).subscribe(() => {
                this.gridApi.applyTransaction({ remove: [data] });
                this.rowData.shift();
            });
        }
    }

    onUpdateButtonClicked() {

    }

    onSaveButtonClicked(data) {
        this._deliveryCompanyService.createDeliveryCompany(data).subscribe();
    }
}
