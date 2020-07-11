<?php
session_start();
if(!isset($_SESSION["user"])){
    header('Location: login.php');
    die();
}
include_once "data_functions.php";
if(isset($_POST["position"], $_POST["name"], $_POST["text"])){
    addData($_POST["position"], $_POST["name"], $_POST["text"]);
    echo "Done";
}