# OH-MY-DATE

## Simple and alegant Vue datepicker. Finally 🤘

## How to use

### Install via npm:

```
npm install oh-my-date
```

### Use in your vue templates:

```
<date-picker v-model="date"></date-picker>
```

## Settings

### You can customize datepicker via props:

| prop                                      | effect                                                  |
| ----------------------------------------- | ------------------------------------------------------- |
| yearsPeriod="30"                          | show 30 years in years list                             |
| :disabledDays="[3,10,20]"                 | you can disable some days from being selected           |
| :disabledMonths="['january', 'february']" | you can disable some months from being selected         |
| :disabledYears=['1917', '2008']           | you can disable some years from being selected          |
| theme="flat"                              | change visual appearance to flat style                  |
| locale="ru"                               | change locale, default EN, for now only RU is available |

See [Demo](https://bagahunda.github.io).
