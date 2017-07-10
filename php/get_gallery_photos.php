<?php
	include ('connect.php');

	$userFiles = scandir('../images/userPhotos/');
	// var_dump($userFiles);
	if (!empty($userFiles[2])) {
		$j = 0;
		$result[0] = NULL;
		for ($i=2; $i < count($userFiles); $i++) {
			$folders[$j] = $userFiles[$i];
			$photos[$folders[$j]] = scandir('../images/userPhotos/'.$folders[$j].'/');
			$j++;
		}
		$j = 0;
		foreach ($photos as $key => $value) {
			for ($i = 2; $i < count($value); $i++) {
				$result[$j] = '../images/userPhotos/'.$key."/".$value[$i];
				$j++;
			}
		}
		$files = array();
		if ($result[0] != NULL) {
			foreach ($result as $file) $files[$file] = filemtime($file);
			asort($files);
			$files = array_keys($files);
			echo (json_encode(["status" => 200, "photos_list" => $files]));
		} else {
			echo (json_encode(["status" => 200, "photos_list" => NULL]));
		}
	}
	else
		echo (json_encode(["status" => 200, "photos_list" => NULL]));
?>
