<?php

function OpenCon()
{
    //$dbhost = "35.245.7.160";
    $dbhost = "localhost";
    //$dbuser = "root";
    $dbuser = "id12523146_johnramberger";
    //$dbpass = "ramberger123";
    $dbpass = "_MW6TSewiXjmgV%";
    //$db = "nonograms";
    $db = "id12523146_nonograms";

    $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);

    return $conn;
}

function CloseCon($conn)
{
    $conn -> close();
}

?>