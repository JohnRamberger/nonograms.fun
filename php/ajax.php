<?php
    header("Content-Type: application/json", true);
    include 'data.php';

    if(isset($_POST["action"])){
        switch($_POST["action"]){
            case 'test':
                test();
                break;
            case 'signup':
                signup();
                break;
            case 'login':
                login();
                break;
            case 'check_user':
                checkuser();
                break;
            case 'gupi':
                gupi();
                break;
            case 'get_puzzle':
                get_puzzle();
                break;
            case 'get_size':
                g_size();
                break;
            case 'get_difficulty':
                g_difficulty();
                break;
            case 'get_score':
                g_score();
                break;
            case 'set_size':
                s_size();
                break;
            case 'set_difficulty':
                s_difficulty();
                break;
            case 'set_score':
                s_score();
                break;
            case 'insert_puzzle':
                i_puzzle();
                break;
            case 'update_puzzle':
                u_puzzle();
                break;
            case 'get_clues':
                g_clues();
                break;
            case 'delete_puzzle':
                d_puzzle();
                break;

        }
    }

    function signup(){
        //get all the $_POST values needed for the database
        $username = $_POST['username'];
        $img_url = $_POST['img_url'];
        $email = $_POST['email'];
        $score = $_POST['score'];
        $size = $_POST['size'];
        $difficulty = $_POST['difficulty'];
        if(isset($username, $img_url, $email, $score, $size, $difficulty))
        {
            //$password = password_hash($password, PASSWORD_DEFAULT);
            //$email = password_hash($email, PASSWORD_DEFAULT);  hash email?
            $res = insert_user($username, $img_url, $email, $score, $size, $difficulty);
            if($res){
                echo json_encode(array('result' => "user added to database!"));
            }else{
                echo json_encode(array('result' => $res));
            }
        }
        else{
            echo json_encode(array("result" => "insert failed!"));
        }
    }

    function checkuser(){
        $email = $_POST['email'];
        if(isset($email)){
            $result = check_user($email);
            echo json_encode(array('result' => $result));
        }
        else{
            echo json_encode(array('result' => "-1"));
        }
    }

    function login(){

    }

    function clean($text){
        $text = trim($text);
        //$text = htmlspecialchars($text);
        return $text;
    }

    function test(){
        if(isset($_POST["name"], $_POST["pass"]))//required fields
        {
            $name = clean($_POST['name']);
            $pass = clean($_POST['pass']);
            //insert into DB
            if(insert_test($name, $pass)){
                $result = array('result'=> "test success");
                echo json_encode($result);
            }
            
        } else{
            $result = array('result'=> "test failed");
            echo json_encode($result);
        }
    }
    function gupi(){
        $email = $_POST['email'];
        if(isset($email)){
            $result = get_unsolved_puzzle_ids($email);
            echo json_encode($result);
        }
    }
    function get_puzzle(){
        $id = $_POST['puzzle_id'];
        if(isset($id)){
            $result = get_puzzle_by_id($id);
            echo json_encode($result);
        }
        else{
            $result = array('result'=> "test failed");
            echo json_encode($result);
        }
    }
    function g_score(){
        $email = $_POST['email'];
        if(isset($email)){
            $result = get_score($email);
            echo json_encode($result);
        }
    }
    function g_size(){
        $email = $_POST['email'];
        if(isset($email)){
            $result = get_size($email);
            echo json_encode($result);
        }
    }
    function g_difficulty(){
        $email = $_POST['email'];
        if(isset($email)){
            $result = get_difficulty($email);
            echo json_encode($result);
        }
    }
    function s_size(){
        $email = $_POST['email'];
        $size = $_POST['size'];
        if(isset($email, $size)){
            $result = set_size($email, $size);
            echo json_encode($result);
        }
    }
    function s_difficulty(){
        $email = $_POST['email'];
        $difficulty = $_POST['difficulty'];
        if(isset($email, $difficulty)){
            $result = set_difficulty($email, $difficulty);
            echo json_encode($result);
        }
    }
    function s_score(){//add new points earned
        $email = $_POST['email'];
        $score = $_POST['score'];
        if(isset($email, $score)){
            $result = update_score_by($email, $score);
            echo json_encode($result);
        }
    }
    function i_puzzle(){
        $email = $_POST['email'];
        $diff = $_POST['difficulty'];
        $rowclues = $_POST['row_clues'];
        $colclues = $_POST['col_clues'];
        $fill = $_POST['fill'];
        if(isset($email, $diff, $rowclues, $colclues, $fill))
        {
            $res = insert_puzzle($email, $diff, $rowclues, $colclues, $fill);
            if($res){
                echo json_encode(array('result' => "puzzle added to database!"));
            }else{
                echo json_encode(array('result' => $res));
            }
        }
        else{
            echo json_encode(array("result" => "insert failed!"));
        }
    }
    function u_puzzle(){
        $id = $_POST['puzzle_id'];
        $fill = $_POST['fill'];
        if(isset($id, $fill))
        {
            $res = update_puzzle($id, $fill);
            if($res){
                echo json_encode(array('result' => "puzzle updated!"));
            }else{
                echo json_encode(array('result' => $res));
            }
        }
        else{
            echo json_encode(array("result" => "failed!"));
        }
    }
    function g_clues(){
        $id = $_POST['puzzle_id'];
        if(isset($id))
        {
            $result = get_clues($id);
            echo json_encode($result);
        }
        else{
            echo json_encode(array("result" => "not set"));
        }
    }
    function d_puzzle(){
        $id = $_POST['puzzle_id'];
        if(isset($id))
        {
            $res = delete_puzzle_by_id($id);
            if($res){
                echo json_encode(array('result' => "puzzle deleted!"));
            }else{
                echo json_encode(array('result' => $res));
            }
        }
        else{
            echo json_encode(array("result" => "failed!"));
        }
    }
?>