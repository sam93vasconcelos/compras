//Format number for money
function toMoney(value, currency = null) {
	value = value.replace(',','.');
	value = parseFloat(value).toFixed(2);
	value = value.toString();
	var numLen = value.slice(0, -3).length;
	if(numLen > 3) {
		var antesPonto = value.slice(0, -6);
		var depoisPonto = value.slice(-6);
		depoisPonto = depoisPonto.slice(0, -3);
		var decimal = value.slice(-2);
		var novoNum = antesPonto + '.' + depoisPonto + ',' + decimal;
	}
	if(!parseFloat(value)){
		return 'Error: string can not be converted to number';
	}
	switch(currency){
		case 'dolar':
			return '$ ' + novoNum;
			break;
		case 'euro':
			return novoNum + ' \u20AC';
			break;
		default:
			return 'R$ ' + novoNum;
	}
}