/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18
    }
  }
});
let flag = true;
function CountrySelect(props) {
  const classes = useStyles();
  const val = [];

  if (flag) {
    props.visitedCount &&
      props.visitedCount.forEach(function (x, index) {
        val[index] = { label: x };
      });
  }

  flag = false;
  console.log(val);
  return (
    <Autocomplete
      multiple
      onChange={(e, val) => props.onChange(val)}
      id='country-select-demo'
      style={{ width: 300 }}
      options={countries}
      classes={{
        option: classes.option
      }}
      defaultValue={val.map(i => i)}
      autoSelect={true}
      autoHighlight
      getOptionLabel={option => option.label || ''}
      renderOption={option => <React.Fragment>{option.label}</React.Fragment>}
      renderInput={params => (
        <TextField
          {...params}
          label="Select countries you've visited"
          margin='normal'
          variant='outlined'
          // defaultValue={[val]}
          inputProps={{
            ...params.inputProps
          }}
          fullWidth
        />
      )}
    />
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { label: 'Andorra' },
  { label: 'United Arab Emirates' },
  { label: 'Afghanistan' },
  { label: 'Antigua and Barbuda' },
  { label: 'Anguilla' },
  { label: 'Albania' },
  { label: 'Armenia' },
  { label: 'Angola' },
  { label: 'Antarctica' },
  { label: 'Argentina' },
  { label: 'American Samoa' },
  { label: 'Austria' },
  { label: 'Australia' },
  { label: 'Aruba' },
  { label: 'Alland Islands' },
  { label: 'Azerbaijan' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Barbados' },
  { label: 'Bangladesh' },
  { label: 'Belgium' },
  { label: 'Burkina Faso' },
  { label: 'Bulgaria' },
  { label: 'Bahrain' },
  { label: 'Burundi' },
  { label: 'Benin' },
  { label: 'Saint Barthelemy' },
  { label: 'Bermuda' },
  { label: 'Brunei Darussalam' },
  { label: 'Bolivia' },
  { label: 'Brazil' },
  { label: 'Bahamas' },
  { label: 'Bhutan' },
  { label: 'Bouvet Island' },
  { label: 'Botswana' },
  { label: 'Belarus' },
  { label: 'Belize' },
  { label: 'Canada' },
  { label: 'Cocos (Keeling) Islands' },
  { label: 'Congo Democratic Republic of the' },
  { label: 'Central African Republic' },
  { label: 'Congo Republic of the' },
  { label: 'Switzerland' },
  { label: "Cote d'Ivoire" },
  { label: 'Cook Islands' },
  { label: 'Chile' },
  { label: 'Cameroon' },
  { label: 'China' },
  { label: 'Colombia' },
  { label: 'Costa Rica' },
  { label: 'Cuba' },
  { label: 'Cape Verde' },
  { label: 'Curacao' },
  { label: 'Christmas Island' },
  { label: 'Cyprus' },
  { label: 'Czech Republic' },
  { label: 'Germany' },
  { label: 'Djibouti' },
  { label: 'Denmark' },
  { label: 'Dominica' },
  { label: 'Dominican Republic' },
  { label: 'Algeria' },
  { label: 'Ecuador' },
  { label: 'Estonia' },
  { label: 'Egypt' },
  { label: 'Western Sahara' },
  { label: 'Eritrea' },
  { label: 'Spain' },
  { label: 'Ethiopia' },
  { label: 'Finland' },
  { label: 'Fiji' },
  { label: 'Falkland Islands (Malvinas)' },
  { label: 'Micronesia Federated States of' },
  { label: 'Faroe Islands' },
  { label: 'France' },
  { label: 'Gabon' },
  { label: 'United Kingdom' },
  { label: 'Grenada' },
  { label: 'Georgia' },
  { label: 'French Guiana' },
  { label: 'Guernsey' },
  { label: 'Ghana' },
  { label: 'Gibraltar' },
  { label: 'Greenland' },
  { label: 'Gambia' },
  { label: 'Guinea' },
  { label: 'Guadeloupe' },
  { label: 'Equatorial Guinea' },
  { label: 'Greece' },
  {
    label: 'South Georgia and the South Sandwich Islands'
  },
  { label: 'Guatemala' },
  { label: 'Guam' },
  { label: 'Guinea-Bissau' },
  { label: 'Guyana' },
  { label: 'Hong Kong' },
  { label: 'Heard Island and McDonald Islands' },
  { label: 'Honduras' },
  { label: 'Croatia' },
  { label: 'Haiti' },
  { label: 'Hungary' },
  { label: 'Indonesia' },
  { label: 'Ireland' },
  { label: 'Israel' },
  { label: 'Isle of Man' },
  { label: 'India' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Iraq' },
  { label: 'Iran Islamic Republic of' },
  { label: 'Iceland' },
  { label: 'Italy' },
  { label: 'Jersey' },
  { label: 'Jamaica' },
  { label: 'Jordan' },
  { label: 'Japan' },
  { label: 'Kenya' },
  { label: 'Kyrgyzstan' },
  { label: 'Cambodia' },
  { label: 'Kiribati' },
  { label: 'Comoros' },
  { label: 'Saint Kitts and Nevis' },
  { label: "Korea Democratic People's Republic of" },
  { label: 'Korea Republic of' },
  { label: 'Kuwait' },
  { label: 'Cayman Islands' },
  { label: 'Kazakhstan' },
  { label: "Lao People's Democratic Republic" },
  { label: 'Lebanon' },
  { label: 'Saint Lucia' },
  { label: 'Liechtenstein' },
  { label: 'Sri Lanka' },
  { label: 'Liberia' },
  { label: 'Lesotho' },
  { label: 'Lithuania' },
  { label: 'Luxembourg' },
  { label: 'Latvia' },
  { label: 'Libya' },
  { label: 'Morocco' },
  { label: 'Monaco' },
  { label: 'Moldova Republic of' },
  { label: 'Montenegro' },
  { label: 'Saint Martin (French part)' },
  { label: 'Madagascar' },
  { label: 'Marshall Islands' },
  {
    label: 'Macedonia the Former Yugoslav Republic of'
  },
  { label: 'Mali' },
  { label: 'Myanmar' },
  { label: 'Mongolia' },
  { label: 'Macao' },
  { label: 'Northern Mariana Islands' },
  { label: 'Martinique' },
  { label: 'Mauritania' },
  { label: 'Montserrat' },
  { label: 'Malta' },
  { label: 'Mauritius' },
  { label: 'Maldives' },
  { label: 'Malawi' },
  { label: 'Mexico' },
  { label: 'Malaysia' },
  { label: 'Mozambique' },
  { label: 'Namibia' },
  { label: 'New Caledonia' },
  { label: 'Niger' },
  { label: 'Norfolk Island' },
  { label: 'Nigeria' },
  { label: 'Nicaragua' },
  { label: 'Netherlands' },
  { label: 'Norway' },
  { label: 'Nepal' },
  { label: 'Nauru' },
  { label: 'Niue' },
  { label: 'New Zealand' },
  { label: 'Oman' },
  { label: 'Panama' },
  { label: 'Peru' },
  { label: 'French Polynesia' },
  { label: 'Papua New Guinea' },
  { label: 'Philippines' },
  { label: 'Pakistan' },
  { label: 'Poland' },
  { label: 'Saint Pierre and Miquelon' },
  { label: 'Pitcairn' },
  { label: 'Puerto Rico' },
  { label: 'Palestine State of' },
  { label: 'Portugal' },
  { label: 'Palau' },
  { label: 'Paraguay' },
  { label: 'Qatar' },
  { label: 'Reunion' },
  { label: 'Romania' },
  { label: 'Serbia' },
  { label: 'Russian Federation' },
  { label: 'Rwanda' },
  { label: 'Saudi Arabia' },
  { label: 'Solomon Islands' },
  { label: 'Seychelles' },
  { label: 'Sudan' },
  { label: 'Sweden' },
  { label: 'Singapore' },
  { label: 'Saint Helena' },
  { label: 'Slovenia' },
  { label: 'Svalbard and Jan Mayen' },
  { label: 'Slovakia' },
  { label: 'Sierra Leone' },
  { label: 'San Marino' },
  { label: 'Senegal' },
  { label: 'Somalia' },
  { label: 'Suriname' },
  { label: 'South Sudan' },
  { label: 'Sao Tome and Principe' },
  { label: 'El Salvador' },
  { label: 'Sint Maarten (Dutch part)' },
  { label: 'Syrian Arab Republic' },
  { label: 'Swaziland' },
  { label: 'Turks and Caicos Islands' },
  { label: 'Chad' },
  { label: 'French Southern Territories' },
  { label: 'Togo' },
  { label: 'Thailand' },
  { label: 'Tajikistan' },
  { label: 'Tokelau' },
  { label: 'Timor-Leste' },
  { label: 'Turkmenistan' },
  { label: 'Tunisia' },
  { label: 'Tonga' },
  { label: 'Turkey' },
  { label: 'Trinidad and Tobago' },
  { label: 'Tuvalu' },
  { label: 'Taiwan Province of China' },
  { label: 'United Republic of Tanzania' },
  { label: 'Ukraine' },
  { label: 'Uganda' },
  { label: 'United States' },
  { label: 'Uruguay' },
  { label: 'Uzbekistan' },
  { label: 'Holy See (Vatican City State)' },
  { label: 'Saint Vincent and the Grenadines' },
  { label: 'Venezuela' },
  { label: 'British Virgin Islands' },
  { label: 'US Virgin Islands' },
  { label: 'Vietnam' },
  { label: 'Vanuatu' },
  { label: 'Wallis and Futuna' },
  { label: 'Samoa' },
  { label: 'Kosovo' },
  { label: 'Yemen' },
  { label: 'Mayotte' },
  { label: 'South Africa' },
  { label: 'Zambia' },
  { label: 'Zimbabwe' }
];

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(mapStateToProps)(CountrySelect);
