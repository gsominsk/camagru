<?php
	include ('connect.php');
	include ('pdo_set.php');
	$sex = $_POST['sex'];
	$wordValue = $_POST['wordValue'];
	$word = base64_encode($_POST['word']);
	$lan = $_POST['lan'];

	$stmt = $db->prepare('SELECT `word` FROM `'.$lan.'words` WHERE `word` = :word');
	$stmt->execute(['word' => $word]);
	$row = $stmt->fetch(PDO::FETCH_LAZY);

	if (!isset($row['word'])) {
		$values = array(
							'sex' => $sex,
							'value' => $wordValue,
							'word' => $word
						);
		$fields = array("sex", "value", "word");
		$sql = ("INSERT INTO ".$lan."words SET".pdoSet($fields, $result, $values));
		$stm = $db->prepare($sql);
		$stm->execute($result);
		echo (json_encode(["status" => 200, "word" => "success"]));
	} else {
		echo (json_encode(["status" => 200, "word" => "fail"]));
	}

?>
