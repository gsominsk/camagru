<?php
	include('connect.php');
	include ('ft_pdoSet.php');

	$email = trim($_POST['email']);
    $userKey = trim($_POST['user_key']);
    $newPass = trim($_POST['new_pass']);

	include ('../config/database.php');
	$stmt = $db->prepare('SELECT `user_key` FROM `users` WHERE `email` = :email');
	$stmt->execute(['email' => $email]);
	$row = $stmt->fetch(PDO::FETCH_LAZY);
	if (hash_equals($row['user_key'], $userKey)) {
		$allowed = array("password");
		$_POST['password'] = md5($newPass);
		$sql = "UPDATE users SET ".pdoSet($allowed,$values)." WHERE user_key = :user_key";
		$stm = $db->prepare($sql);
		$values["user_key"] = $userKey;
		$stm->execute($values);
		echo (json_encode(["status" => 200, "user" => "updated"]));
	} else {
		echo (json_encode(["status" => 200, "user" => "error"]));
	}
?>
