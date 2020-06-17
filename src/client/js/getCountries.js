import bodyParser, { json } from 'body-parser';

const getCountries = () => {
  const url = 'http://localhost:8099/allCountries';
  let dropdown = document.getElementById('countryList');
  dropdown.length = 0;

  let defaultOption = document.createElement('option');
  defaultOption.text = 'Choose State/Province';

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option');
        option.text = data[i].name;
        option.value = data[i].code;
        dropdown.add(option);
      }
    });
};

export { getCountries };
