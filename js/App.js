let cities = {
  ros: "Rosario",
  caba: "Buenos Aires",
  cor: "Córdoba",
  else: "Otra",
};

let city = document.getElementById("select"); // Ciudad elegida

let showCity = document.getElementById("result"); // Ciudad
let showTemp = document.getElementById("temp"); // Temperatura
let minMax = document.getElementById("MinMax"); // Temperatura
let showHumidity = document.getElementById("humidity"); // Humedad
let showWind = document.getElementById("wind"); // Viento
let showPressure = document.getElementById("pressure"); // Presion
let showDesciption = document.getElementById("description"); // Descripcion

let button = document.getElementById("newCity");
let addNew = document.getElementById("addNew"); // ← ← ← Valor nueva ciudad ← ← ←
let info = document.getElementById("leyend");
let form = document.getElementById("details");
let searchButton = document.getElementById("search");

form.style.display = "none";

// - - - MOSTRAR RESULTADOS - - - )
const showResult = async () => {
  if (validate2()) {
    info.style.display = "none"; // hide message
    let ciudad = cities[city.value];
    console.log(ciudad); //  CONSOLE.LOG() BORRAR - - - )
    // - - - API - - - Datos ciudad seleccionada.  ↓
    const key = "7badf1eb58821eac6385154e0d479f41";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&units=metric&appid=${key}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data); // - - - Objeto de la ciudad.
      form.style.display = "block"; // Form
      let name = data.name.toUpperCase();
      let country = data.sys.country.toUpperCase();
      showCity.textContent = `${name}, ${country}`;
      let temp = Math.floor(data.main.temp);
      showTemp.textContent = `${temp} ºC`;
      let min = data.main.temp_min;
      let max = data.main.temp_max;
      minMax.innerHTML = `Min: ${Math.round(min, 0)}ºC - Max: ${Math.round(
        max,
        0
      )}ºC`;
      let humidity = data.main.humidity;
      showHumidity.textContent = `Humedad: ${humidity} %`;
      let wind = Math.floor(data.wind.speed * 3.7);
      showWind.textContent = `Viento: ${wind} km/h`;
      let pressure = data.main.pressure;
      showPressure.textContent = `Presión: ${pressure} hPa`;
      let description = data.weather[0].description;
      showDesciption.textContent = description.toUpperCase();
    } catch (error) {
      console.log(error);
      info.innerHTML = "La ciudad seleccionada no existe."; // message
      info.style.display = "block"; // show message
      form.style.display = "none";
    }
  }
};

// - - - VALIDACION CIUDAD REPETIDA - - - )
const validate = () => {
  let arrayCities = Object.values(cities);
  let bool = true;
  const valor = addNew.value;
  for (let i = 0; i < arrayCities.length; i++) {
    if (
      arrayCities[i].toString().toUpperCase() === valor.toString().toUpperCase()
    ) {
      bool = false;
    } else {
      continue;
    }
  }
  return bool;
};

// - - - VALIDACION CIUDAD ELEGIDA - - - )
const validate2 = () => {
  let bool = true;
  city.value == 0 || city.value == "else" ? (bool = false) : (bool = true);
  info.innerHTML = "Debe seleccionar una ciudad."; // message
  info.style.display = "block"; // show message
  form.style.display = "none";
  return bool;
};

// - - - VALIDACION CIUDAD NO VACIA - - - )
const validate3 = () => {
  let bool = true;
  addNew.value.length > 0 ? (bool = true) : (bool = false);
  return bool;
};

// localStorage //

// - - - AÑADIR NUEVA CIUDAD - - - )
function addCity() {
  if (validate3()) {
    if (validate()) {
      searchButton.style.display = "block"; /////////////////////////////////////////////////
      city.options.add(new Option(addNew.value));
      form.style.display = "none";
      info.style.display = "block";
      info.innerHTML = `Se añadió ${addNew.value} a la lista de ciudades.`;

      localStorage.setItem("name", JSON.stringify(addNew.value));
      let addedCity = JSON.parse(localStorage.getItem("name")); // ciudad capturada

      console.log(addedCity);
      cities = { ...cities, [addedCity]: addedCity }; // añadir nueva ciudad
      button.style.display = "none";
      city.value = 0;
      console.log(Object.values(cities)); //  CONSOLE.LOG() ARRAY VALORES DE CIUDADES
    } else {
      info.style.display = "block";
      info.innerHTML = `${addNew.value} ya fue añadida a la lista de ciudades.`;
      searchButton.style.display = "block";
      city.value = 0;
      button.style.display = "none";
    }
  } else {
    info.style.display = "block";
    info.innerHTML = `Debe completar el nombre de la ciudad.`;
  }
}

// - - - DESPLEGAR MENU PARA AÑADIR CIUDAD - - )
function showNewCity() {
  if (cities[city.value] == cities.else) {
    button.style.display = "block";
    form.style.display = "none";
    addNew.value = ""; // limpieza del label
    searchButton.style.display = "none"; /////////////////////////////////////////////////
  } else {
    button.style.display = "none";
  }
}
