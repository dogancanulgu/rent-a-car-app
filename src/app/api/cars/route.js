import axios from 'axios';
import { getUserIdAndRoleByValidToken } from '@/util/Util';
import { NextResponse } from 'next/server';
import Car from '@/models/carModel';

export async function GET(request) {
  try {
    // get user id and role from token
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);

    // get all filters from parameters
    const filter = Object.fromEntries(request.nextUrl.searchParams.entries());

    // user can not access cars which are not active
    if (role === 'user') {
      filter.active = true;
    }

    // get car list by filter
    const carList = await Car.find(filter);

    return NextResponse.json({ message: 'Car list is fetched successfully', data: carList }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);

    // user can not be allowed to add a car
    if (role === 'user') {
      throw new Error('You are not allowed to add a car');
    }

    const requestInfo = await request.json();

    const options = {
      method: 'GET',
      url: `https://${process.env.RAPIDAPI_HOST}/api/${requestInfo.url}`,
      params: requestInfo.params,
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
      },
    };

    // if (requestInfo.url == 'makes') {
    //   return NextResponse.json({ data: makesData }, { status: 200 });
    // } else if (requestInfo.url == 'models') {
    //   return NextResponse.json({ data: modelsData }, { status: 200 });
    // } else if (requestInfo.url == 'years') {
    //   return NextResponse.json({ data: yearsData }, { status: 200 });
    // } else if (requestInfo.url == 'trims') {
    //   return NextResponse.json({ data: trimsData }, { status: 200 });
    // } else if (requestInfo.url == 'trims/14894') {
    //   return NextResponse.json({ data: carData }, { status: 200 });
    // }
    const response = await axios.request(options);
    // const data = response.data

    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

const makesData = {
  collection: {
    url: '/api/makes?direction=asc&sort=name',
    count: 67,
    pages: 1,
    total: 67,
    next: '',
    prev: '',
    first: '/api/makes?direction=asc&sort=name',
    last: '',
  },
  data: [
    {
      id: 1,
      name: 'Acura',
    },
    {
      id: 24,
      name: 'Alfa Romeo',
    },
    {
      id: 64,
      name: 'AM General',
    },
    {
      id: 44,
      name: 'Aston Martin',
    },
    {
      id: 2,
      name: 'Audi',
    },
    {
      id: 25,
      name: 'Bentley',
    },
    {
      id: 3,
      name: 'BMW',
    },
    {
      id: 56,
      name: 'Bugatti',
    },
    {
      id: 4,
      name: 'Buick',
    },
    {
      id: 5,
      name: 'Cadillac',
    },
    {
      id: 6,
      name: 'Chevrolet',
    },
    {
      id: 26,
      name: 'Chrysler',
    },
    {
      id: 62,
      name: 'Daewoo',
    },
    {
      id: 27,
      name: 'Dodge',
    },
    {
      id: 65,
      name: 'Eagle',
    },
    {
      id: 46,
      name: 'Ferrari',
    },
    {
      id: 28,
      name: 'FIAT',
    },
    {
      id: 50,
      name: 'Fisker',
    },
    {
      id: 29,
      name: 'Ford',
    },
    {
      id: 7,
      name: 'Genesis',
    },
    {
      id: 66,
      name: 'Geo',
    },
    {
      id: 8,
      name: 'GMC',
    },
    {
      id: 9,
      name: 'Honda',
    },
    {
      id: 54,
      name: 'HUMMER',
    },
    {
      id: 10,
      name: 'Hyundai',
    },
    {
      id: 11,
      name: 'INFINITI',
    },
    {
      id: 59,
      name: 'Isuzu',
    },
    {
      id: 12,
      name: 'Jaguar',
    },
    {
      id: 30,
      name: 'Jeep',
    },
    {
      id: 31,
      name: 'Karma',
    },
    {
      id: 13,
      name: 'Kia',
    },
    {
      id: 32,
      name: 'Lamborghini',
    },
    {
      id: 14,
      name: 'Land Rover',
    },
    {
      id: 33,
      name: 'Lexus',
    },
    {
      id: 15,
      name: 'Lincoln',
    },
    {
      id: 45,
      name: 'Lotus',
    },
    {
      id: 34,
      name: 'Lucid',
    },
    {
      id: 35,
      name: 'Maserati',
    },
    {
      id: 51,
      name: 'Maybach',
    },
    {
      id: 16,
      name: 'Mazda',
    },
    {
      id: 36,
      name: 'McLaren',
    },
    {
      id: 37,
      name: 'Mercedes-Benz',
    },
    {
      id: 53,
      name: 'Mercury',
    },
    {
      id: 17,
      name: 'MINI',
    },
    {
      id: 18,
      name: 'Mitsubishi',
    },
    {
      id: 19,
      name: 'Nissan',
    },
    {
      id: 61,
      name: 'Oldsmobile',
    },
    {
      id: 60,
      name: 'Panoz',
    },
    {
      id: 63,
      name: 'Plymouth',
    },
    {
      id: 20,
      name: 'Polestar',
    },
    {
      id: 55,
      name: 'Pontiac',
    },
    {
      id: 38,
      name: 'Porsche',
    },
    {
      id: 39,
      name: 'Ram',
    },
    {
      id: 40,
      name: 'Rivian',
    },
    {
      id: 41,
      name: 'Rolls-Royce',
    },
    {
      id: 52,
      name: 'Saab',
    },
    {
      id: 57,
      name: 'Saturn',
    },
    {
      id: 48,
      name: 'Scion',
    },
    {
      id: 47,
      name: 'smart',
    },
    {
      id: 58,
      name: 'Spyker',
    },
    {
      id: 21,
      name: 'Subaru',
    },
    {
      id: 49,
      name: 'Suzuki',
    },
    {
      id: 42,
      name: 'Tesla',
    },
    {
      id: 22,
      name: 'Toyota',
    },
    {
      id: 67,
      name: 'VinFast',
    },
    {
      id: 43,
      name: 'Volkswagen',
    },
    {
      id: 23,
      name: 'Volvo',
    },
  ],
};

