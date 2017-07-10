<?php
	include('connect.php');

	if (!is_dir('../images/userPhotos/'.$_SESSION['user_key'])) {
		mkdir('../images/userPhotos/'.$_SESSION['user_key']);
	}
    $files = scandir($_POST['userPath']);

	if (!empty($files)) {
        echo (json_encode(["status" => 200, "photos" => $files]));
	} else {
        echo (json_encode(["status" => 200, "photos" => NULL]));
	}
?>
