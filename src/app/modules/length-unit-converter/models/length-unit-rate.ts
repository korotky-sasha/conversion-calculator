export interface LengthUnitRate {
  LengthUnitCode: string,
  rate: number
}

export interface LengthUnitRow {
  key: string;
  rates: LengthUnitRate[];
}
