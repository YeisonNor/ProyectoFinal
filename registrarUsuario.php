<?php

    header("Access-Control-Allow-Origin: *");	
    include("conexion.php");
    
	
	$cedula = $_POST["cedula"];
	$nombre = $_POST["nombre"];
	$apellido = $_POST["apellido"];
	$celular = $_POST["celular"];
	$usuario = $_POST["usuario"];
	$password = $_POST["password"];
	
	$sql = "INSERT INTO usuario(cedula, nombre, apellido, celular, usuario, clave, tipo) VALUES ('" . $cedula . "','" . $nombre . "','" . $apellido . "','" . $celular . "','" . $usuario . "','" . $password . "','Cliente')";

	$query = mysqli_query($conexion, $sql);
	
	if($query)
	{
		echo "Usuario registrado con exito!";
	}
	else
	{
		echo "Error al registrar el usuario.";
	}
	
	mysqli_close($conexion);
?>