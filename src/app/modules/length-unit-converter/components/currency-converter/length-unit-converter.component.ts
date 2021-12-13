import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReplaySubject }                                 from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { LengthUnit, LengthUnitRow }                     from '../../models';
import { LENGTH_UNITS, LENGTH_TABLE }                    from '../../constants';

interface formValue {
  firstLengthUnit: string;
  secondLengthUnit: string;
  firstLengthUnitValue: number;
  secondLengthUnitValue: number;
}

@Component({
  selector: 'app-length-unit-converter',
  templateUrl: './length-unit-converter.component.html',
  styleUrls: [ './length-unit-converter.component.scss' ]
})
export class LengthUnitConverterComponent implements OnInit, OnDestroy {
  // TODO: move to constants
  LengthUnits: LengthUnit[] = LENGTH_UNITS;

  LengthTable: LengthUnitRow[] = LENGTH_TABLE;

  lengthUnitForm?: FormGroup;
  previousLengthUnitFormValue: formValue = {
    firstLengthUnit: '',
    secondLengthUnit: '',
    firstLengthUnitValue: 0,
    secondLengthUnitValue: 0
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
    this.lengthUnitForm = this.formBuilder.group({
      firstLengthUnit: [ '' ],
      secondLengthUnit: [ '' ],
      firstLengthUnitValue: [ 0, Validators.min(0) ],
      secondLengthUnitValue: [ 0, Validators.min(0) ]
    });

    this.lengthUnitForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged<formValue>((x, y) => {
          return JSON.stringify(x) === JSON.stringify(y);
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((res) => {
        this.handleFormValueChanged(res);
      });
  }

  swapCurrencies(): void {
    const newFormValue = { ...this.lengthUnitForm?.value };
    newFormValue.firstLengthUnit = this.lengthUnitForm?.value.secondLengthUnit;
    newFormValue.firstLengthUnitValue = this.lengthUnitForm?.value.secondLengthUnitValue;
    newFormValue.secondLengthUnit = this.lengthUnitForm?.value.firstLengthUnit;
    newFormValue.secondLengthUnitValue = this.lengthUnitForm?.value.firstLengthUnitValue;

    this.lengthUnitForm?.patchValue(newFormValue, { emitEvent: false });
    this.previousLengthUnitFormValue = newFormValue;
  }

  handleFormValueChanged(res: formValue): void {

    // compare two values to see what changed
    const differences = this.getObjectDiff(this.previousLengthUnitFormValue, res);

    // set new value for previousLengthUnitFormValue to check difference next time
    // this.previousLengthUnitFormValue = { ...res };
    if (
      differences.includes('firstLengthUnitValue') &&
      differences.includes('secondLengthUnitValue')
    ) {
      // need to handle rare occasion where both firstLengthUnitValue and secondLengthUnitValue changed
      // so let's just take it like only a firstLengthUnitValue changed, and we will change secondLengthUnitValue
      this.convertByFirstLengthUnit(res);
    } else if ( differences.includes('firstLengthUnitValue') ) {
      // user changed firstLengthUnitValue, so we will change secondLengthUnitValue
      this.convertByFirstLengthUnit(res);
    } else if ( differences.includes('secondLengthUnitValue') ) {
      // user changed secondLengthUnitValue, so we will change firstLengthUnitValue
      this.convertBySecondLengthUnit(res);
    } else if ( differences.includes('firstLengthUnit') || differences.includes('secondLengthUnit') ) {
      // user changed one or both firstCurrencies, so we will change secondLengthUnitValue
      this.convertByFirstLengthUnit(res);
    }
  }

  convertByFirstLengthUnit(res: formValue): void {
    const newFormValue = { ...res };
    newFormValue.secondLengthUnitValue = this.convertLengthUnit(newFormValue.firstLengthUnit,
      newFormValue.secondLengthUnit, newFormValue.firstLengthUnitValue);

    this.lengthUnitForm?.patchValue(newFormValue, { emitEvent: false });
    // set new value for previousLengthUnitFormValue to check difference next time
    this.previousLengthUnitFormValue = { ...newFormValue };
  }

  convertBySecondLengthUnit(res: formValue): void {
    const newFormValue = { ...res };
    newFormValue.firstLengthUnitValue = this.convertLengthUnit(newFormValue.secondLengthUnit,
      newFormValue.firstLengthUnit, newFormValue.secondLengthUnitValue);

    this.lengthUnitForm?.patchValue(newFormValue, { emitEvent: false });
    // set new value for previousLengthUnitFormValue to check difference next time
    this.previousLengthUnitFormValue = { ...newFormValue };
  }

  convertLengthUnit(fromCode: string, toCode: string, fromValue: number): number {
    let result = 0;
    if ( fromCode === toCode ) {
      result = fromValue;
      return result;
    }
    let directExchangeRate;
    this.LengthTable.find(row => {
      return row.key === fromCode && row.rates.find(rate => {
        if ( rate.LengthUnitCode === toCode ) {
          directExchangeRate = rate.rate;
          return true;
        } else {
          return false;
        }
      });
    });
    if ( !directExchangeRate ) {
      let backwardExchangeRate;
      this.LengthTable.find(row => {
        return row.key === toCode && row.rates.find(rate => {
          if ( rate.LengthUnitCode === fromCode ) {
            backwardExchangeRate = rate.rate;
            return true;
          } else {
            return false;
          }
        });
      });

      if ( backwardExchangeRate && backwardExchangeRate ) {
        result = fromValue / backwardExchangeRate;
      }
    } else if ( directExchangeRate ) {

      result = fromValue * directExchangeRate;
    }
    return result;
  }

  getObjectDiff(obj1: any, obj2: any): string[] {
    return Object.keys(obj1).reduce((result, key) => {
      if ( !obj2.hasOwnProperty(key) ) {
        result.push(key);
      } else if ( obj1[key] === obj2[key] ) {
        const resultKeyIndex = result.indexOf(key);
        result.splice(resultKeyIndex, 1);
      }
      return result;
    }, Object.keys(obj2));
  }
}
