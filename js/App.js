let cities = {
  ros: "Rosario",
  caba: "Buenos Aires",
  cor: "Córdoba",
  else: "Otra",
};

let city = document.getElementById("select"); // Ciudad elegida

let showCity = document.getElementById("result"); // Ciudad
let showTemp = document.getElementById("temp"); // Temperatura
let showHumidity = document.getElementById("humidity"); // Humedad
let showWind = document.getElementById("wind"); // Viento
let showPressure = document.getElementById("pressure"); // Presion
let showDesciption = document.getElementById("description"); // Descripcion

let button = document.getElementById("newCity");
let addNew = document.getElementById("addNew"); // ← ← ← Valor nueva ciudad ← ← ←
let info = document.getElementById("leyend");
let form = document.getElementById("details");

form.style.display = "none";

// - - - MOSTRAR RESULTADOS - - - )
const showResult = async () => {
  if (validate2()) {
    info.style.display = "none"; // hide message
    let ciudad = cities[city.value];
    console.log(ciudad); //  CONSOLE.LOG() BORRAR - - - )
    // - - - API - - - Datos ciudad seleccionada.  ↓
    const key = "7badf1eb58821eac6385154e0d479f41";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&units=metric&appid=${key}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data); // - - - Objeto de la ciudad.
      form.style.display = "block"; // Form
      showCity.textContent = data.name.toUpperCase();
      let temp = Math.floor(data.main.temp);
      showTemp.textContent = `${temp} ºC`;
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
  addNew.length > 0 ? (bool = true) : (bool = false);
  return bool;
};

// - - - AÑADIR NUEVA CIUDAD - - - )
function addCity() {
  if (validate()) {
    city.options.add(new Option(addNew.value));
    alert(`Se añadió ${addNew.value} a la lista de ciudades.`);
    localStorage.setItem("name", addNew.value);
    let addedCity = localStorage.getItem("name"); // ciudad capturada
    cities = { ...cities, [addedCity]: addedCity }; // añadir nueva ciudad
    button.style.display = "none";
    city.value = 0;
    addNew.innerHTML = ""; // limpieza del label * NO FUNCIONA *
    console.log(Object.values(cities)); //  CONSOLE.LOG() BORRAR -------------------------------------)
  } else {
    alert(`${addNew.value} ya fue añadida a la lista de ciudades.`);
  }
}

// - - - DESPLEGAR MENU PARA AÑADIR CIUDAD - - )
function showNewCity() {
  if (cities[city.value] == cities.else) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}
