//Variaveis globais
let countries; //contera "fetched" data
const countriesList = document.getElementById("countries");


/*fetch("https://restcountries.eu/rest/v2/all")
.then(function(res){
	//console.log(res.json()); //porque recebo ficheiro json, quendo e imagem e res.blob() 
	return res.json();
})
.then(function(data){
	//console.log(data);
	initialize(data);
}).catch(function(err){
	alert("Error: ",err);
});*/

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
	//for(let i=0; i<countries.length; i++) {
   // options += `<option value="${countries[i].alpha3Code}">${countries[i].name}</option>`;
    //options += `<option value="${countries[i].alpha3Code}">${countries[i].name} (+${countries[i].callingCodes[0]})</option>`;
   //}
   countries.forEach( country => options += `<option value="${country.alpha3Code}">${country.name}</option>`);//pegar informacao dos paises usando alpha3code como indice
   countriesList.innerHTML = options;
   countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);//vizualizar pais aleatorio a cada refresh
	//document.querySelector("#countries").innerHTML = options;
	//document.getElementById("countries").innerHTML = options;
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
	//document.getElementById("currencies").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(', ');
	document.querySelector('#flag-container img').src = countryData.flag;
	document.querySelector('#flag-container img').alt = `Flag of ${countryData.name}`;

}
/*
//console.log("Capital of "+countries[0].name +" is "+countries[0].capital);
setTimeout(()=> {
	console.log(countries);
}, 200);
*/