var list = [];
var btnUpdate = $(".update");
var btnCreate = $(".create");
function mountList() {
	if(null != localStorage.getItem("lista")) {
		list = JSON.parse(localStorage.getItem("lista"));
	}
	let html = '<div class="collection">';
	for(var index in list) {
		html += `<a href="#" onclick="event.preventDefault();edit(`+index+`)" class="collection-item">` + list[index].name + `<span class="badge badge-primary badge-pill">`+ list[index].qtd +`</span></li>`;
	}
	html += '</div>';
	$("#lista").html(html);
}

function add() {
	var nomeItem = $("#item").val();
	if(validate(nomeItem)) {
		var qtdItem = $("#qtd").val();
		if(qtdItem < 1) {
			qtdItem = 1;
		}
		var item = { name: nomeItem, qtd: qtdItem };
		list.unshift(item);
		$("#item").val(null);
		$("#qtd").val(null);
		//$("#item").focus();
		localStorage.setItem("lista", JSON.stringify(list));
		mountList();
	}
}

function edit(index) {
	btnCreate.css('display', 'none');
	btnUpdate.css('display', 'block');
	$(".label").addClass('active');
	$("#index").val(index);
	$("#item").val(list[index].name);
	$("#qtd").val(list[index].qtd);
}

function update() {
	var nomeItem = $("#item").val();
	if(validate(nomeItem)) {
		var qtdItem = $("#qtd").val();
		var indexItem = $("#index").val();
		if(qtdItem < 1) {
			qtdItem = 1;
		}
		var item = { name: nomeItem, qtd: qtdItem };
		list[indexItem] = item;
		clearForm();
		changeButtons()
		localStorage.setItem("lista", JSON.stringify(list));
		mountList();
	}
}

function changeButtons() {
	btnCreate.css('display', 'block');
	btnUpdate.css('display', 'none');
	$(".label").removeClass('active');
}

function cancel() {
	changeButtons();
	clearForm();
}

function del() {
	if(confirm('Deseja excluir este produto da lista?')) {
		if($("#index").val() == 0) {
			list.shift();
		} else if($("#index").val() == list.length - 1){
			list.pop();
		} else {
			let firstPart = list.slice(0, $("#index").val());
			let lastPart = list.slice(parseInt($("#index").val()) + 1, list.length);
			list = firstPart.concat(lastPart);
		}
		localStorage.setItem("lista", JSON.stringify(list));
		clearForm();
		changeButtons()
		mountList();
	}
}

function clearForm() {
	$("#item").val(null);
	$("#qtd").val(null);
	$("#index").val(null);
	//$("#item").focus();
}

function cleanList() {
	if(confirm('Deseja limpar a lista?')) {
		list = [];
		localStorage.setItem("lista", JSON.stringify(list));
		clearForm();
		btnCreate.css('display', 'block');
		btnUpdate.css('display', 'none');
		mountList();
	}
}

function validate(data) {
	if(data.length < 1) {
		alert('O nome do produto precisa ser preenchido!');
		return false;
	}
	return true;
}

mountList();

//PWA
if ('serviceWorker' in navigator) {
	navigator.serviceWorker
	.register('./service-worker.js')
	.then(function(reg) {
		console.log('Service worker Registered');
	})
	.catch(function (err) {
		console.log('erro', err);
	});
}
