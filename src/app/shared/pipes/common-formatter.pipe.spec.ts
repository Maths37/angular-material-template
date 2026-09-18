import {CommonFormatterPipe} from "./common-formatter.pipe";
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import {DataType} from "../paged/model/data-type";

describe('CommonFormatterPipe', () => {
    it('create an instance', () => {
        const pipe = new CommonFormatterPipe();
        expect(pipe).toBeTruthy();
    });

    it('returns empty string when date is null', () => {
        const date = null;

        const pipe = new CommonFormatterPipe();
        const result = pipe.transform(date, DataType.DATE);
        expect(result).toBe('');
    });

    it('returns valid date given utc', () => {
        const date = new Date('2018-05-04T08:17:57.8979116Z');

        let pipe = new CommonFormatterPipe();
        let result = pipe.transform(date, DataType.DATE);
        expect(result).toBe('May 4, 2018');

        registerLocaleData(localeFr, 'fr', localeFrExtra);
        pipe = new CommonFormatterPipe();
        result = pipe.transform(date, DataType.DATE);
        expect(result).toBe('4 mai 2018');
    });

    it('returns valid time given utc', () => {
        const date = new Date('2018-05-04T08:17:57.8979116Z');

        let pipe = new CommonFormatterPipe();
        let result = pipe.transform(date, DataType.TIME);
        expect(result).toBe('10:17:57 AM');

        registerLocaleData(localeFr, 'fr', localeFrExtra);
        pipe = new CommonFormatterPipe();
        result = pipe.transform(date, DataType.TIME);
        expect(result).toBe('10:17:57');
    });

    it('returns valid date time given utc', () => {
        const date = new Date('2018-05-04T08:17:57.8979116Z');

        let pipe = new CommonFormatterPipe();
        let result = pipe.transform(date, DataType.DATETIME);
        expect(result).toBe('5/4/18, 10:17 AM');

        registerLocaleData(localeFr, 'fr', localeFrExtra);
        pipe = new CommonFormatterPipe();
        result = pipe.transform(date, DataType.DATETIME);
        expect(result).toBe('04/05/2018 10:17');
    });

    it('returns valid currency', () => {
        const price = 3.14;

        let pipe = new CommonFormatterPipe();
        let result = pipe.transform(price, DataType.CURRENCY_EUR);
        expect(result).toBe('EUR3.14');

        registerLocaleData(localeFr, 'fr', localeFrExtra);
        pipe = new CommonFormatterPipe();
        result = pipe.transform(price, DataType.CURRENCY_EUR);
        expect(result).toBe('3,14 EUR');
    });

    it('returns valid decimal', () => {
        const price = 3.14;

        let pipe = new CommonFormatterPipe();
        let result = pipe.transform(price, DataType.DECIMAL);
        expect(result).toBe('3.14');

        registerLocaleData(localeFr, 'fr', localeFrExtra);
        pipe = new CommonFormatterPipe();
        result = pipe.transform(price, DataType.DECIMAL);
        expect(result).toBe('3,14');
    });

    it('returns valid percent', () => {
        const price = 3.14;

        let pipe = new CommonFormatterPipe();
        let result = pipe.transform(price, DataType.PERCENT);
        expect(result).toBe('314%');

        registerLocaleData(localeFr, 'fr', localeFrExtra);
        pipe = new CommonFormatterPipe();
        result = pipe.transform(price, DataType.PERCENT);
        expect(result).toBe('314 %');
    });

    it('returns valid text', () => {
        const text = "dfsjbqdfABZJKAGZ$^^*ùm*^637643768_e(è_çéur";

        let pipe = new CommonFormatterPipe();
        let result = pipe.transform(text, DataType.TEXT);
        expect(result).toBe(text);
    });

    it('returns valid boolean', () => {
        let pipe = new CommonFormatterPipe();
        let result = pipe.transform(true, DataType.BOOLEAN);
        expect(result).toBe("<mat-icon>check box icon</mat-icon>");

        result = pipe.transform(false, DataType.BOOLEAN);
        expect(result).toBe("<mat-icon>check box outline blank icon</mat-icon>");
    });
});
