const objectToCsv = function(data){

const csvRows = [];

//Pegar cabecalho
const headers = Object.keys(data[0]);
csvRows.push(headers.join(','));

//loop over the rows
for (const row of data){
	const values = headers.map(header => {
		const escaped = (''+row[header]).replace(/"/g, '\\"');
		return `"${escaped}"`;
	});
	csvRows.push(values.join(','));
	//console.log(values);
}
return csvRows.join('\n');
//console.log(csvRows);
};


//permite fazer o download do arquivo csv
const download = function(data){
	const blob =  new Blob([data], { type: 'text/csv' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.setAttribute('hidden', '');
	a.setAttribute('href', url);
	a.setAttribute('download', 'download.csv');
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);


};


//pegar os elementos e colocar nos headers correspondentes
const getReport = async function(){
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
	
	const csvData = objectToCsv(data);
	download(csvData);
	//console.log(csvData);
};

(function(){
	const button = document.getElementById('botaoCSV');
	button.addEventListener('click', getReport);
})();
	
