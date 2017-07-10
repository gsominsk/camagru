<?php
	include ('connect.php');
	include ('ft_pdoSet.php');

	$stmt = $db->prepare('SELECT `like_id` FROM `likes` WHERE `user_key` = :user_key AND `photo_name` = :photo_name');
	$stmt->execute(['user_key' => $_SESSION['user_key'], 'photo_name' => $_POST['user'].".".$_POST['photo']]);
	$row = $stmt->fetch(PDO::FETCH_LAZY);

	if ($row['like_id'] == NULL) {
		$values = array(
						'user_key' => $_SESSION['user_key'],
						'photo_name' => $_POST['user'].".".$_POST['photo']
						);
		$fields = array("user_key", "photo_name");
		$sql = ("INSERT INTO likes SET".pdoSet($fields, $result, $values));
		$stm = $db->prepare($sql);
		$stm->execute($result);

		$stmt = $db->prepare('SELECT `likes` FROM `photos` WHERE `photo_name` = :photo_name');
		$stmt->execute(['photo_name' => $_POST['user'].".".$_POST['photo']]);
		$row = $stmt->fetch(PDO::FETCH_LAZY);
		$num = (int)$row['likes'];
		$num++;
		$allowed = array("likes");
		$_POST['likes'] = $num;
		$sql = "UPDATE photos SET ".pdoSet($allowed,$values)." WHERE photo_name = :photo_name";
		$stm = $db->prepare($sql);
		$values["photo_name"] = $_POST['user'].".".$_POST['photo'];
		$stm->execute($values);

		echo (json_encode(["status" => 200, "like" => "added"]));
	} else {
		echo (json_encode(["status" => 200, "like" => "exists"]));
	}
?>
