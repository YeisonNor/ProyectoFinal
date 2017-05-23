window.onload = function()
{
	$("#btnLogin").click(loguear);
}

function loguear() 
{ 
	$("#divInfo").addClass("nb-hidden");
	$("#divSucces").addClass("nb-hidden");
	$("#divWarning").addClass("nb-hidden");
	var usuario = $("#usuario").val(); 
	var password = $("#password").val(); 
  
	  if(usuario === '')
	  {
		$("#divInfo").removeClass("nb-hidden");
		$("#txtInfo").text("Debe indicar el usuario!");
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
			  url:"https://proyecto-vehiculos.000webhostapp.com/ProyectoFinal/login.php", 
			  data:"&tipo=Login&usuario="+usuario+"&password="+password, beforeSend:inicioEnvio, success:llegadaDatos, 
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
	if(datos === "Datos No Validos")
	{
		$("#divSucces").addClass("nb-hidden");
		$("#divWarning").removeClass("nb-hidden");
		$("#divWarning").text(datos);
	}
	else
	{
		self.location = "menu.html?cedula=" + datos;
	}
}

function problemas()
{
	$("#divLoader").addClass("nb-hidden");
	$("#divSucces").addClass("nb-hidden");
	$("#divWarning").removeClass("nb-hidden");
	$("#divSucces").text('Ocurrio un error.');
}
