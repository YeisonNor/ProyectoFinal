<?php

    header("Access-Control-Allow-Origin: *");	
    include("conexion.php");
    
	
	$placa = $_POST["placa"];
	$tipo = $_POST["tipo"];
	$marca = $_POST["marca"];
	$color = $_POST["color"];
	$km = $_POST["km"];
	$modelo = $_POST["modelo"];
	$precio = $_POST["precio"]; 
	
	$sql = "INSERT INTO vehiculo(placa, tipo, marca, color, km, modelo, precio) VALUES ('" . $placa . "','" . $tipo . "','" . $marca . "','" . $color . "','" . $km . "','" . $modelo . "','" . $precio . "')";

	$query = mysqli_query($conexion, $sql);
	
	if($query)
	{
		echo "Vehiculo registrado con exito!";
	}
	else
	{
		echo "Error al registrar el vehiculo.";
	}
	
	mysqli_close($conexion);
?>