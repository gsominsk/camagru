<?php
	include('connect.php');

	if (!empty($_SESSION['user_email'])) {
        $_SESSION['user_email'] = "";
		$_SESSION['profile_name'] = "";
		echo (json_encode(["status" => 200, "session" => "deleted"]));
	} else {
        echo (json_encode(["status" => 200, "session" => "not exists"]));
	}
	// }
?>
