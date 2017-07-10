<?php

	include('connect.php');

	$stmt = $db->prepare('SELECT `photo_id` FROM `photos` WHERE `photo_name` = :photo_name');
	$stmt->execute(["photo_name" => $_POST['user'].".".$_POST['photo']]);
	$row = $stmt->fetch(PDO::FETCH_LAZY);

	$stmt = $db->prepare('DELETE FROM `photos` WHERE `photo_id` = :photo_id');
	$stmt->execute(["photo_id" => $row['photo_id']]);

	$stmt = $db->prepare('DELETE FROM `comments` WHERE `photo_id` = :photo_id');
	$stmt->execute(["photo_id" => $row['photo_id']]);

	$stmt = $db->prepare('DELETE FROM `likes` WHERE `photo_name` = :photo_name');
	$stmt->execute(["photo_name" => $_POST['user'].".".$_POST['photo']]);

	unlink("../images/userPhotos/".$_POST['user']."/".$_POST['user'].".".$_POST['photo'].".jpeg");

	echo (json_encode(["status" => 200, "photo" => 'deleted']));
?>
