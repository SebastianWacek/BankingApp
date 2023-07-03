const fs = require('fs');

const data = [
  {
    city: 'Warszawa',
    ATMs: [
      {
        name: 'Bankomat 1',
        street: 'ul. Bankowa 1',
        latitude: 52.229676,
        longitude: 21.012229,
      },
      {
        name: 'Bankomat 2',
        street: 'ul. Finansowa 2',
        latitude: 52.231345,
        longitude: 21.015678,
      },
    ],
  },
  {
    city: 'Kraków',
    ATMs: [
      {
        name: 'Bankomat 3',
        street: 'ul. Kasaowa 3',
        latitude: 50.06465,
        longitude: 19.94498,
      },
      {
        name: 'Bankomat 4',
        street: 'ul. Gotówkowa 4',
        latitude: 50.062345,
        longitude: 19.937654,
      },
    ],
  },
  {
    city: 'Gdańsk',
    ATMs: [
      {
        name: 'Bankomat 5',
        street: 'ul. Pomorska 5',
        latitude: 54.352025,
        longitude: 18.646638,
      },
      {
        name: 'Bankomat 6',
        street: 'ul. Nadmorska 6',
        latitude: 54.354732,
        longitude: 18.659164,
      },
    ],
  },
  {
    city: 'Wrocław',
    ATMs: [
      {
        name: 'Bankomat 7',
        street: 'ul. Dolna 7',
        latitude: 51.109973,
        longitude: 17.031342,
      },
      {
        name: 'Bankomat 8',
        street: 'ul. Górna 8',
        latitude: 51.109207,
        longitude: 17.031805,
      },
    ],
  },
  {
    city: 'Lublin',
    ATMs: [
      {
        name: 'Bankomat 9',
        street: 'ul. Lubelska 9',
        latitude: 51.246452,
        longitude: 22.568445,
      },
      {
        name: 'Bankomat 10',
        street: 'ul. Narutowicza 10',
        latitude: 51.250328,
        longitude: 22.558901,
      },
    ],
  },
  {
    city: 'Kielce',
    ATMs: [
      {
        name: 'Bankomat 11',
        street: 'ul. Świętokrzyska 11',
        latitude: 50.870637,
        longitude: 20.634377,
      },
      {
        name: 'Bankomat 12',
        street: 'ul. Sienkiewicza 12',
        latitude: 50.866236,
        longitude: 20.636485,
      },
    ],
  },
  {
    city: 'Poznań',
    ATMs: [
      {
        name: 'Bankomat 13',
        street: 'ul. Wielkopolska 13',
        latitude: 52.408266,
        longitude: 16.933519,
      },
      {
        name: 'Bankomat 14',
        street: 'ul. Święty Marcin 14',
        latitude: 52.406437,
        longitude: 16.933994,
      },
    ],
  },
];

const jsonData = JSON.stringify(data, null, 2);

fs.writeFile('atms.json', jsonData, (err) => {
  if (err) {
    console.error('Błąd zapisu pliku JSON:', err);
  } else {
    console.log('Plik JSON został zapisany.');
  }
});
