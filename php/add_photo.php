<?php

	include('connect.php');
	include ('ft_pdoSet.php');

	$data = $_POST['photo'];
	$user = md5(base64_decode($_SESSION['user_email']));

	list($type, $data) = explode(';', $data);
	list(, $data)      = explode(',', $data);
	$data = base64_decode($data);

	$userFiles = scandir('../images/userPhotos/'.$user.'/');

	$counter = strval(count($userFiles));

	if (file_put_contents('../images/userPhotos/'.$user.'/'.$user.".".$counter.'.jpeg', $data) != FALSE) {
		$email = base64_decode($_SESSION['user_email']);
		// var_dump($_SESSION);
		$stmt = $db->prepare('SELECT `id` FROM `users` WHERE `email` = :email');
		$stmt->execute(['email' => $email]);
		$row = $stmt->fetch(PDO::FETCH_LAZY);

		$date = new DateTime("now", new DateTimeZone('Europe/Kiev'));;
		$timestamp = $date->format('Y-m-d H:i:s');

		$values = array(
						'user_id' => $row['id'],
						'likes' => 0,
						'photo_name' => $user.".".$counter,
						'reg_time' => $timestamp
						);
		$fields = array("user_id", "likes", "photo_name", "reg_time");
		$sql = ("INSERT INTO photos SET".pdoSet($fields, $result, $values));
		$stm = $db->prepare($sql);
		$stm->execute($result);

		echo (json_encode(["status" => 200, "photo" => '../images/userPhotos/'.$user.'/'.$user.".".$counter.'.jpeg']));
	}
	else
		echo (json_encode(["status" => 200, "photo" => "error"]));
?>
