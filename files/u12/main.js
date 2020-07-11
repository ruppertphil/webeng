let data = [];
let current = {};

const p = document.getElementById('content');

function createNavs() {
    $("#nav").html("");
    $("#site_nav").html("");
    $("#footer").html("");
    for(var i = 0; i < data.length; i++) {
        for(var e in data[i]){
            if (data[i].hasOwnProperty(e)) {
                if(i==0){
                    createMenuEntry(e, "nav");
                } else if (i==1){
                    createMenuEntry(e, "site_nav");
                } else {
                    createMenuEntry(e, "footer", true);
                }
            }
        }
    }
}

function createMenuEntry(link, id, isFooter = false){
    var nav = document.getElementById(id);
    if(isFooter){
        var a = document.createElement("a");
        a.setAttribute("href",createLink(link));
        a.setAttribute("onclick", "getContent(this)");
        a.innerText = link;
        nav.appendChild(a);
    } else {
        var li = document.createElement("li");
        li.innerHTML = "<a href='" + createLink(link) + "' onclick='getContent(this)'>" + link + "</a>";
        nav.appendChild(li);
    }
}

function createLink(link){
    return "#" + link.toLowerCase();
}

function getContent(ele){
    for(var i = 0; i < data.length; i++) {
        for (var e in data[i]) {
            if(e == ele.innerHTML){
                current = {name: e, position: i, text: data[i][e]};
                $("#edit-content-btn").show();
                $("#data-edit").hide();
                $("#data-add").hide();
                setContent(data[i][e]);
                setHistory(e);
            }
        }
    }
}

function setContent(text){
    var content = document.getElementById("content");
    content.innerHTML = text;
}

function setHistory(link){
    history.pushState(
        {info: "index.php " + link},
        link,
        'index.php' + createLink(link)
    )
}

function showAddData(){
    $("#data-add").show();
}

function editContent(){
    $("#data-edit-name").val(current.name);
    $("#data-edit-position").val(current.position);
    $("#data-edit-text").val(current.text);
    $("#data-edit").show();
}

function refreshContent(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            createNavs();
        }
    };
    xhttp.open("GET", "data.php", true);
    xhttp.send();
}

$( "#data-add" ).submit(function( event ) {
    $(this).hide();
    var form=$(this);
    $.ajax({
        type: 'POST',
        url: 'data-add.php',
        data : form.serialize(),
        dataType: 'html',
        encode: true
    }).done(function(data) {
        refreshContent();
    }).fail(function(data) {
        console.log('fail: '+JSON.stringify(data));
    });
    event.preventDefault();
});

$( "#data-edit" ).submit(function( event ) {
    $(this).hide();
    var form=$(this);
    $.ajax({
        type: 'POST',
        url: 'data-edit.php',
        data : form.serialize(),
        dataType: 'html',
        encode: true
    }).done(function(data) {
        refreshContent();
        setContent(data);
        current.text = data;
    }).fail(function(data) {
        console.log('fail: '+JSON.stringify(data));
    });
    event.preventDefault();
});

refreshContent();
