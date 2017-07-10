<?php
    include ('database.php');

    try {
    	$db = new PDO($DB_DSN_GLOBAL, $DB_USER, $DB_PASSWORD);
    	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	$db->query("CREATE DATABASE IF NOT EXISTS camagru");
    } catch (PDOException $e) {
    	echo "ERROR CREATING DB: " . $e->getMessage() . "\n";
    }

	$db = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->query("DROP TABLE IF EXISTS users");
	$db->query("DROP TABLE IF EXISTS photos");
	$db->query("DROP TABLE IF EXISTS comments");
	$db->query("CREATE TABLE users (
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(128) NOT NULL,
		email VARCHAR(128) NOT NULL,
		password VARCHAR(128) NOT NULL,
        user_key VARCHAR(128) NOT NULL,
        activated INT(1) DEFAULT 0
	)");
	$db->query("CREATE TABLE photos (
		photo_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		user_id INT(6) NOT NULL,
		likes INT(6) DEFAULT '0',
		photo_name VARCHAR(128) NOT NULL,
		reg_time TIMESTAMP
	)");
	$db->query("CREATE TABLE comments (
		commment_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		photo_id INT(6) UNSIGNED NOT NULL,
        user_name VARCHAR(128) NOT NULL,
		comment TEXT NOT NULL,
		comment_time TIMESTAMP
	)");
	$db->query("CREATE TABLE likes (
		like_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		user_key VARCHAR(128) NOT NULL,
		photo_name VARCHAR(128) NOT NULL
	)");
?>