const modelsData = {
  collection: {
    url: '/api/models?verbose=yes&make_id=42&direction=asc&sort=name',
    count: 5,
    pages: 1,
    total: 5,
    next: '',
    prev: '',
    first: '/api/models?verbose=yes&make_id=42&direction=asc&sort=name',
    last: '',
  },
  data: [
    {
      id: 356,
      make_id: 42,
      name: '******* (hidden)',
      make: {
        id: 42,
        name: 'Tesla',
      },
      __message:
        'NOTE: Data is limited to 2015-2020 for non-paying users. Search for 2015-2020 vehicles or subscribe to unlock this data. If you are still seeing this message after subscribing, be sure you have renewed your JWT and are including it in the HTTP authentication header. Read more here: https://carapi.app/docs/#authentication',
    },
    {
      id: 357,
      make_id: 42,
      name: '******* (hidden)',
      make: {
        id: 42,
        name: 'Tesla',
      },
      __message:
        'NOTE: Data is limited to 2015-2020 for non-paying users. Search for 2015-2020 vehicles or subscribe to unlock this data. If you are still seeing this message after subscribing, be sure you have renewed your JWT and are including it in the HTTP authentication header. Read more here: https://carapi.app/docs/#authentication',
    },
    {
      id: 358,
      make_id: 42,
      name: '******* (hidden)',
      make: {
        id: 42,
        name: 'Tesla',
      },
      __message:
        'NOTE: Data is limited to 2015-2020 for non-paying users. Search for 2015-2020 vehicles or subscribe to unlock this data. If you are still seeing this message after subscribing, be sure you have renewed your JWT and are including it in the HTTP authentication header. Read more here: https://carapi.app/docs/#authentication',
    },
    {
      id: 359,
      make_id: 42,
      name: '******* (hidden)',
      make: {
        id: 42,
        name: 'Tesla',
      },
      __message:
        'NOTE: Data is limited to 2015-2020 for non-paying users. Search for 2015-2020 vehicles or subscribe to unlock this data. If you are still seeing this message after subscribing, be sure you have renewed your JWT and are including it in the HTTP authentication header. Read more here: https://carapi.app/docs/#authentication',
    },
    {
      id: 739,
      make_id: 42,
      name: '******** (hidden)',
      make: {
        id: 42,
        name: 'Tesla',
      },
      __message:
        'NOTE: Data is limited to 2015-2020 for non-paying users. Search for 2015-2020 vehicles or subscribe to unlock this data. If you are still seeing this message after subscribing, be sure you have renewed your JWT and are including it in the HTTP authentication header. Read more here: https://carapi.app/docs/#authentication',
    },
  ],
};

const yearsData = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

