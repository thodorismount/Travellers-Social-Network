import React, { Fragment, useState } from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

function EditBirthDate(props) {
  const [selectedDate, setDate] = useState(moment()); //here i declare selectedDate using useState Hook and create setDate function which lets me update the selectedDate
  const [inputValue, setInputValue] = useState(props.getDate);

  const onDateChange = (date, value) => {
    setDate(date);
    setInputValue(value);
    props.onChange(date);
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
          animateYearScrolling='true'
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
          style={{ marginLeft: '-3px' }}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
}

export default EditBirthDate;
