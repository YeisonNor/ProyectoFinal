window.onload = function()
{
	var cedula = getParameterByName('cedula');
	var tipo = getParameterByName('tipo');
	cargarRerservas(cedula, tipo);
}

function cargarRerservas(cedula, tipo)
{
	$.ajax({ 
	  async:true, 
	  type: "POST", 
	  dataType: "html", contentType: "application/x-www-form-urlencoded", 
	  url:"https://proyecto-vehiculos.000webhostapp.com/ProyectoFinal/consultarReservas.php", 
	  data:"tipo="+tipo+"&cedula="+cedula, beforeSend:inicioEnvio, success:llegadaDatos, 
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
	$("#divResult").html(datos);
}

function problemas()
{
	$("#divLoader").addClass("nb-hidden");
	$("#divWarning").text('Problemas en el servidor.');
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