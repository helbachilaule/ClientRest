//Variaveis globais
let countries; //contera "fetched" data
const countriesList = document.getElementById("countries");

//Event Listener
countriesList.addEventListener("change", function(event){
	displayCountryInfo(event.target.value);
});

//Pegar os dados da json
fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error: ",err));


function initialize(countriesData){
	countries = countriesData;
	let options ="";
   countries.forEach( country => options += `<option value="${country.alpha3Code}">${country.name}</option>`);//pegar informacao dos paises usando alpha3code como indice
   countriesList.innerHTML = options;
   countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);//vizualizar pais aleatorio a cada refresh
	displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}
//permitir a vizualizacao da informacao dos paises
function displayCountryInfo(countryByAlpha3Code){
	const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
	//console.log(countryData);
	document.getElementById("capital").innerHTML = countryData.capital;
	document.getElementById("population").innerHTML = countryData.population.toLocaleString('en-US');
	document.getElementById("region").innerHTML = countryData.region;
	document.getElementById("dialing-code").innerHTML = `+${countryData.callingCodes[0]}`;
	document.getElementById("subregion").innerHTML = countryData.subregion;
	document.getElementById("timezones").innerHTML = countryData.timezones;
	document.getElementById("area").innerHTML = countryData.area
	document.getElementById("nativeName").innerHTML = countryData.nativeName;
	document.querySelector('#flag-container img').src = countryData.flag;
	document.querySelector('#flag-container img').alt = `Flag of ${countryData.name}`;

}
