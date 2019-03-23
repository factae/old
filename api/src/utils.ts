import {DateTime} from 'luxon'
import {ValueTransformer} from 'typeorm/decorator/options/ValueTransformer'

export class DateTimeTransformer implements ValueTransformer {
  public from(value: string): DateTime {
    console.log(value, DateTime.fromSQL(value).toFormat('yyyy'))
    return DateTime.fromSQL(value)
  }

  public to(value: DateTime | string | null): string | null {
    return value instanceof DateTime ? value.toSQL() : value
  }
}
