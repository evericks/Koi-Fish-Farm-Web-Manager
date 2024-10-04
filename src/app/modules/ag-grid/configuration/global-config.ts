import { GridOptions } from "ag-grid-enterprise";
import { ActionCellComponent } from "../action-cell/action-cell.component";

export const globalGridOptions: GridOptions = {
    rowModelType: 'clientSide',
    pagination: true,
    paginationPageSize: 20,
    paginationPageSizeSelector: [5, 10, 20, 50, 100, 200, 500, 1000],
    animateRows: true,
    // rowSelection: {
    //     mode: 'multiRow',
    // },
    defaultColDef: {
        flex: 1,
        minWidth: 200,
        maxWidth: 500,
        enableValue: true,
        sortable: true,
        enableCellChangeFlash: true,
        enableRowGroup: true,
        enablePivot: true,
        filter: true,
        suppressAutoSize: true,
    },
    tooltipShowDelay: 1000,
    suppressServerSideFullWidthLoadingRow: true,
    components: {
        actionCellRenderer: ActionCellComponent,
    },
    getRowId: (params) => params.data.id,
};