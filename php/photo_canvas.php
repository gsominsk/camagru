<?php
	include('connect.php');

    $dir    = '../images/canvas_photos';
    $files = scandir($dir);

	// var_dump($files);
	if (!empty($files)) {
        echo (json_encode(["status" => 200, "photos" => $files]));
	} else {
        echo (json_encode(["status" => 200, "photos" => NULL]));
	}
	// }
?>
