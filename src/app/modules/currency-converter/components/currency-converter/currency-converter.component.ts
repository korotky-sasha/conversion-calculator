import { Component, OnDestroy, OnInit } from '@angular/core';
import { Currency, ExchangeRate } from '../../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

interface formValue {
  firstCurrency: string;
  secondCurrency: string;
  firstCurrencyValue: number;
  secondCurrencyValue: number;
}

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  mockCurrencies: Currency[] = [
    { name: 'United States dollar', shorthand: 'USD' },
    { name: 'South African rand', shorthand: 'ZAR' },
    // { name: 'Australian dollar', shorthand: 'AUD' },
    // { name: 'Swiss franc', shorthand: 'CHF' },
    // { name: 'Euro', shorthand: 'EUR' },
    { name: 'Philippine peso', shorthand: 'PHP' },
  ];

  validDate: Date = new Date(1639130400000);

  mockExchangeRates: ExchangeRate[] = [
    {
      firstCurrencyCode: 'USD',
      secondCurrencyCode: 'PHP',
      rate: 46.211,
      validOn: this.validDate,
    },
    {
      firstCurrencyCode: 'PHP',
      secondCurrencyCode: 'USD',
      rate: 0.02163987,
      validOn: this.validDate,
    },
    {
      firstCurrencyCode: 'USD',
      secondCurrencyCode: 'ZAR',
      rate: 16.0,
      validOn: this.validDate,
    },
    {
      firstCurrencyCode: 'ZAR',
      secondCurrencyCode: 'USD',
      rate: 0.063,
      validOn: this.validDate,
    },
  ];

  currencyForm?: FormGroup;
  previousCurrencyFormValue: formValue = {
    firstCurrency: '',
    secondCurrency: '',
    firstCurrencyValue: 0,
    secondCurrencyValue: 0,
  };

  componentDestroyed$: ReplaySubject<boolean>;

  constructor(private formBuilder: FormBuilder) {
    this.componentDestroyed$ = new ReplaySubject<boolean>();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  buildForm(): void {
    this.currencyForm = this.formBuilder.group({
      firstCurrency: [''],
      secondCurrency: [''],
      firstCurrencyValue: [0],
      secondCurrencyValue: [0],
    });

    this.currencyForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged<formValue>((x, y) => {
          return JSON.stringify(x) === JSON.stringify(y);
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((res) => {
        this.handleFormValueChanged(res);
      });
  }

  // TODO: handle currencies swap

  handleFormValueChanged(res: formValue): void {
    console.log(this.previousCurrencyFormValue, res);
    // compare two values to see what changed
    const differences = this.getObjectDiff(this.previousCurrencyFormValue, res);
    console.log(differences);
    // set new value for previousCurrencyFormValue to check difference next time
    // this.previousCurrencyFormValue = { ...res };
    if (
      differences.includes('firstCurrencyValue') &&
      differences.includes('secondCurrencyValue')
    ) {
      // need to handle rare occasion where both firstCurrencyValue and secondCurrencyValue changed
      // so let's just take it like only a firstCurrencyValue changed, and we will change secondCurrencyValue
      console.warn(
        "Both firstCurrencyValue and secondCurrencyValue changed, so let's just take it like only a firstCurrencyValue changed, and we will change secondCurrencyValue"
      );
      this.convertByFirstCurrency(res);
    } else if (differences.includes('firstCurrencyValue')) {
      // user changed firstCurrencyValue, so we will change secondCurrencyValue
      console.log(
        'User changed firstCurrencyValue, so we will change secondCurrencyValue'
      );
      this.convertByFirstCurrency(res);
    } else if (differences.includes('secondCurrencyValue')) {
      // user changed secondCurrencyValue, so we will change firstCurrencyValue
      console.log(
        'User changed secondCurrencyValue, so we will change firstCurrencyValue'
      );
      this.convertBySecondCurrency(res);
    } else if (differences.includes('firstCurrency') || differences.includes('secondCurrency')) {
      // user changed one or both firstCurrencies, so we will change secondCurrencyValue
      console.log(
        'user changed one or both firstCurrencies, so we will change secondCurrencyValue'
      );
      this.convertByFirstCurrency(res);
    }
  }

  convertByFirstCurrency(res: formValue): void {
    const newFormValue = { ...res };
    newFormValue.secondCurrencyValue = this.convertCurrency(newFormValue.firstCurrency, newFormValue.secondCurrency, newFormValue.firstCurrencyValue);
    console.log(newFormValue);
    this.currencyForm?.patchValue(newFormValue, { emitEvent: false });
    // set new value for previousCurrencyFormValue to check difference next time
    this.previousCurrencyFormValue = { ...newFormValue };
  }

  convertBySecondCurrency(res: formValue): void {
    const newFormValue = { ...res };
    newFormValue.firstCurrencyValue = this.convertCurrency(newFormValue.secondCurrency, newFormValue.firstCurrency, newFormValue.secondCurrencyValue);
    console.log(newFormValue);
    this.currencyForm?.patchValue(newFormValue, { emitEvent: false });
    // set new value for previousCurrencyFormValue to check difference next time
    this.previousCurrencyFormValue = { ...newFormValue };
  }

  // TODO: handle missing or outdated exchange rates
  convertCurrency(fromCode: string, toCode: string, fromValue: number): number {
    let result = 0;
    if (fromCode === toCode) {
      result = fromValue;
      return result;
    }
    const directExchangeRate = this.mockExchangeRates.find(rate => {
      return rate.firstCurrencyCode === fromCode && rate.secondCurrencyCode === toCode;
    });
    if (!directExchangeRate) {
      const backwardExchangeRate = this.mockExchangeRates.find(rate => {
        return rate.firstCurrencyCode === toCode && rate.secondCurrencyCode === fromCode;
      });
      console.log('backwardExchangeRate', backwardExchangeRate);
      if(backwardExchangeRate && backwardExchangeRate.rate) {
        result = fromValue / backwardExchangeRate.rate;
      }
    } else if(directExchangeRate.rate) {
      console.log('directExchangeRate', directExchangeRate);
      result = fromValue * directExchangeRate.rate;
    }
    return result;
  }

  getObjectDiff(obj1: any, obj2: any): string[] {
    return Object.keys(obj1).reduce((result, key) => {
      if (!obj2.hasOwnProperty(key)) {
        result.push(key);
      } else if (obj1[key] === obj2[key]) {
        const resultKeyIndex = result.indexOf(key);
        result.splice(resultKeyIndex, 1);
      }
      return result;
    }, Object.keys(obj2));
  }
}
