var cedula = "";

window.onload = function()
{
	var cedula = getParameterByName('cedula');
	
	$("#btnBuscar").click(buscar);
	$("#btnReservar").click(reservar);
	$("#btnMenu").click(volver);
}

function volver()
{
	self.location = "menu.html";
}

function buscar() 
{ 
	$("#divInfo").addClass("nb-hidden");
	$("#divWarning").addClass("nb-hidden");
	$("#divBtnReservar").addClass("nb-hidden");

	var placa = $("#placa").val(); 
	var tipo = $("#tipo").val(); 
	var marca = $("#marca").val(); 
	var color = $("#color").val(); 
	var km = $("#km").val(); 
	var modelo = $("#modelo").val();
	var precio = $("#precio").val();  
  
	
	$.ajax({ 
		async:true, 
		type: "POST", 
		dataType: "html", contentType: "application/x-www-form-urlencoded", 
		url:"https://proyecto-vehiculos.000webhostapp.com/ProyectoFinal/reservar.php", 
		data:"accion=Consultar&placa="+placa+"&tipo="+tipo+"&marca="+marca+"&color="+color+"&km="+km+"&modelo="+modelo+"&precio="+precio, beforeSend:inicioEnvio, success:llegadaDatos, 
		timeout:4000, 
		error:problemas }); 
	return false; 
} 

function reservar(placa)
{
	$.ajax({ 
		async:true, 
		type: "POST", 
		dataType: "html", contentType: "application/x-www-form-urlencoded", 
		url:"https://proyecto-vehiculos.000webhostapp.com/ProyectoFinal/reservar.php", 
		data:"accion=Reservar&cedula="+cedula+"&placa="+placa, beforeSend:inicioEnvio, success:llegadaDatosReserva, 
		timeout:4000, 
		error:problemas }); 
}

function inicioEnvio(datos)
{
	$("#divLoader").removeClass("nb-hidden");
}

function llegadaDatos(datos)
{
	$("#divLoader").addClass("nb-hidden");
	$("#divWarning").addClass("nb-hidden");
	$("#divResult").html(datos);
}

function llegadaDatosReserva(datos)
{
	alert(datos);
	$("#divResult").html("");
	buscar();
}

function problemas()
{
	$("#divLoader").addClass("nb-hidden");
	$("#divBtnReservar").addClass("nb-hidden");
	$("#divWarning").removeClass("nb-hidden");
	$("#divSucces").text('Ocurrio un error.');
}

function getParameterByName(name, url) 
{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
