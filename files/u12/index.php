<?php
session_start();
if(!isset($_SESSION["user"])){
    header('Location: login.php');
    die();
}
include_once "data_functions.php";
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Navigator Ü12</title>
    <link rel="stylesheet" href="main.css">
</head>
<body>
<nav>
    <ul id="nav">
    </ul>
</nav>
<div id="main">
    <site_nav>
        <ul id="site_nav">

        </ul>
    </site_nav>
    <div class="container">
        <div id="content"></div>
        <div style="width: 100%; text-align: right;">
            <a id="edit-content-btn" href="#" onclick="editContent();" style="display: none;">Bearbeiten</a>
        </div>
        <div class="add-content">
            <form id="data-add" style="display: none;">
                <h2>Content hinzufügen</h2>
                <select name="position" required>
                    <option value="0">Top Navigation</option>
                    <option value="1">Side Navigation</option>
                    <option value="2">Footer Navigation</option>
                </select>
                <input type="text" name="name" placeholder="Name" required>
                <textarea name="text" required style="width: 50%; height: 100px; display: block;"></textarea>
                <input type="submit" value="Hinzufügen">
            </form>
        </div>
        <div class="edit-content">
            <form id="data-edit" style="display: none;">
                <h2>Content bearbeiten</h2>
                <input id="data-edit-name" type="hidden" name="name" required>
                <input id="data-edit-position" type="hidden" name="position" required>
                <textarea id="data-edit-text" name="text" required style="width: 50%; height: 100px; display: block;"></textarea>
                <input type="submit" value="Speichern">
            </form>
        </div>
    </div>
</div>
<footer id="footer">

</footer>
<div class="info-footer">
    <a href="#" onclick="showAddData();">Content hinzufügen</a>
    <a href="logout.php">Logout</a>
</div>
<script src="jquery.min.js"></script>
<script src="main.js"></script>
</body>
</html>