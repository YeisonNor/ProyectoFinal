window.onload = function()
{
	$("#btnRegistrar").click(registrar);
	$("#btnVolver").click(volver);
}

function volver()
{
	self.location = "index.html";
}

function registrar() 
{ 
	$("#divInfo").addClass("nb-hidden");
	$("#divSucces").addClass("nb-hidden");
	$("#divWarning").addClass("nb-hidden");

	var cedula = $("#cedula").val(); 
	var nombre = $("#nombre").val(); 
	var apellido = $("#apellido").val(); 
	var celular = $("#celular").val(); 
	var usuario = $("#usuario").val(); 
	var password = $("#password").val(); 
  
	if(cedula === '')
	{
		$("#divInfo").removeClass("nb-hidden");
		$("#txtInfo").text("Debe indicar la cedula!");
	}
	else if(nombre === '')
	{
		$("#divInfo").removeClass("nb-hidden");
		$("#txtInfo").text("Debe indicar el nombre!");
	}
	else if(apellido === '')
	{
		$("#divInfo").removeClass("nb-hidden");
		$("#txtInfo").text("Debe indicar el apellido!");
	}
	else if(usuario === '')
	{
		$("#divInfo").removeClass("nb-hidden");
		$("#txtInfo").text("Debe indicar el nombre de usuario!");
	}
	else if(password === '')
	{
		$("#divInfo").removeClass("nb-hidden");
		$("#txtInfo").text("Debe indicar la contraseña!");
	}
	else
	{
		$.ajax({ 
			async:true, 
			type: "POST", 
			dataType: "html", contentType: "application/x-www-form-urlencoded", 
			url:"https://proyecto-vehiculos.000webhostapp.com/ProyectoFinal/registrarUsuario.php", 
			data:"cedula="+cedula+"&nombre="+nombre+"&apellido="+apellido+"&celular="+celular+"&usuario="+usuario+"&password="+password, beforeSend:inicioEnvio, success:llegadaDatos, 
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
