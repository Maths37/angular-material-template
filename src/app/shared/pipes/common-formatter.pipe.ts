import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe, DecimalPipe, formatCurrency, PercentPipe} from "@angular/common";
import {DataType} from "../paged/model/data-type";

@Pipe({
    name: 'commonFormatter',
    standalone: false
})
export class CommonFormatterPipe implements PipeTransform {
    private readonly locale: string;
    private datePipe;
    private percentPipe;
    private decimalPipe;

    constructor() {
        const currentLocale: string | undefined = $localize.locale;
        this.locale = currentLocale ? currentLocale : 'en-US';
        this.datePipe = new DatePipe(this.locale);
        this.percentPipe = new PercentPipe(this.locale);
        this.decimalPipe = new DecimalPipe(this.locale);
    }

    transform(value: any | null | undefined, type: DataType = DataType.TEXT, args: string | null = null): string {
        let formattedValue = null;
        switch (type) {
            case DataType.BOOLEAN:
                if (typeof (value) == "boolean" && value) {
                    formattedValue = "check";
                } else {
                    formattedValue = "close";
                }
                break;
            case DataType.CURRENCY_EUR:
                formattedValue = formatCurrency(value, this.locale, 'EUR');
                break;
            case DataType.DATE:
                formattedValue = this.datePipe.transform(value, 'longDate');
                break;
            case DataType.TIME:
                formattedValue = this.datePipe.transform(value, 'mediumTime');
                break;
            case DataType.DATETIME:
                formattedValue = this.datePipe.transform(value, 'short');
                break;
            case DataType.DECIMAL:
                formattedValue = this.decimalPipe.transform(value);
                break;
            case DataType.PERCENT:
                formattedValue = this.percentPipe.transform(value);
                break;
            case DataType.TEXT:
                formattedValue = value;
                break;
            default:
                throw new Error(`${type} is not supported`);
        }

        if (formattedValue != null) {
            return formattedValue;
        } else {
            return '';
        }
    }
}
