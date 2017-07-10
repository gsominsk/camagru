
<?php
	// require_once('connect.php');
	include ('ft_pdoSet.php');

	check_data() == 0 ? check_user() : print_r('error');

	function check_data() {
		$login = trim($_POST['name_reg']);
		$email = trim($_POST['email']);
		$pass_new = trim($_POST['pass_new']);
		$pass_new_re = trim($_POST['pass_new_re']);

		$flag = (!(isset($_POST['name_reg'])) ? 0 : 1);
		$flag += (!(isset($_POST['email'])) ? 0 : 1);
		$flag += (!(isset($_POST['pass_new_re'])) ? 0 : 1);
		$flag += (!(isset($_POST['pass_new'])) ? 0 : 1);
		$flag += (empty($login) ? 0 : 1);
		$flag += (empty($email) ? 0 : 1);
		$flag += (empty($pass_new) ? 0 : 1);
		$flag += (empty($pass_new_re) ? 0 : 1);
		return ($flag === 8 ? 0 : 1);
	}

	function check_user() {
		$user_name = trim($_POST['name_reg']);
		$email = trim($_POST['email']);
		$password = hash('md5', trim($_POST['pass_new']));
		$pass_new_re = trim($_POST['pass_new_re']);

		include ('connect.php');
		$stmt = $db->prepare('SELECT `id` FROM `users` WHERE `email` = :email');
		$stmt->execute(['email' => $email]);
		$row = $stmt->fetch(PDO::FETCH_LAZY);
		if (!(isset($row['id']))) {

			$encrypt = md5($email);
			$values = array(
							'user_name' => $user_name,
							'email' => $email,
							'password' => $password,
							'user_key' => $encrypt
							);
			$fields = array("user_name", "email", "password", "user_key");

			$sql = ("INSERT INTO users SET".pdoSet($fields, $result, $values));
			$stm = $db->prepare($sql);
			$stm->execute($result);

			$to = $email;
			$subject = "New User Validation";
			$from = 'info@localhost:8080';
			$body = 'Hi, <br/> <br/>Your uID is ' . $user_name . ' <br><br>Click here to validate your account http://localhost:8080/php/activation.php?encrypt=' . $encrypt . ' <br/>';
			$headers = "From: " . strip_tags($from) . "\r\n";
			$headers .= "Reply-To: ". strip_tags($from) . "\r\n";
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
			$check = mail($to, $subject, $body, $headers);

			if (!is_dir('../images/userPhotos')) {
				mkdir('../images/userPhotos/');
			}
			!is_dir('../images/userPhotos') ? mkdir('../images/userPhotos/'.$encrypt) : 0;

			echo (json_encode(["status" => 200, "user" => "not found", "mail" => $check]));
		} else {
			echo (json_encode(["status" => 200, "user" => "found"]));
		}
	}
?>
