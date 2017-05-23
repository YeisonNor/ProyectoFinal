<?php

	header("Access-Control-Allow-Origin: *");
	include("conexion.php");
	
	$accion = $_POST["accion"];
	
	if($accion == 'Consultar')
	{
		$placa = $_POST["placa"];
		$tipo = $_POST["tipo"];
		$marca = $_POST["marca"];
		$color = $_POST["color"];
		$km = $_POST["km"];
		$modelo = $_POST["modelo"];
		$precio = $_POST["precio"]; 
		
		$sql = "SELECT v.* 
			FROM vehiculo v
			LEFT JOIN reserva r ON r.placa = v.placa
			WHERE r.id IS NULL ";
		
		if($placa !== '')
		{
			$sql = $sql . " AND v.placa = '" . $placa . "' ";
		}
		if($tipo !== '')
		{
			$sql = $sql . " AND v.tipo = '" . $tipo . "' ";
		}
		if($marca !== '')
		{
			$sql = $sql . " AND v.marca = '" . $marca . "' ";
		}	
		if($color !== '')
		{
			$sql = $sql . " AND v.color = '" . $color . "' ";
		}
		if($km !== '')
		{
			$sql = $sql . " AND v.km = '" . $km . "' ";
		}
		if($modelo !== '')
		{
			$sql = $sql . " AND v.modelo = '" . $modelo . "' ";
		}
		if($precio !== '')
		{
			$sql = $sql . " AND v.precio = '" . $precio . "' ";
		}
		
		$query = mysqli_query($conexion, $sql);
		
		$cantidadRegistros = mysqli_num_rows($query);
		
		if($cantidadRegistros > 0)
		{
			$tabla = "<table class='table table-striped'>";
			$tabla = $tabla . "<tr><th>Placa</th><th>Marca</th><th>Color</th><th>Km</th><th>Modelo</th><th>Precio</th><th>Reservar</th></tr>";
			while($row = mysqli_fetch_array($query))
			{
				$tabla = $tabla . "<tr><td>" . $row["placa"] . "</td>";
				$tabla = $tabla . "<td>" . $row["marca"] . "</td>";
				$tabla = $tabla . "<td>" . $row["color"] . "</td>";
				$tabla = $tabla . "<td>" . $row["km"] . "</td>";
				$tabla = $tabla . "<td>" . $row["modelo"] . "</td>";
				$tabla = $tabla . "<td>" . $row["precio"] . "</td>";
				$tabla = $tabla . "<td><center><img src='img/notepad.png' alt='Reservar' style='cursor: pointer' onclick='reservar(\"" . $row["placa"] . "\")'></center></td></tr>";
			}		

			$tabla = $tabla . "</table>";
			echo $tabla;
		}
		else
		{
			echo "No se encontraron vehiculos!";
		}
	}
	else
	{
		$cedula = $_POST["cedula"];
		$placa = $_POST["placa"];
		
		$sql = "INSERT INTO reserva(placa, cedula) VALUES ('" . $placa . "','" . $cedula . "')";

		$query = mysqli_query($conexion, $sql);
		
		if($query)
		{
			echo "Reserva registrada con exito!";
		}
		else
		{
			echo "Error al registrar la Reserva!";
		}
	
	}
	
	mysqli_close($conexion);
?>