const trimsData = {
  collection: {
    url: '/api/trims?verbose=yes&year=2018&direction=asc&make_model_id=356&sort=name',
    count: 4,
    pages: 1,
    total: 4,
    next: '',
    prev: '',
    first: '/api/trims?verbose=yes&year=2018&direction=asc&make_model_id=356&sort=name',
    last: '',
  },
  data: [
    {
      id: 14894,
      make_model_id: 356,
      year: 2018,
      name: 'Long Range',
      description: 'Long Range 4dr Sedan (electric DD)',
      msrp: 49000,
      invoice: 0,
      created: '2023-06-29T21:02:20-04:00',
      modified: '2023-06-29T21:02:20-04:00',
      make_model: {
        id: 356,
        make_id: 42,
        name: 'Model 3',
        make: {
          id: 42,
          name: 'Tesla',
        },
      },
    },
    {
      id: 14895,
      make_model_id: 356,
      year: 2018,
      name: 'Long Range',
      description: 'Long Range 4dr Sedan AWD (electric DD)',
      msrp: 55000,
      invoice: 0,
      created: '2023-06-29T21:02:20-04:00',
      modified: '2023-06-29T21:02:20-04:00',
      make_model: {
        id: 356,
        make_id: 42,
        name: 'Model 3',
        make: {
          id: 42,
          name: 'Tesla',
        },
      },
    },
    {
      id: 14893,
      make_model_id: 356,
      year: 2018,
      name: 'Mid Range',
      description: 'Mid Range 4dr Sedan (electric DD)',
      msrp: 46000,
      invoice: 0,
      created: '2023-06-29T21:02:20-04:00',
      modified: '2023-06-29T21:02:20-04:00',
      make_model: {
        id: 356,
        make_id: 42,
        name: 'Model 3',
        make: {
          id: 42,
          name: 'Tesla',
        },
      },
    },
    {
      id: 14896,
      make_model_id: 356,
      year: 2018,
      name: 'Performance',
      description: 'Performance 4dr Sedan AWD (electric DD)',
      msrp: 64000,
      invoice: 0,
      created: '2023-06-29T21:02:20-04:00',
      modified: '2023-06-29T21:02:20-04:00',
      make_model: {
        id: 356,
        make_id: 42,
        name: 'Model 3',
        make: {
          id: 42,
          name: 'Tesla',
        },
      },
    },
  ],
};

const carData = {
  id: 14894,
  make_model_id: 356,
  year: 2018,
  name: 'Long Range',
  description: 'Long Range 4dr Sedan (electric DD)',
  msrp: 49000,
  invoice: 0,
  created: '2023-06-29T21:02:20-04:00',
  modified: '2023-06-29T21:02:20-04:00',
  make_model_trim_interior_colors: [
    {
      id: 54640,
      make_model_trim_id: 14894,
      name: 'Premium Black, leatherette',
      rgb: '31,32,39',
    },
  ],
  make_model_trim_exterior_colors: [
    {
      id: 152449,
      make_model_trim_id: 14894,
      name: 'Deep Blue Metallic',
      rgb: '29,81,189',
    },
    {
      id: 152451,
      make_model_trim_id: 14894,
      name: 'Midnight Silver Metallic',
      rgb: '109,111,118',
    },
    {
      id: 152447,
      make_model_trim_id: 14894,
      name: 'Obsidian Black Metallic',
      rgb: '15,10,11',
    },
    {
      id: 152453,
      make_model_trim_id: 14894,
      name: 'Pearl White Multi-Coat',
      rgb: '240,240,240',
    },
    {
      id: 152452,
      make_model_trim_id: 14894,
      name: 'Red Multi-Coat',
      rgb: '162,27,9',
    },
    {
      id: 152448,
      make_model_trim_id: 14894,
      name: 'Silver Metallic',
      rgb: '144,150,159',
    },
    {
      id: 152450,
      make_model_trim_id: 14894,
      name: 'Solid Black',
      rgb: '41,41,39',
    },
  ],
  make_model_trim_mileage: {
    id: 14894,
    make_model_trim_id: 14894,
    fuel_tank_capacity: null,
    combined_mpg: null,
    epa_city_mpg: null,
    epa_highway_mpg: null,
    range_city: null,
    range_highway: null,
    battery_capacity_electric: 80,
    epa_time_to_charge_hr_240v_electric: '10.0',
    epa_kwh_100_mi_electric: 26,
    range_electric: 310,
    epa_highway_mpg_electric: 123,
    epa_city_mpg_electric: 136,
    epa_combined_mpg_electric: 130,
  },
  make_model_trim_engine: {
    id: 14894,
    make_model_trim_id: 14894,
    engine_type: 'electric',
    fuel_type: 'electric',
    cylinders: null,
    size: null,
    horsepower_hp: 258,
    horsepower_rpm: null,
    torque_ft_lbs: null,
    torque_rpm: null,
    valves: null,
    valve_timing: null,
    cam_type: null,
    drive_type: 'rear wheel drive',
    transmission: '1-speed direct drive',
  },
  make_model_trim_body: {
    id: 14894,
    make_model_trim_id: 14894,
    type: 'Sedan',
    doors: 4,
    length: '184.8',
    width: '72.8',
    seats: 5,
    height: '56.8',
    wheel_base: '113.2',
    front_track: null,
    rear_track: null,
    ground_clearance: '5.5',
    cargo_capacity: '15.0',
    max_cargo_capacity: null,
    curb_weight: 3805,
    gross_weight: null,
    max_payload: null,
    max_towing_capacity: null,
  },
  make_model: {
    id: 356,
    make_id: 42,
    name: 'Model 3',
    make: {
      id: 42,
      name: 'Tesla',
    },
  },
};
