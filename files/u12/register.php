<?php
session_start();

if(isset($_SESSION["user"])){
    header('Location: index.php');
    die();
}

if(isset($_POST["username"], $_POST["password"])){
    $username = $_POST["username"];
    $password = hash("whirlpool", $_POST["password"]);
    $data = json_decode(file_get_contents("accounts.json"));
    $users = $data->users;
    array_push($users, ["user" => $username, "pass" => $password]);
    $data->users = $users;
    file_put_contents("accounts.json", json_encode($data));
    header('Location: login.php?registered=1');
    die();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Registrierung Ü12</title>
</head>
<body>
<h1>Registrieren</h1>
<form action="register.php" method="post">
    <input name="username" type="text" placeholder="Username">
    <input name="password" type="password" placeholder="Passwort">
    <input type="submit" value="Registrieren">
</form>
<a href="login.php">Doch lieber einloggen?</a>
</body>
</html>