<?php
session_start();
if(!isset($_SESSION["user"])){
    header('Location: login.php');
    die();
}
include_once "data_functions.php";
echo getData();