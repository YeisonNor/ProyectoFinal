var cedula = "";

window.onload = function()
{
	cedula = getParameterByName('cedula');
	$("#btnModificar").click(modificar);
	$("#btnMenu").click(volver);
	$("#btnBuscar").click(buscar);
}

function volver()
{
	self.location = "menu.html?cedula=" + cedula;
}

function buscar()
{
	$("#divSucces").addClass("nb-hidden");
	$("#divWarning").addClass("nb-hidden");
	$("#formRegistrar").addClass("nb-hidden");
	var placa = $("#placaBuscar").val(); 
	if(placa === '')
	{
		$("#divWarning").removeClass("nb-hidden");
		$("#divWarning").text("Debe indicar la placa!");
	}
	else
	{
		$.ajax({ 
			async:true, 
			type: "POST", 
			dataType: "html", contentType: "application/x-www-form-urlencoded", 
			url:"https://proyecto-vehiculos.000webhostapp.com/ProyectoFinal/modificarVehiculo.php", 
			data:"tipo=Consultar&placa="+placa, beforeSend:inicioEnvio, success:llegadaDatosVehiculo, 
			timeout:4000, 
			error:problemas }); 
	}
}

function modificar() 
{ 
	$("#divInfo").addClass("nb-hidden");
	$("#divSucces").addClass("nb-hidden");
	$("#divWarning").addClass("nb-hidden");

	var id = $("#id").val(); 
	var placa = $("#placa").val(); 
	var tipo = $("#tipo").val(); 
	var marca = $("#marca").val(); 
	var color = $("#color").val(); 
	var km = $("#km").val(); 
	var modelo = $("#modelo").val();
	var precio = $("#precio").val();  
  
	if(placa === '')
	{
		$("#divInfo").removeClass("nb-hidden");
		$("#txtInfo").text("Debe indicar la placa!");
	}
	else if(tipo === '')
	{
		$("#divInfo").removeClass("nb-hidden");
		$("#txtInfo").text("Debe indicar el tipo!");
	}
	else if(marca === '')
	{
		$("#divInfo").removeClass("nb-hidden");
		$("#txtInfo").text("Debe indicar la marca!");
	}
	else if(color === '')
	{
		$("#divInfo").removeClass("nb-hidden");
		$("#txtInfo").text("Debe indicar el color!");
	}
	else if(km === '')
	{
		$("#divInfo").removeClass("nb-hidden");
		$("#txtInfo").text("Debe indicar el kilometraje!");
	}
	else if(modelo === '')
	{
		$("#divInfo").removeClass("nb-hidden");
		$("#txtInfo").text("Debe indicar el modelo!");
	}
	else if(precio === '')
	{
		$("#divInfo").removeClass("nb-hidden");
		$("#txtInfo").text("Debe indicar el precio!");
	}
	else
	{
		$.ajax({ 
			async:true, 
			type: "POST", 
			dataType: "html", contentType: "application/x-www-form-urlencoded", 
			url:"https://proyecto-vehiculos.000webhostapp.com/ProyectoFinal/modificarVehiculo.php", 
			data:"tipo=Modificar&id="+id+"&placa="+placa+"&tipo="+tipo+"&marca="+marca+"&color="+color+"&km="+km+"&modelo="+modelo+"&precio="+precio, beforeSend:inicioEnvio, success:llegadaDatos, 
			timeout:4000, 
			error:problemas }); 
	}
	return false; 
} 

function llegadaDatosVehiculo(datos)
{
	
	$("#divLoader").addClass("nb-hidden");
	
	if(datos === "Datos No Validos")
	{
		$("#divSucces").addClass("nb-hidden");
		$("#divWarning").removeClass("nb-hidden");
		$("#divWarning").text(datos);
	}
	else
	{

		$("#formRegistrar").removeClass("nb-hidden");
		
		var datosVehiculo = datos.split('¬');
		
		var id = datosVehiculo[0];
		var placa = datosVehiculo[1];
		var tipo = datosVehiculo[2];
		var marca = datosVehiculo[3];
		var color = datosVehiculo[4];
		var km = datosVehiculo[5];
		var modelo = datosVehiculo[6];
		var precio = datosVehiculo[7];
		
		$("#id").val(id);
		$("#placa").val(placa);
		$("#tipo").val(tipo);
		$("#marca").val(marca);
		$("#color").val(color);
		$("#km").val(km);
		$("#modelo").val(modelo);
		$("#precio").val(precio);
	}
}

function inicioEnvio(datos)
{
	$("#divLoader").removeClass("nb-hidden");
}

function llegadaDatos(datos)
{
	$("#divLoader").addClass("nb-hidden");
	$("#divWarning").addClass("nb-hidden");
	$("#divSucces").removeClass("nb-hidden");
	$("#divSucces").text(datos);
}

function problemas()
{
	$("#divLoader").addClass("nb-hidden");
	$("#divSucces").addClass("nb-hidden");
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
