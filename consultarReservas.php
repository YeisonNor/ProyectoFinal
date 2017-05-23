<?php

	header("Access-Control-Allow-Origin: *");
	include("conexion.php");
	
	$tipo = $_POST["tipo"];
	
	if($tipo == 'Admin')
	{
		
		$sql = "SELECT u.cedula, u.nombre, u.apellido, u.celular, v.placa, r.fecha
				FROM reserva r
				JOIN usuario u ON r.cedula = u.cedula
				JOIN vehiculo v ON r.placa = v.placa";
		
		$query = mysqli_query($conexion, $sql);
		
		$cantidadRegistros = mysqli_num_rows($query);
		
		if($cantidadRegistros > 0)
		{
			$tabla = "<table class='table table-striped'>";
			$tabla = $tabla . "<tr><th>Cedula</th><th>Nombre</th><th>Apellido</th><th>Celular</th><th>Placa</th><th>Fecha</th></tr>";
			while($row = mysqli_fetch_array($query))
			{
				$tabla = $tabla . "<tr><td>" . $row["cedula"] . "</td>";
				$tabla = $tabla . "<td>" . $row["nombre"] . "</td>";
				$tabla = $tabla . "<td>" . $row["apellido"] . "</td>";
				$tabla = $tabla . "<td>" . $row["celular"] . "</td>";
				$tabla = $tabla . "<td>" . $row["placa"] . "</td>";
				$tabla = $tabla . "<td>" . $row["fecha"] . "</td></tr>";
			}		

			$tabla = $tabla . "</table>";
			echo $tabla;
		}
		else
		{
			echo "No hay registros";
		}
	}
	else if($tipo == 'Cliente')
	{
		$cedula = $_POST["cedula"];
		
		$sql = "SELECT v.placa, v.tipo, v.marca, v.modelo, r.fecha 
				FROM reserva r
				JOIN vehiculo v ON r.placa = v.placa
				WHERE r.cedula = '" . $cedula . "'";
		
		$query = mysqli_query($conexion, $sql);
		
		$cantidadRegistros = mysqli_num_rows($query);
		
		if($cantidadRegistros > 0)
		{
			$tabla = "<table class='table table-striped'>";
			$tabla = $tabla . "<tr><th>Placa</th><th>Tipo</th><th>Marca</th><th>Modelo</th><th>Fecha</th></tr>";
			while($row = mysqli_fetch_array($query))
			{
				$tabla = $tabla . "<tr><td>" . $row["placa"] . "</td>";
				$tabla = $tabla . "<td>" . $row["tipo"] . "</td>";
				$tabla = $tabla . "<td>" . $row["marca"] . "</td>";
				$tabla = $tabla . "<td>" . $row["modelo"] . "</td>";
				$tabla = $tabla . "<td>" . $row["fecha"] . "</td></tr>";
			}		

			$tabla = $tabla . "</table>";
			echo $tabla;
		}
		else
		{
			echo "No hay registros";
		}
	}

	mysqli_close($conexion);
?>