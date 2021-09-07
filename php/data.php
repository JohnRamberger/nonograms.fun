<?php
include 'db_connection.php';
    function insert_user($username, $img_url, $email, $score, $size, $difficulty){
        $table = "accounts";
        $sql = "INSERT INTO {$table} (username, img_url, email, score, size, difficulty) VALUES ('{$username}', '{$img_url}', '{$email}', {$score}, '{$size}', '{$difficulty}')";
        $conn = OpenCon();
        if(mysqli_query($conn, $sql)){
            CloseCon($conn);
            return true;
        }
        else{
            $error = mysqli_error($conn);
            CloseCon($conn);
            return ($error);
        }
    } 
    function check_user($email){
        $table = "accounts";
        $sql = "SELECT COUNT(*) AS tokenCount FROM {$table} WHERE email = '{$email}'";
        $conn = OpenCon();
        $result = mysqli_query($conn, $sql);
        $row = $result->fetch_assoc();
        CloseCon($conn);
        return $row['tokenCount'];
    }
    function insert_puzzle($email, $difficulty, $rowclues, $colclues, $fill){
        $table = "puzzles";
        $sql = "INSERT INTO {$table} (email, difficulty, row_clues, column_clues, fill) VALUES ('{$email}', '{$difficulty}', '{$rowclues}', '{$colclues}', '{$fill}')";
        $conn = OpenCon();
        if(mysqli_query($conn, $sql)){
            CloseCon($conn);
            return true;
        }
        else{
            $error = mysqli_error($conn);
            CloseCon($conn);
            return ($error);
        }
    }
    function update_puzzle($id, $fill){
        $table = "puzzles";
        $sql = "UPDATE {$table} SET fill = '{$fill}' WHERE id = '{$id}'";
        $conn = OpenCon();
        if(mysqli_query($conn, $sql)){
            CloseCon($conn);
            return true;
        }
        else{
            $error = mysqli_error($conn);
            CloseCon($conn);
            return ($error);
        }
    }
    function get_clues($id){
        $table = "puzzles";
        $sql = "SELECT row_clues, column_clues FROM {$table} WHERE id = {$id}";
        $conn = OpenCon();
        $result = mysqli_query($conn, $sql);
        if(!$result){
            return (mysqli_error($conn));
        }
        $row = $result -> fetch_assoc();
        CloseCon($conn);
        return $row;
    }
    function update_data($table, $tag, $tag_value, $where, $where_value){
        $sql = "UPDATE {$table} SET {$tag} = '{$tag_value}' WHERE {$where} = '{$where_value}'";
    }
    function get_data_where($table, $tag, $where, $where_value){
        $sql = "SELECT {$tag} FROM {$table} WHERE {$where} = '{$where_value}'";
        $conn = OpenCon();
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result) > 0)
        {
            while($row = mysqli_fetch_assoc($result))
            {
                echo $row["{$tag}"];
            }
        }else{
            echo "0 results";
        }

        CloseCon($conn);
    }
    function get_data($table, $tag){
        $sql = "SELECT {$tag} FROM {$table}'";
        $conn = OpenCon();
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result) > 0)
        {
            while($row = mysqli_fetch_assoc($result))
            {
                echo $row["{$tag}"];
            }
        }else{
            echo "0 results";
        }

        CloseCon($conn);
    }
    function insert_test($name, $pass){
        $table = "test";
        $sql = "INSERT INTO {$table} (name, pass) VALUES ('{$name}', '{$pass}')";
        $conn = OpenCon();
        if(mysqli_query($conn, $sql)){
            CloseCon($conn);
            return true;
        } else{
            CloseCon($conn);
            return false;
        }
    }

    function update_score_by($email, $score){
        $table = "accounts";
        $sql = "UPDATE {$table} SET score = ({$score} + score) WHERE email = '{$email}'";
        $conn = OpenCon();
        if(mysqli_query($conn, $sql)){
            CloseCon($conn);
            return true;
        } else{
            CloseCon($conn);
            return false;
        }
    }
    function get_unsolved_puzzle_ids($email){
        $table = "puzzles";
        $sql = "SELECT id,last_modified FROM {$table} WHERE email = '{$email}' ORDER BY UNIX_TIMESTAMP(last_modified) DESC";
        $conn = OpenCon();
        $result = mysqli_query($conn, $sql);
        $all = $result -> fetch_all();
        CloseCon($conn);
        return $all;
    }
    function delete_puzzle_by_id($id){
        $table = "puzzles";
        $sql = "DELETE FROM {$table} WHERE id = '{$id}'";
        $conn = OpenCon();
        if(mysqli_query($conn, $sql)){
            CloseCon($conn);
            return true;
        }
        else{
            $error = mysqli_error($conn);
            CloseCon($conn);
            return ($error);
        }
    }
    function get_puzzle_by_id($id){
        $table = "puzzles";
        $sql = "SELECT difficulty, fill, last_modified, row_clues, column_clues FROM {$table} WHERE id = {$id}";
        $conn = OpenCon();
        $result = mysqli_query($conn, $sql);
        if(!$result){
            return (mysqli_error($conn));
        }
        $row = $result -> fetch_row();
        CloseCon($conn);
        return $row;
    }
    function get_size($email){
        $table = "accounts";
        $sql = "SELECT size AS size FROM {$table} WHERE email = '{$email}'";
        $conn = OpenCon();
        $result = mysqli_query($conn, $sql);
        if(!$result){
            return (mysqli_error($conn));
        }
        $row = $result -> fetch_assoc();
        CloseCon($conn);
        return $row['size'];
    }
    function get_difficulty($email){
        $table = "accounts";
        $sql = "SELECT difficulty AS difficulty FROM {$table} WHERE email = '{$email}'";
        $conn = OpenCon();
        $result = mysqli_query($conn, $sql);
        if(!$result){
            return (mysqli_error($conn));
        }
        $row = $result -> fetch_assoc();
        CloseCon($conn);
        return $row['difficulty'];
    }
    function set_size($email, $size){
        $table = "accounts";
        $sql = "UPDATE {$table} SET size = '{$size}' WHERE email = '{$email}'";
        $conn = OpenCon();
        $result = mysqli_query($conn, $sql);
        if(!$result){
            return (mysqli_error($conn));
        }else{
            CloseCon($conn);
            return true;
        }
    }
    function set_difficulty($email, $difficulty){
        $table = "accounts";
        $sql = "UPDATE {$table} SET difficulty = '{$difficulty}' WHERE email = '{$email}'";
        $conn = OpenCon();
        $result = mysqli_query($conn, $sql);
        if(!$result){
            return (mysqli_error($conn));
        }else{
            CloseCon($conn);
            return true;
        }
    }
    function get_score($email){
        $table = "accounts";
        $sql = "SELECT score AS score FROM {$table} WHERE email = '{$email}'";
        $conn = OpenCon();
        $result = mysqli_query($conn, $sql);
        if(!$result){
            return (mysqli_error($conn));
        }
        $row = $result -> fetch_assoc();
        CloseCon($conn);
        return $row['score'];
    }
?>