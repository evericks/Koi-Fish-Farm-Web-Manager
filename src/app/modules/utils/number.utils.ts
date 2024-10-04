import { DecimalPipe } from '@angular/common';

export function formatToDecimal(value: number): string | null {
    const decimalPipe = new DecimalPipe('en-US');
    // Format the number to display without decimal places (round to integer)
    return decimalPipe.transform(value, '1.0-0');
}
