<?php
//Sichere Version
if(isset($_POST["modt"])){
    file_put_contents("modt.txt", preg_replace("/[^A-Za-z0-9?![:space:]]/","", $_POST["modt"]));
}
$modt = file_get_contents("modt.txt");
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Ü14.1</title>
</head>
<body>
<h1>Nachricht des Tages:</h1>
    <p><?php echo $modt ?></p>
<h4>Nachricht ändern:</h4>
<form action="1.php" method="post">
    <label for="modt">Nachricht: </label>
    <textarea name="modt" id="modt"></textarea>
    <input type="submit" value="Speichern">
</form>
</body>
</html>
