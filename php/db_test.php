<?php
    include 'db_connection.php';

    $conn = OpenCon();

    echo "Connected";

    CloseCon($conn);

?>