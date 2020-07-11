<?php

function getData(){
    return file_get_contents("data.json");
}

function addData($position, $name, $text){
    $data = json_decode(file_get_contents("data.json"), true);
    $data[$position][$name] = $text;
    file_put_contents("data.json", json_encode($data));
}

function editData($position, $name, $text){
    $data = json_decode(file_get_contents("data.json"), true);
    $data[$position][$name] = $text;
    file_put_contents("data.json", json_encode($data));
}