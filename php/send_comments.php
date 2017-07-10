<?php
	include ('connect.php');
	include ('ft_pdoSet.php');

	$stmt = $db->prepare('SELECT `email`, `user_name` FROM `users` WHERE `user_key` = :user_key');
	$stmt->execute(['user_key' => $_POST['user']]);
	$row = $stmt->fetch(PDO::FETCH_LAZY);


	$to = $row['email'];
	$subject = "Yoy hane new comment";
	$from = 'info@localhost:8080';
	$body = 'Hi, <br/> <br/>You have a new comment '.$_POST['comment'];
	$headers = "From: " . strip_tags($from) . "\r\n";
	$headers .= "Reply-To: ". strip_tags($from) . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	$check = mail($to, $subject, $body, $headers);


	$stmt = $db->prepare('SELECT `photo_id` FROM `photos` WHERE `photo_name` = :photo_name');
	$stmt->execute(['photo_name' => $_POST['user'].".".$_POST['photo']]);
	$photo = $stmt->fetch(PDO::FETCH_LAZY);

	$date = new DateTime("now", new DateTimeZone('Europe/Kiev'));;
	$timestamp = $date->format('Y-m-d H:i:s');

	$values = array(
					'photo_id' => $photo['photo_id'],
					'user_name' => base64_encode($_SESSION['profile_name']),
					'comment' => base64_encode($_POST['comment']),
					'comment_time' => $timestamp
					);
	$fields = array("photo_id", "comment", "user_name", "comment_time");
	$sql = ("INSERT INTO comments SET".pdoSet($fields, $result, $values));
	$stm = $db->prepare($sql);
	$stm->execute($result);

	echo(json_encode([
						"status" => 200,
						"comment" => $_POST['comment'],
						"commentTime" => $timestamp,
						"user" => $_SESSION['profile_name']
					]));
?>
