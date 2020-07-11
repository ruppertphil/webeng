<?php
session_start();
if(isset($_SESSION["user"])){
    header('Location: index.php');
    die();
}

$message = "";
    if(isset($_POST["username"], $_POST["password"])){
        $username = $_POST["username"];
        $password = hash("whirlpool", $_POST["password"]);
        $data = json_decode(file_get_contents("accounts.json"));
        $users = $data->users;
        foreach ($users as $user){
            if($user->user == $username && $user->pass == $password){
                $_SESSION["user"] = $username;
                header('Location: index.php');
                die();
            }
        }
        $message = "Falsche Login-Daten.";
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login Ü12</title>
</head>
<body>
<h1>Login</h1>
<?php
    if(isset($_GET["registered"]))echo "<h3>Erfolgreich Registriert. Logge dich nun ein!</h3>";
    echo "<h4>" .  $message. "</h4>";
?>
<form action="login.php" method="post">
    <input name="username" type="text" placeholder="Username">
    <input name="password" type="password" placeholder="Passwort">
    <input type="submit" value="Login">
</form>
<a href="register.php">Noch keinen Account?</a>
</body>
</html>