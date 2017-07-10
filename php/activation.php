<?php
    include ('ft_pdoSet.php');

    $value = $_GET['encrypt'];

    if ($value != NULL && !empty($value)) {
        include ('connect.php');
        $stmt = $db->prepare('SELECT `user_key` FROM `users` WHERE `user_key` = :value');
        $stmt->execute(['value' => $value]);
        $row = $stmt->fetch(PDO::FETCH_LAZY);
        if (hash_equals($row['user_key'], $value)) {
            $allowed = array("activated");
            $_POST['activated'] = 1;
            $sql = "UPDATE users SET ".pdoSet($allowed,$values)." WHERE user_key = :user_key";
            $stm = $db->prepare($sql);
            $values["user_key"] = $value;
            $stm->execute($values);
            $_POST['check'] = "success";
        } else {
            $_POST['check'] = "fail";
        }
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <style type="text/css">
            html, body, div, form{box-sizing: border-box;}
            html, body
            {
                height: 100%;
                margin: 0;
                padding: 0;
                -moz-user-select: none;
                -khtml-user-select: none;
                user-select: none;
                overflow: hidden;
            }
            body{background: #00bcd4;}
            .message
            {
                width: 200px;
                height: 80px;
                margin: 0 auto;
                margin-top: 10%;
                text-align: center;
                font-size: 6vh;
                font-family: sans-serif;
                color: #fff;
            }
        </style>
    </head>
    <body>
        <div class="message">
            <?php echo ($_POST['check']); ?>
        </div>
        <script type="text/javascript">
            window.onload = function () {
                setTimeout(function () {
                    window.location.href = "../../public/html/log_form.php";
                }, 3000)
            }
        </script>
    </body>
</html>
