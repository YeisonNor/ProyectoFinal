<?php

	header("Access-Control-Allow-Origin: *");
	include("conexion.php");
	
	$tipo = $_POST["tipo"];
	
	if($tipo == 'Login')
	{
		$usuario = $_POST["usuario"];
		$password = $_POST["password"];
		
		$sql = "SELECT * FROM usuario WHERE usuario = '" . $usuario . "' AND clave = '" . $password . "'";
		
		$query = mysqli_query($conexion, $sql);
		
		$cantidadRegistros = mysqli_num_rows($query);
		
		if($cantidadRegistros > 0)
		{
			$cedula = "";
			while($row = mysqli_fetch_array($query))
			{
				$cedula = $row["cedula"];
			}		
			echo $cedula;
		}
		else
		{
			echo "Datos No Validos";
		}

		mysqli_close($conexion);
	}
	else
	{
		$cedula = $_POST["cedula"];
		
		$sql = "SELECT * FROM usuario WHERE cedula = '" . $cedula . "'";
		
		$query = mysqli_query($conexion, $sql);
		
		$cantidadRegistros = mysqli_num_rows($query);
		
		if($cantidadRegistros > 0)
		{
			$registro = "";
			while($row = mysqli_fetch_array($query))
			{
				$registro = $row["cedula"] . "¬" . $row["nombre"] . "¬" . $row["apellido"] . "¬" . $row["tipo"];
			}		
			echo $registro;
		}
		else
		{
			echo "Datos No Validos";
		}

		mysqli_close($conexion);
	}
?>