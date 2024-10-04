import { DatePipe } from '@angular/common';

export function formatToMediumDate(dateString: any): string | null {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(dateString, 'medium');
}
