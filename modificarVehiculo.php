<?php

	header("Access-Control-Allow-Origin: *");
	include("conexion.php");
	
	$tipo = $_POST["tipo"];
	
	if($tipo == 'Consultar')
	{
		$placa = $_POST["placa"];
		
		$sql = "SELECT * FROM vehiculo WHERE placa = '" . $placa . "'";
		
		$query = mysqli_query($conexion, $sql);
		
		$cantidadRegistros = mysqli_num_rows($query);
		
		if($cantidadRegistros > 0)
		{
			$datosVehiculo = "";
			while($row = mysqli_fetch_array($query))
			{
				$datosVehiculo = $row["id"] . "¬" . $row["placa"] . "¬" . $row["tipo"] . "¬" . $row["marca"] . "¬" .  $row["color"] . "¬" . $row["km"] . "¬" . $row["modelo"] . "¬" . $row["precio"];
			}		
			echo $datosVehiculo;
		}
		else
		{
			echo "Datos No Validos";
		}

		mysqli_close($conexion);
	}
	else
	{
		$id = $_POST["id"];
		$placa = $_POST["placa"];
		$tipo = $_POST["tipo"];
		$marca = $_POST["marca"];
		$color = $_POST["color"];
		$km = $_POST["km"];
		$modelo = $_POST["modelo"];
		$precio = $_POST["precio"]; 
		
		$sql = "UPDATE vehiculo SET placa = '" . $placa . "', tipo = '" . $tipo . "', marca = '" . $marca . "', color = '" . $color . "', km = '" . $km . "', modelo = '" . $modelo . "', precio = '" . $precio . "' WHERE id = '" . $id . "'";

		$query = mysqli_query($conexion, $sql);
		
		if($query)
		{
			echo "Vehiculo modificado con exito!";
		}
		else
		{
			echo "Error al modificar el vehiculo.";
		}
		
		mysqli_close($conexion);
	}
?>