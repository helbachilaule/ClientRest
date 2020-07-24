const objectToXls = function(data){

const xlsRows = [];

//Pegar cabecalho
const headers = Object.keys(data[0]);
xlsRows.push(headers.join(','));

//loop over the rows
for (const row of data){
	const values = headers.map(header => {
		const escaped = (''+row[header]).replace(/"/g, '\\"');
		return `"${escaped}"`;
	});
	xlsRows.push(values.join(','));
	//console.log(values);
}
return xlsRows.join('\n');
//console.log(csvRows);
};


//permite fazer o download do arquivo csv
const download2 = function(data){
	const blob =  new Blob([data], { type: 'text/xls' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.setAttribute('hidden', '');
	a.setAttribute('href', url);
	a.setAttribute('download', 'RestCountries.xls');
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);


};

//pegar os elementos e colocar nos headers correspondentes
const Report = async function(){
const jsonUrl = "https://restcountries.eu/rest/v2/all";
	const res = await fetch(jsonUrl);
	const json = await res.json();
	const data = json.map(row => ({
		country: row.name,
		capital: row.capital,
		region: row.region,
		subregion: row.subregion,
		population: row.population,
		area: row.area,
		nativeName: row.nativeName,
		timezone: row.timezones

	}));
	
	const xlsData = objectToXls(data);
	download2(xlsData)
	//console.log(xlsData);
};

(function(){
	const button2 = document.getElementById('botaoXLS');
	button2.addEventListener('click', Report);
})();



	
