import React, { Fragment, useState } from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

function KeyboardDatePickerExample(props) {
  const [selectedDate, setDate] = useState(moment()); //here i declare selectedDate using useState Hook and create setDate function which lets me update the selectedDate
  const [inputValue, setInputValue] = useState(moment().format('DD-MM-YYYY'));

  const onDateChange = (date, value) => {
    setDate(date);
    setInputValue(value);
    props.onChange(value);
    console.log(value);
  };

  const dateFormatter = str => {
    return str;
  };

  return (
    <Fragment>
      <MuiPickersUtilsProvider
        libInstance={moment}
        utils={MomentUtils}
        showtodaybutton={false}
      >
        <KeyboardDatePicker
          autoOk={true}
          value={selectedDate}
          format='DD-MM-YYYY'
          inputValue={inputValue}
          onChange={onDateChange}
          rifmFormatter={dateFormatter}
          maxDate={moment()}
          disableFuture={true}
          inputVariant='outlined'
          maxDateMessage='Do you come from the future?'
          variant='inline'
          margin='normal'
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
}

export default KeyboardDatePickerExample;
