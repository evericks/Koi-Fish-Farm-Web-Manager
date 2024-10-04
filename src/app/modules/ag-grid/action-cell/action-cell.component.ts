import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'action-cell',
    templateUrl: './action-cell.component.html',
    standalone: true,
    imports: [CommonModule, MatIcon]
})
export class ActionCellComponent implements ICellRendererAngularComp {
    private params: any;
    showUpdateIcon: boolean = true;
    showRemoveIcon: boolean = true;
    showExpandIcon: boolean = false;
    showSettingIcon: boolean = false;
    isNew: boolean = false;

    constructor() { }

    ngOnInit(): void { }

    // Phương thức ag-Grid gọi để khởi tạo component
    agInit(params: any): void {
        this.params = params;
        this.showExpandIcon = params.showExpandIcon ?? false;
        this.showSettingIcon = params.showSettingIcon ?? false;
        this.showUpdateIcon = params.showUpdateIcon ?? true;
        this.isNew = params.data.isNew ?? false;
    }

    // Hàm xử lý sự kiện click Remove
    onRemove() {
        if (this.params.onRemove) {
            this.params.onRemove(this.params.data);
        }
    }

    // Hàm xử lý sự kiện click Setting
    onSetting() {
        if (this.params.onSetting) {
            this.params.onSetting(this.params.data);
        }
    }

    // Hàm xử lý sự kiện click Edit
    onEdit() {
        if (this.params.onEdit) {
            this.params.onEdit(this.params.data);
        }
    }

    // Save button event handler
    onSave() {
        if (this.params.onSave) {
            this.params.onSave(this.params.data);
        }
    }

    // Update button event handler
    onUpdate() {
        if (this.params.onUpdate) {
            this.params.onUpdate(this.params.data);
        }
    }

    refresh(params: any): boolean {
        this.params = params;
        this.showExpandIcon = params.showExpandIcon ?? false;
        this.showSettingIcon = params.showSettingIcon ?? false;
        this.showUpdateIcon = params.showUpdateIcon ?? true;
        this.showRemoveIcon = params.showRemoveIcon ?? true;
        return true;
    }
}
