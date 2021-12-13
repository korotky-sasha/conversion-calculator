import { LengthUnit, LengthUnitRow } from '../models';

export const LENGTH_UNITS: LengthUnit[] = [
  { name: 'Millimeters', shorthand: 'mm' },
  { name: 'Centimeters', shorthand: 'cm' },
  { name: 'Meters', shorthand: 'm' },
  { name: 'Kilometers', shorthand: 'km' },
  { name: 'Inches', shorthand: 'in' },
  { name: 'Feet', shorthand: 'ft' },
  { name: 'Yards', shorthand: 'yd' },
  { name: 'Miles', shorthand: 'mi' }
];

export const LENGTH_TABLE: LengthUnitRow[] = [
  {
    key: 'mm',
    rates: [
      {
        LengthUnitCode: 'cm',
        rate: 0.1
      },
      {
        LengthUnitCode: 'm',
        rate: 0.001
      },
      {
        LengthUnitCode: 'km',
        rate: 0.000001
      },
      {
        LengthUnitCode: 'in',
        rate: 0.03937
      },
      {
        LengthUnitCode: 'ft',
        rate: 0.003281
      },
      {
        LengthUnitCode: 'yd',
        rate: 0.001094
      },
      {
        LengthUnitCode: 'mi',
        rate: 0.000000621
      }
    ]
  },
  {
    key: 'cm',
    rates: [
      {
        LengthUnitCode: 'mm',
        rate: 10
      },
      {
        LengthUnitCode: 'm',
        rate: 0.01
      },
      {
        LengthUnitCode: 'km',
        rate: 0.00001
      },
      {
        LengthUnitCode: 'in',
        rate: 0.393701
      },
      {
        LengthUnitCode: 'ft',
        rate: 0.032808
      },
      {
        LengthUnitCode: 'yd',
        rate: 0.010936
      },
      {
        LengthUnitCode: 'mi',
        rate: 0.00000621
      }
    ]
  },
  {
    key: 'm',
    rates: [
      {
        LengthUnitCode: 'mm',
        rate: 1000
      },
      {
        LengthUnitCode: 'cm',
        rate: 100
      },
      {
        LengthUnitCode: 'km',
        rate: 0.001
      },
      {
        LengthUnitCode: 'in',
        rate: 39.37008
      },
      {
        LengthUnitCode: 'ft',
        rate: 3.28084
      },
      {
        LengthUnitCode: 'yd',
        rate: 1.093613
      },
      {
        LengthUnitCode: 'mi',
        rate: 0.000621
      }
    ]
  },
  {
    key: 'km',
    rates: [
      {
        LengthUnitCode: 'mm',
        rate: 1000000
      },
      {
        LengthUnitCode: 'cm',
        rate: 100000
      },
      {
        LengthUnitCode: 'm',
        rate: 1000
      },
      {
        LengthUnitCode: 'in',
        rate: 39370.08
      },
      {
        LengthUnitCode: 'ft',
        rate: 3280.84
      },
      {
        LengthUnitCode: 'yd',
        rate: 1093.613
      },
      {
        LengthUnitCode: 'mi',
        rate: 0.621371
      }
    ]
  },
  {
    key: 'in',
    rates: [
      {
        LengthUnitCode: 'mm',
        rate: 25.4
      },
      {
        LengthUnitCode: 'cm',
        rate: 2.54
      },
      {
        LengthUnitCode: 'm',
        rate: 0.0254
      },
      {
        LengthUnitCode: 'km',
        rate: 0.000025
      },
      {
        LengthUnitCode: 'ft',
        rate: 0.083333
      },
      {
        LengthUnitCode: 'yd',
        rate: 0.027778
      },
      {
        LengthUnitCode: 'mi',
        rate: 0.000016
      }
    ]
  },
  {
    key: 'ft',
    rates: [
      {
        LengthUnitCode: 'mm',
        rate: 304.8
      },
      {
        LengthUnitCode: 'cm',
        rate: 30.48
      },
      {
        LengthUnitCode: 'm',
        rate: 0.3048
      },
      {
        LengthUnitCode: 'km',
        rate: 0.000305
      },
      {
        LengthUnitCode: 'in',
        rate: 12
      },
      {
        LengthUnitCode: 'yd',
        rate: 0.333333
      },
      {
        LengthUnitCode: 'mi',
        rate: 0.000189
      }
    ]
  },
  {
    key: 'yd',
    rates: [
      {
        LengthUnitCode: 'mm',
        rate: 914.4
      },
      {
        LengthUnitCode: 'cm',
        rate: 91.44
      },
      {
        LengthUnitCode: 'm',
        rate: 0.9144
      },
      {
        LengthUnitCode: 'km',
        rate: 0.000914
      },
      {
        LengthUnitCode: 'in',
        rate: 36
      },
      {
        LengthUnitCode: 'ft',
        rate: 3
      },
      {
        LengthUnitCode: 'mi',
        rate: 0.000568
      }
    ]
  },
  {
    key: 'mi',
    rates: [
      {
        LengthUnitCode: 'mm',
        rate: 1609344
      },
      {
        LengthUnitCode: 'cm',
        rate: 160934.4
      },
      {
        LengthUnitCode: 'm',
        rate: 1609.344
      },
      {
        LengthUnitCode: 'km',
        rate: 1.609344
      },
      {
        LengthUnitCode: 'in',
        rate: 63360
      },
      {
        LengthUnitCode: 'ft',
        rate: 5280
      },
      {
        LengthUnitCode: 'yd',
        rate: 1760
      }
    ]
  }
];
