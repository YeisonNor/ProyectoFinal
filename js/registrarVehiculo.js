window.onload = function()
{
	$("#btnRegistrar").click(registrar);
	$("#btnMenu").click(volver);
}

function volver()
{
	self.location = "menu.html";
}

function registrar() 
{ 
	$("#divInfo").addClass("nb-hidden");
	$("#divSucces").addClass("nb-hidden");
	$("#divWarning").addClass("nb-hidden");

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
			url:"https://proyecto-vehiculos.000webhostapp.com/ProyectoFinal/registrarVehiculo.php", 
			data:"placa="+placa+"&tipo="+tipo+"&marca="+marca+"&color="+color+"&km="+km+"&modelo="+modelo+"&precio="+precio, beforeSend:inicioEnvio, success:llegadaDatos, 
			timeout:4000, 
			error:problemas }); 
	}
	return false; 
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
	$("#formRegistrar").closest('form').find("input[type=text], input[type=number], input[type=password], textarea").val("");
}

function problemas()
{
	$("#divLoader").addClass("nb-hidden");
	$("#divSucces").addClass("nb-hidden");
	$("#divWarning").removeClass("nb-hidden");
	$("#divSucces").text('Ocurrio un error.');
}
