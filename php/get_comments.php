<?php
	include ('connect.php');
	$stmt = $db->prepare('SELECT `photo_id`, `likes`, `reg_time` FROM `photos` WHERE `photo_name` = :photo_name');
	$stmt->execute(['photo_name' => $_POST['user'].".".$_POST['photo']]);
	$photo = $stmt->fetch(PDO::FETCH_LAZY);

	$stmt = $db->prepare('SELECT `user_name` FROM `users` WHERE `user_key` = :user_key');
	$stmt->execute(['user_key' => $_POST['user']]);
	$photo_owner = $stmt->fetch(PDO::FETCH_LAZY);

	$stmt = $db->prepare('SELECT `user_name`, `comment`, `comment_time` FROM `comments` WHERE `photo_id` = :photo_id');
	$stmt->execute(['photo_id' => $photo['photo_id']]);
	$i = 0;
	$res = array();
	while (1) {
		$comments = $stmt->fetch(PDO::FETCH_LAZY);
		if ($comments == false)
			break ;
		foreach ($comments as $key => $value) {
			if ($key == "comment" || $key == "user_name") {
				$res[$i][$key] = base64_decode($value);
			} else {
				$res[$i][$key] = $value;
			}
		}
		$i++;
	}
	echo(json_encode(["status" => 200, "comments" => $res, "photo" => $photo, "photoOwnerName" => $photo_owner['user_name']]));
?>
