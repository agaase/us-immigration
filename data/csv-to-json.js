var fs = require('fs');
var csv = require('csv');
var yrWiseJson = {};
var deferred = require('deferred');
var elasticsearch = require('elasticsearch');
// var hostu = "http://localhost:9200";
var hostu = 'http://35.161.122.132:9200/';
var client = new elasticsearch.Client({
  host: hostu
});


function elPost(events){
  var def1 = deferred(), stmts=[];
  for(var i=0;i<events.length;i++){
    stmts.push({ index:  { _index: 'immigration', _type: 'country_yr' } });
    stmts.push(events[i]);
  }
  client.bulk({
    body: stmts
  }, function (error, response) {
      def1.resolve();
  });
  return def1.promise;
}


var world = [
 {
   "country id": "AD",
   "latitude": 42.546245,
   "longitude": 1.601554,
   "name": "Andorra"
 },
 {
   "country id": "AE",
   "latitude": 23.424076,
   "longitude": 53.847818,
   "name": "United Arab Emirates"
 },
 {
   "country id": "AF",
   "latitude": 33.93911,
   "longitude": 67.709953,
   "name": "Afghanistan"
 },
 {
   "country id": "AG",
   "latitude": 17.060816,
   "longitude": -61.796428,
   "name": "Antigua and Barbuda"
 },
 {
   "country id": "AI",
   "latitude": 18.220554,
   "longitude": -63.068615,
   "name": "Anguilla"
 },
 {
   "country id": "AL",
   "latitude": 41.153332,
   "longitude": 20.168331,
   "name": "Albania"
 },
 {
   "country id": "AM",
   "latitude": 40.069099,
   "longitude": 45.038189,
   "name": "Armenia"
 },
 {
   "country id": "AN",
   "latitude": 12.226079,
   "longitude": -69.060087,
   "name": "Netherlands Antilles"
 },
 {
   "country id": "AO",
   "latitude": -11.202692,
   "longitude": 17.873887,
   "name": "Angola"
 },
 {
   "country id": "AQ",
   "latitude": -75.250973,
   "longitude": -0.071389,
   "name": "Antarctica"
 },
 {
   "country id": "AR",
   "latitude": -38.416097,
   "longitude": -63.616672,
   "name": "Argentina"
 },
 {
   "country id": "AS",
   "latitude": -14.270972,
   "longitude": -170.132217,
   "name": "American Samoa"
 },
 {
   "country id": "AT",
   "latitude": 47.516231,
   "longitude": 14.550072,
   "name": "Austria"
 },
 {
   "country id": "AU",
   "latitude": -25.274398,
   "longitude": 133.775136,
   "name": "Australia"
 },
 {
   "country id": "AW",
   "latitude": 12.52111,
   "longitude": -69.968338,
   "name": "Aruba"
 },
 {
   "country id": "AZ",
   "latitude": 40.143105,
   "longitude": 47.576927,
   "name": "Azerbaijan"
 },
 {
   "country id": "BA",
   "latitude": 43.915886,
   "longitude": 17.679076,
   "name": "Yugoslavia(BR)"
 },
 {
   "country id": "BB",
   "latitude": 13.193887,
   "longitude": -59.543198,
   "name": "Barbados"
 },
 {
   "country id": "BD",
   "latitude": 23.684994,
   "longitude": 90.356331,
   "name": "Bangladesh"
 },
 {
   "country id": "BE",
   "latitude": 50.503887,
   "longitude": 4.469936,
   "name": "Belgium"
 },
 {
   "country id": "BF",
   "latitude": 12.238333,
   "longitude": -1.561593,
   "name": "Burkina Faso"
 },
 {
   "country id": "BG",
   "latitude": 42.733883,
   "longitude": 25.48583,
   "name": "Bulgaria"
 },
 {
   "country id": "BH",
   "latitude": 25.930414,
   "longitude": 50.637772,
   "name": "Bahrain"
 },
 {
   "country id": "BI",
   "latitude": -3.373056,
   "longitude": 29.918886,
   "name": "Burundi"
 },
 {
   "country id": "BJ",
   "latitude": 9.30769,
   "longitude": 2.315834,
   "name": "Benin"
 },
 {
   "country id": "BM",
   "latitude": 32.321384,
   "longitude": -64.75737,
   "name": "Bermuda"
 },
 {
   "country id": "BN",
   "latitude": 4.535277,
   "longitude": 114.727669,
   "name": "Brunei"
 },
 {
   "country id": "BO",
   "latitude": -16.290154,
   "longitude": -63.588653,
   "name": "Bolivia"
 },
 {
   "country id": "BR",
   "latitude": -14.235004,
   "longitude": -51.92528,
   "name": "Brazil"
 },
 {
   "country id": "BS",
   "latitude": 25.03428,
   "longitude": -77.39628,
   "name": "Bahamas"
 },
 {
   "country id": "BT",
   "latitude": 27.514162,
   "longitude": 90.433601,
   "name": "Bhutan"
 },
 {
   "country id": "BV",
   "latitude": -54.423199,
   "longitude": 3.413194,
   "name": "Bouvet Island"
 },
 {
   "country id": "BW",
   "latitude": -22.328474,
   "longitude": 24.684866,
   "name": "Botswana"
 },
 {
   "country id": "BY",
   "latitude": 53.709807,
   "longitude": 27.953389,
   "name": "Belarus"
 },
 {
   "country id": "BZ",
   "latitude": 17.189877,
   "longitude": -88.49765,
   "name": "Belize"
 },
 {
   "country id": "CA",
   "latitude": 56.130366,
   "longitude": -106.346771,
   "name": "Canada"
 },
 {
   "country id": "CC",
   "latitude": -12.164165,
   "longitude": 96.870956,
   "name": "Cocos [Keeling] Islands"
 },
 {
   "country id": "CD",
   "latitude": -4.038333,
   "longitude": 21.758664,
   "name": "Congo [DRC]"
 },
 {
   "country id": "CF",
   "latitude": 6.611111,
   "longitude": 20.939444,
   "name": "Central African Republic"
 },
 {
   "country id": "CG",
   "latitude": -0.228021,
   "longitude": 15.827659,
   "name": "Congo [Republic]"
 },
 {
   "country id": "CH",
   "latitude": 46.818188,
   "longitude": 8.227512,
   "name": "Switzerland"
 },
 {
   "country id": "CI",
   "latitude": 7.539989,
   "longitude": -5.54708,
   "name": "Côte d'Ivoire"
 },
 {
   "country id": "CK",
   "latitude": -21.236736,
   "longitude": -159.777671,
   "name": "Cook Islands"
 },
 {
   "country id": "CL",
   "latitude": -35.675147,
   "longitude": -71.542969,
   "name": "Chile"
 },
 {
   "country id": "CM",
   "latitude": 7.369722,
   "longitude": 12.354722,
   "name": "Cameroon"
 },
 {
   "country id": "CN",
   "latitude": 35.86166,
   "longitude": 104.195397,
   "name": "China"
 },
 {
   "country id": "CO",
   "latitude": 4.570868,
   "longitude": -74.297333,
   "name": "Colombia"
 },
 {
   "country id": "CR",
   "latitude": 9.748917,
   "longitude": -83.753428,
   "name": "Costa Rica"
 },
 {
   "country id": "CU",
   "latitude": 21.521757,
   "longitude": -77.781167,
   "name": "Cuba"
 },
 {
   "country id": "CV",
   "latitude": 16.002082,
   "longitude": -24.013197,
   "name": "Cape Verde"
 },
 {
   "country id": "CX",
   "latitude": -10.447525,
   "longitude": 105.690449,
   "name": "Christmas Island"
 },
 {
   "country id": "CY",
   "latitude": 35.126413,
   "longitude": 33.429859,
   "name": "Cyprus"
 },
 {
   "country id": "CZ",
   "latitude": 49.817492,
   "longitude": 15.472962,
   "name": "Czech Republic"
 },
 {
   "country id": "DE",
   "latitude": 51.165691,
   "longitude": 10.451526,
   "name": "Germany"
 },
 {
   "country id": "DJ",
   "latitude": 11.825138,
   "longitude": 42.590275,
   "name": "Djibouti"
 },
 {
   "country id": "DK",
   "latitude": 56.26392,
   "longitude": 9.501785,
   "name": "Denmark"
 },
 {
   "country id": "DM",
   "latitude": 15.414999,
   "longitude": -61.370976,
   "name": "Dominica"
 },
 {
   "country id": "DO",
   "latitude": 18.735693,
   "longitude": -70.162651,
   "name": "Dominican Republic"
 },
 {
   "country id": "DZ",
   "latitude": 28.033886,
   "longitude": 1.659626,
   "name": "Algeria"
 },
 {
   "country id": "EC",
   "latitude": -1.831239,
   "longitude": -78.183406,
   "name": "Ecuador"
 },
 {
   "country id": "EE",
   "latitude": 58.595272,
   "longitude": 25.013607,
   "name": "Estonia"
 },
 {
   "country id": "EG",
   "latitude": 26.820553,
   "longitude": 30.802498,
   "name": "Egypt"
 },
 {
   "country id": "EH",
   "latitude": 24.215527,
   "longitude": -12.885834,
   "name": "Western Sahara"
 },
 {
   "country id": "ER",
   "latitude": 15.179384,
   "longitude": 39.782334,
   "name": "Eritrea"
 },
 {
   "country id": "ES",
   "latitude": 40.463667,
   "longitude": -3.74922,
   "name": "Spain"
 },
 {
   "country id": "ET",
   "latitude": 9.145,
   "longitude": 40.489673,
   "name": "Ethiopia"
 },
 {
   "country id": "FI",
   "latitude": 61.92411,
   "longitude": 25.748151,
   "name": "Finland"
 },
 {
   "country id": "FJ",
   "latitude": -16.578193,
   "longitude": 179.414413,
   "name": "Fiji"
 },
 {
   "country id": "FK",
   "latitude": -51.796253,
   "longitude": -59.523613,
   "name": "Falkland Islands [Islas Malvinas]"
 },
 {
   "country id": "FM",
   "latitude": 7.425554,
   "longitude": 150.550812,
   "name": "Micronesia"
 },
 {
   "country id": "FO",
   "latitude": 61.892635,
   "longitude": -6.911806,
   "name": "Faroe Islands"
 },
 {
   "country id": "FR",
   "latitude": 46.227638,
   "longitude": 2.213749,
   "name": "France"
 },
 {
   "country id": "GA",
   "latitude": -0.803689,
   "longitude": 11.609444,
   "name": "Gabon"
 },
 {
   "country id": "GB",
   "latitude": 55.378051,
   "longitude": -3.435973,
   "name": "United Kingdom"
 },
 {
   "country id": "GD",
   "latitude": 12.262776,
   "longitude": -61.604171,
   "name": "Grenada"
 },
 {
   "country id": "GE",
   "latitude": 42.315407,
   "longitude": 43.356892,
   "name": "Georgia"
 },
 {
   "country id": "GF",
   "latitude": 3.933889,
   "longitude": -53.125782,
   "name": "French Guiana"
 },
 {
   "country id": "GG",
   "latitude": 49.465691,
   "longitude": -2.585278,
   "name": "Guernsey"
 },
 {
   "country id": "GH",
   "latitude": 7.946527,
   "longitude": -1.023194,
   "name": "Ghana"
 },
 {
   "country id": "GI",
   "latitude": 36.137741,
   "longitude": -5.345374,
   "name": "Gibraltar"
 },
 {
   "country id": "GL",
   "latitude": 71.706936,
   "longitude": -42.604303,
   "name": "Greenland"
 },
 {
   "country id": "GM",
   "latitude": 13.443182,
   "longitude": -15.310139,
   "name": "Gambia"
 },
 {
   "country id": "GN",
   "latitude": 9.945587,
   "longitude": -9.696645,
   "name": "Guinea"
 },
 {
   "country id": "GP",
   "latitude": 16.995971,
   "longitude": -62.067641,
   "name": "Guadeloupe"
 },
 {
   "country id": "GQ",
   "latitude": 1.650801,
   "longitude": 10.267895,
   "name": "Equatorial Guinea"
 },
 {
   "country id": "GR",
   "latitude": 39.074208,
   "longitude": 21.824312,
   "name": "Greece"
 },
 {
   "country id": "GS",
   "latitude": -54.429579,
   "longitude": -36.587909,
   "name": "South Georgia and the South Sandwich Islands"
 },
 {
   "country id": "GT",
   "latitude": 15.783471,
   "longitude": -90.230759,
   "name": "Guatemala"
 },
 {
   "country id": "GU",
   "latitude": 13.444304,
   "longitude": 144.793731,
   "name": "Guam"
 },
 {
   "country id": "GW",
   "latitude": 11.803749,
   "longitude": -15.180413,
   "name": "Guinea-Bissau"
 },
 {
   "country id": "GY",
   "latitude": 4.860416,
   "longitude": -58.93018,
   "name": "Guyana"
 },
 {
   "country id": "GZ",
   "latitude": 31.354676,
   "longitude": 34.308825,
   "name": "Gaza Strip"
 },
 {
   "country id": "HK",
   "latitude": 22.396428,
   "longitude": 114.109497,
   "name": "Hong Kong"
 },
 {
   "country id": "HM",
   "latitude": -53.08181,
   "longitude": 73.504158,
   "name": "Heard Island and McDonald Islands"
 },
 {
   "country id": "HN",
   "latitude": 15.199999,
   "longitude": -86.241905,
   "name": "Honduras"
 },
 {
   "country id": "HR",
   "latitude": 45.1,
   "longitude": 15.2,
   "name": "Croatia"
 },
 {
   "country id": "HT",
   "latitude": 18.971187,
   "longitude": -72.285215,
   "name": "Haiti"
 },
 {
   "country id": "HU",
   "latitude": 47.162494,
   "longitude": 19.503304,
   "name": "Hungary"
 },
 {
   "country id": "ID",
   "latitude": -0.789275,
   "longitude": 113.921327,
   "name": "Indonesia"
 },
 {
   "country id": "IE",
   "latitude": 53.41291,
   "longitude": -8.24389,
   "name": "Ireland"
 },
 {
   "country id": "IL",
   "latitude": 31.046051,
   "longitude": 34.851612,
   "name": "Israel"
 },
 {
   "country id": "IM",
   "latitude": 54.236107,
   "longitude": -4.548056,
   "name": "Isle of Man"
 },
 {
   "country id": "IN",
   "latitude": 20.593684,
   "longitude": 78.96288,
   "name": "India"
 },
 {
   "country id": "IO",
   "latitude": -6.343194,
   "longitude": 71.876519,
   "name": "British Indian Ocean Territory"
 },
 {
   "country id": "IQ",
   "latitude": 33.223191,
   "longitude": 43.679291,
   "name": "Iraq"
 },
 {
   "country id": "IR",
   "latitude": 32.427908,
   "longitude": 53.688046,
   "name": "Iran"
 },
 {
   "country id": "IS",
   "latitude": 64.963051,
   "longitude": -19.020835,
   "name": "Iceland"
 },
 {
   "country id": "IT",
   "latitude": 41.87194,
   "longitude": 12.56738,
   "name": "Italy"
 },
 {
   "country id": "JE",
   "latitude": 49.214439,
   "longitude": -2.13125,
   "name": "Jersey"
 },
 {
   "country id": "JM",
   "latitude": 18.109581,
   "longitude": -77.297508,
   "name": "Jamaica"
 },
 {
   "country id": "JO",
   "latitude": 30.585164,
   "longitude": 36.238414,
   "name": "Jordan"
 },
 {
   "country id": "JP",
   "latitude": 36.204824,
   "longitude": 138.252924,
   "name": "Japan"
 },
 {
   "country id": "KE",
   "latitude": -0.023559,
   "longitude": 37.906193,
   "name": "Kenya"
 },
 {
   "country id": "KG",
   "latitude": 41.20438,
   "longitude": 74.766098,
   "name": "Kyrgyzstan"
 },
 {
   "country id": "KH",
   "latitude": 12.565679,
   "longitude": 104.990963,
   "name": "Cambodia"
 },
 {
   "country id": "KI",
   "latitude": -3.370417,
   "longitude": -168.734039,
   "name": "Kiribati"
 },
 {
   "country id": "KM",
   "latitude": -11.875001,
   "longitude": 43.872219,
   "name": "Comoros"
 },
 {
   "country id": "KN",
   "latitude": 17.357822,
   "longitude": -62.782998,
   "name": "Saint Kitts and Nevis"
 },
 {
   "country id": "KP",
   "latitude": 40.339852,
   "longitude": 127.510093,
   "name": "Korea"
 },
 {
   "country id": "KR",
   "latitude": 35.907757,
   "longitude": 127.766922,
   "name": "South Korea"
 },
 {
   "country id": "KW",
   "latitude": 29.31166,
   "longitude": 47.481766,
   "name": "Kuwait"
 },
 {
   "country id": "KY",
   "latitude": 19.513469,
   "longitude": -80.566956,
   "name": "Cayman Islands"
 },
 {
   "country id": "KZ",
   "latitude": 48.019573,
   "longitude": 66.923684,
   "name": "Kazakhstan"
 },
 {
   "country id": "LA",
   "latitude": 19.85627,
   "longitude": 102.495496,
   "name": "Laos"
 },
 {
   "country id": "LB",
   "latitude": 33.854721,
   "longitude": 35.862285,
   "name": "Lebanon"
 },
 {
   "country id": "LC",
   "latitude": 13.909444,
   "longitude": -60.978893,
   "name": "Saint Lucia"
 },
 {
   "country id": "LI",
   "latitude": 47.166,
   "longitude": 9.555373,
   "name": "Liechtenstein"
 },
 {
   "country id": "LK",
   "latitude": 7.873054,
   "longitude": 80.771797,
   "name": "Sri Lanka"
 },
 {
   "country id": "LR",
   "latitude": 6.428055,
   "longitude": -9.429499,
   "name": "Liberia"
 },
 {
   "country id": "LS",
   "latitude": -29.609988,
   "longitude": 28.233608,
   "name": "Lesotho"
 },
 {
   "country id": "LT",
   "latitude": 55.169438,
   "longitude": 23.881275,
   "name": "Lithuania"
 },
 {
   "country id": "LU",
   "latitude": 49.815273,
   "longitude": 6.129583,
   "name": "Luxembourg"
 },
 {
   "country id": "LV",
   "latitude": 56.879635,
   "longitude": 24.603189,
   "name": "Latvia"
 },
 {
   "country id": "LY",
   "latitude": 26.3351,
   "longitude": 17.228331,
   "name": "Libya"
 },
 {
   "country id": "MA",
   "latitude": 31.791702,
   "longitude": -7.09262,
   "name": "Morocco"
 },
 {
   "country id": "MC",
   "latitude": 43.750298,
   "longitude": 7.412841,
   "name": "Monaco"
 },
 {
   "country id": "MD",
   "latitude": 47.411631,
   "longitude": 28.369885,
   "name": "Moldova"
 },
 {
   "country id": "ME",
   "latitude": 42.708678,
   "longitude": 19.37439,
   "name": "Montenegro"
 },
 {
   "country id": "MG",
   "latitude": -18.766947,
   "longitude": 46.869107,
   "name": "Madagascar"
 },
 {
   "country id": "MH",
   "latitude": 7.131474,
   "longitude": 171.184478,
   "name": "Marshall Islands"
 },
 {
   "country id": "MK",
   "latitude": 41.608635,
   "longitude": 21.745275,
   "name": "Macedonia [FYROM]"
 },
 {
   "country id": "ML",
   "latitude": 17.570692,
   "longitude": -3.996166,
   "name": "Mali"
 },
 {
   "country id": "MM",
   "latitude": 21.913965,
   "longitude": 95.956223,
   "name": "Myanmar [Burma]"
 },
 {
   "country id": "MN",
   "latitude": 46.862496,
   "longitude": 103.846656,
   "name": "Mongolia"
 },
 {
   "country id": "MO",
   "latitude": 22.198745,
   "longitude": 113.543873,
   "name": "Macau"
 },
 {
   "country id": "MP",
   "latitude": 17.33083,
   "longitude": 145.38469,
   "name": "Northern Mariana Islands"
 },
 {
   "country id": "MQ",
   "latitude": 14.641528,
   "longitude": -61.024174,
   "name": "Martinique"
 },
 {
   "country id": "MR",
   "latitude": 21.00789,
   "longitude": -10.940835,
   "name": "Mauritania"
 },
 {
   "country id": "MS",
   "latitude": 16.742498,
   "longitude": -62.187366,
   "name": "Montserrat"
 },
 {
   "country id": "MT",
   "latitude": 35.937496,
   "longitude": 14.375416,
   "name": "Malta"
 },
 {
   "country id": "MU",
   "latitude": -20.348404,
   "longitude": 57.552152,
   "name": "Mauritius"
 },
 {
   "country id": "MV",
   "latitude": 3.202778,
   "longitude": 73.22068,
   "name": "Maldives"
 },
 {
   "country id": "MW",
   "latitude": -13.254308,
   "longitude": 34.301525,
   "name": "Malawi"
 },
 {
   "country id": "MX",
   "latitude": 23.634501,
   "longitude": -102.552784,
   "name": "Mexico"
 },
 {
   "country id": "MY",
   "latitude": 4.210484,
   "longitude": 101.975766,
   "name": "Malaysia"
 },
 {
   "country id": "MZ",
   "latitude": -18.665695,
   "longitude": 35.529562,
   "name": "Mozambique"
 },
 {
   "country id": "NA",
   "latitude": -22.95764,
   "longitude": 18.49041,
   "name": "Namibia"
 },
 {
   "country id": "NC",
   "latitude": -20.904305,
   "longitude": 165.618042,
   "name": "New Caledonia"
 },
 {
   "country id": "NE",
   "latitude": 17.607789,
   "longitude": 8.081666,
   "name": "Niger"
 },
 {
   "country id": "NF",
   "latitude": -29.040835,
   "longitude": 167.954712,
   "name": "Norfolk Island"
 },
 {
   "country id": "NG",
   "latitude": 9.081999,
   "longitude": 8.675277,
   "name": "Nigeria"
 },
 {
   "country id": "NI",
   "latitude": 12.865416,
   "longitude": -85.207229,
   "name": "Nicaragua"
 },
 {
   "country id": "NL",
   "latitude": 52.132633,
   "longitude": 5.291266,
   "name": "Netherlands"
 },
 {
   "country id": "NO",
   "latitude": 60.472024,
   "longitude": 8.468946,
   "name": "Norway"
 },
 {
   "country id": "NP",
   "latitude": 28.394857,
   "longitude": 84.124008,
   "name": "Nepal"
 },
 {
   "country id": "NR",
   "latitude": -0.522778,
   "longitude": 166.931503,
   "name": "Nauru"
 },
 {
   "country id": "NU",
   "latitude": -19.054445,
   "longitude": -169.867233,
   "name": "Niue"
 },
 {
   "country id": "NZ",
   "latitude": -40.900557,
   "longitude": 174.885971,
   "name": "New Zealand"
 },
 {
   "country id": "OM",
   "latitude": 21.512583,
   "longitude": 55.923255,
   "name": "Oman"
 },
 {
   "country id": "PA",
   "latitude": 8.537981,
   "longitude": -80.782127,
   "name": "Panama"
 },
 {
   "country id": "PE",
   "latitude": -9.189967,
   "longitude": -75.015152,
   "name": "Peru"
 },
 {
   "country id": "PF",
   "latitude": -17.679742,
   "longitude": -149.406843,
   "name": "French Polynesia"
 },
 {
   "country id": "PG",
   "latitude": -6.314993,
   "longitude": 143.95555,
   "name": "Papua New Guinea"
 },
 {
   "country id": "PH",
   "latitude": 12.879721,
   "longitude": 121.774017,
   "name": "Philippines"
 },
 {
   "country id": "PK",
   "latitude": 30.375321,
   "longitude": 69.345116,
   "name": "Pakistan"
 },
 {
   "country id": "PL",
   "latitude": 51.919438,
   "longitude": 19.145136,
   "name": "Poland"
 },
 {
   "country id": "PM",
   "latitude": 46.941936,
   "longitude": -56.27111,
   "name": "Saint Pierre and Miquelon"
 },
 {
   "country id": "PN",
   "latitude": -24.703615,
   "longitude": -127.439308,
   "name": "Pitcairn Islands"
 },
 {
   "country id": "PR",
   "latitude": 18.220833,
   "longitude": -66.590149,
   "name": "Puerto Rico"
 },
 {
   "country id": "PS",
   "latitude": 31.952162,
   "longitude": 35.233154,
   "name": "Palestinian Territories"
 },
 {
   "country id": "PT",
   "latitude": 39.399872,
   "longitude": -8.224454,
   "name": "Portugal"
 },
 {
   "country id": "PW",
   "latitude": 7.51498,
   "longitude": 134.58252,
   "name": "Palau"
 },
 {
   "country id": "PY",
   "latitude": -23.442503,
   "longitude": -58.443832,
   "name": "Paraguay"
 },
 {
   "country id": "QA",
   "latitude": 25.354826,
   "longitude": 51.183884,
   "name": "Qatar"
 },
 {
   "country id": "RE",
   "latitude": -21.115141,
   "longitude": 55.536384,
   "name": "Réunion"
 },
 {
   "country id": "RO",
   "latitude": 45.943161,
   "longitude": 24.96676,
   "name": "Romania"
 },
 {
   "country id": "RS",
   "latitude": 44.016521,
   "longitude": 21.005859,
   "name": "Serbia"
 },
 {
   "country id": "RU",
   "latitude": 61.52401,
   "longitude": 105.318756,
   "name": "Russia"
 },
 {
   "country id": "RW",
   "latitude": -1.940278,
   "longitude": 29.873888,
   "name": "Rwanda"
 },
 {
   "country id": "SA",
   "latitude": 23.885942,
   "longitude": 45.079162,
   "name": "Saudi Arabia"
 },
 {
   "country id": "SB",
   "latitude": -9.64571,
   "longitude": 160.156194,
   "name": "Solomon Islands"
 },
 {
   "country id": "SC",
   "latitude": -4.679574,
   "longitude": 55.491977,
   "name": "Seychelles"
 },
 {
   "country id": "SD",
   "latitude": 12.862807,
   "longitude": 30.217636,
   "name": "Sudan"
 },
 {
   "country id": "SE",
   "latitude": 60.128161,
   "longitude": 18.643501,
   "name": "Sweden"
 },
 {
   "country id": "SG",
   "latitude": 1.352083,
   "longitude": 103.819836,
   "name": "Singapore"
 },
 {
   "country id": "SH",
   "latitude": -24.143474,
   "longitude": -10.030696,
   "name": "Saint Helena"
 },
 {
   "country id": "SI",
   "latitude": 46.151241,
   "longitude": 14.995463,
   "name": "Slovenia"
 },
 {
   "country id": "SJ",
   "latitude": 77.553604,
   "longitude": 23.670272,
   "name": "Svalbard and Jan Mayen"
 },
 {
   "country id": "SK",
   "latitude": 48.669026,
   "longitude": 19.699024,
   "name": "Slovakia"
 },
 {
   "country id": "SL",
   "latitude": 8.460555,
   "longitude": -11.779889,
   "name": "Sierra Leone"
 },
 {
   "country id": "SM",
   "latitude": 43.94236,
   "longitude": 12.457777,
   "name": "San Marino"
 },
 {
   "country id": "SN",
   "latitude": 14.497401,
   "longitude": -14.452362,
   "name": "Senegal"
 },
 {
   "country id": "SO",
   "latitude": 5.152149,
   "longitude": 46.199616,
   "name": "Somalia"
 },
 {
   "country id": "SR",
   "latitude": 3.919305,
   "longitude": -56.027783,
   "name": "Suriname"
 },
 {
   "country id": "ST",
   "latitude": 0.18636,
   "longitude": 6.613081,
   "name": "São Tomé and Príncipe"
 },
 {
   "country id": "SV",
   "latitude": 13.794185,
   "longitude": -88.89653,
   "name": "El Salvador"
 },
 {
   "country id": "SY",
   "latitude": 34.802075,
   "longitude": 38.996815,
   "name": "Syria"
 },
 {
   "country id": "SZ",
   "latitude": -26.522503,
   "longitude": 31.465866,
   "name": "Swaziland"
 },
 {
   "country id": "TC",
   "latitude": 21.694025,
   "longitude": -71.797928,
   "name": "Turks and Caicos Islands"
 },
 {
   "country id": "TD",
   "latitude": 15.454166,
   "longitude": 18.732207,
   "name": "Chad"
 },
 {
   "country id": "TF",
   "latitude": -49.280366,
   "longitude": 69.348557,
   "name": "French Southern Territories"
 },
 {
   "country id": "TG",
   "latitude": 8.619543,
   "longitude": 0.824782,
   "name": "Togo"
 },
 {
   "country id": "TH",
   "latitude": 15.870032,
   "longitude": 100.992541,
   "name": "Thailand"
 },
 {
   "country id": "TJ",
   "latitude": 38.861034,
   "longitude": 71.276093,
   "name": "Tajikistan"
 },
 {
   "country id": "TK",
   "latitude": -8.967363,
   "longitude": -171.855881,
   "name": "Tokelau"
 },
 {
   "country id": "TL",
   "latitude": -8.874217,
   "longitude": 125.727539,
   "name": "Timor-Leste"
 },
 {
   "country id": "TM",
   "latitude": 38.969719,
   "longitude": 59.556278,
   "name": "Turkmenistan"
 },
 {
   "country id": "TN",
   "latitude": 33.886917,
   "longitude": 9.537499,
   "name": "Tunisia"
 },
 {
   "country id": "TO",
   "latitude": -21.178986,
   "longitude": -175.198242,
   "name": "Tonga"
 },
 {
   "country id": "TR",
   "latitude": 38.963745,
   "longitude": 35.243322,
   "name": "Turkey"
 },
 {
   "country id": "TT",
   "latitude": 10.691803,
   "longitude": -61.222503,
   "name": "Trinidad and Tobago"
 },
 {
   "country id": "TV",
   "latitude": -7.109535,
   "longitude": 177.64933,
   "name": "Tuvalu"
 },
 {
   "country id": "TW",
   "latitude": 23.69781,
   "longitude": 120.960515,
   "name": "Taiwan"
 },
 {
   "country id": "TZ",
   "latitude": -6.369028,
   "longitude": 34.888822,
   "name": "Tanzania"
 },
 {
   "country id": "UA",
   "latitude": 48.379433,
   "longitude": 31.16558,
   "name": "Ukraine"
 },
 {
   "country id": "UG",
   "latitude": 1.373333,
   "longitude": 32.290275,
   "name": "Uganda"
 },
 {
   "country id": "UM",
   "latitude": null,
   "longitude": null,
   "name": "U.S. Minor Outlying Islands"
 },
 {
   "country id": "US",
   "latitude": 37.09024,
   "longitude": -95.712891,
   "name": "United States"
 },
 {
   "country id": "UY",
   "latitude": -32.522779,
   "longitude": -55.765835,
   "name": "Uruguay"
 },
 {
   "country id": "UZ",
   "latitude": 41.377491,
   "longitude": 64.585262,
   "name": "Uzbekistan"
 },
 {
   "country id": "VA",
   "latitude": 41.902916,
   "longitude": 12.453389,
   "name": "Vatican City"
 },
 {
   "country id": "VC",
   "latitude": 12.984305,
   "longitude": -61.287228,
   "name": "Saint Vincent and the Grenadines"
 },
 {
   "country id": "VE",
   "latitude": 6.42375,
   "longitude": -66.58973,
   "name": "Venezuela"
 },
 {
   "country id": "VG",
   "latitude": 18.420695,
   "longitude": -64.639968,
   "name": "British Virgin Islands"
 },
 {
   "country id": "VI",
   "latitude": 18.335765,
   "longitude": -64.896335,
   "name": "U.S. Virgin Islands"
 },
 {
   "country id": "VN",
   "latitude": 14.058324,
   "longitude": 108.277199,
   "name": "Vietnam"
 },
 {
   "country id": "VU",
   "latitude": -15.376706,
   "longitude": 166.959158,
   "name": "Vanuatu"
 },
 {
   "country id": "WF",
   "latitude": -13.768752,
   "longitude": -177.156097,
   "name": "Wallis and Futuna"
 },
 {
   "country id": "WS",
   "latitude": -13.759029,
   "longitude": -172.104629,
   "name": "Samoa"
 },
 {
   "country id": "XK",
   "latitude": 42.602636,
   "longitude": 20.902977,
   "name": "Kosovo"
 },
 {
   "country id": "YE",
   "latitude": 15.552727,
   "longitude": 48.516388,
   "name": "Yemen"
 },
 {
   "country id": "YT",
   "latitude": -12.8275,
   "longitude": 45.166244,
   "name": "Mayotte"
 },
 {
   "country id": "ZA",
   "latitude": -30.559482,
   "longitude": 22.937506,
   "name": "South Africa"
 },
 {
   "country id": "ZM",
   "latitude": -13.133897,
   "longitude": 27.849332,
   "name": "Zambia"
 },
 {
   "country id": "ZW",
   "latitude": -19.015438,
   "longitude": 29.154857,
   "name": "Zimbabwe"
 }
];
var parser = csv.parse({delimiter: ','}, function(err, data){

  var world_o={}, items=[];
  for(var i=0;i<world.length;i++){
    world_o[world[i].name.toLowerCase()] = world[i];
  }

  //console.log(yrs);
  var region;
  for(var i=1;i<data.length;i++){
    var ct=1;
    var country = data[i][0].replace(/([.]|[0-9])/g,"").trim().toLowerCase();
    
    if(country.indexOf("region")>-1){
      if(country.indexOf("russia")>-1){
          for(var z=1;z<data[i].length;z++){
             var val = data[i][z] == "-" ? 0 : parseInt(data[i][z].replace(/[,]/g,""));
             var yr = data[0][z].split("to");
             yr = parseInt(yr[1])+1;
             var ob = {
               "country" : "russia",
               "region" : "russia",
               "latitude" : world_o["russia"]["latitude"],
               "longitude" : world_o["russia"]["longitude"],
               "value" : val,
               "yr" : yr
            };
            items.push(ob);
         }
      }else{
         region = country.split("(")[0].toLowerCase();
      }
      continue;
    }
    if(world_o[country] || country.toLowerCase().indexOf(region)>-1){
      // console.log(country);
       for(var z=1;z<data[i].length;z++){
         var val = data[i][z] == "-" ? 0 : parseInt(data[i][z].replace(/[,]/g,""));
         var yr = data[0][z].split("to");
         yr = parseInt(yr[1])+1;
         var ob = {
            "country" : country,
            "region" : region,
            "latitude" : country.toLowerCase().indexOf(region)>-1 ? 0 : world_o[country]["latitude"],
            "longitude" : country.toLowerCase().indexOf(region)>-1 ? 0 : world_o[country]["longitude"],
            "value" : val,
            "yr" : yr
         };
         items.push(ob);
       }
    }
  }
  // console.log("posting - " + items.length);
  elPost(items);
});


fs.createReadStream('immigration.csv').pipe(parser);
