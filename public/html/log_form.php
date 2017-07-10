<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" name="viewport" content="width=device-width">
		<title>
			Camagru
		</title>
		<link rel="shortcut icon" href="../../images/1.png" type="image/png">

		<link href="../css/log_form.css" rel="stylesheet">

		<!-- <script src="../js/cookie.js" charset="utf-8"></script> -->
		<script src="../js/log_form.js" charset="utf-8"></script>
	</head>
	<body>
		<div class="wrap">
			<div class="container">
				<div class="label">
					<a href="#">CAMAGRU</a>
				</div>
				<div class="input_form_wrap">
					<form class="input_form input_form_log" method="post" onsubmit="return false;">
						<div class="error_name_wrap">
							<div class="error">Invalid name or password</div>
							<a href="../../public/html/reset_form.php" class="forgot_pass">forgot your password?</a>
						</div>
						<input type="text" name="email_log" placeholder="email" required>
						<input type="password" name="pass_log" placeholder="password" required>
						<div class="register">didn`t register yet?</div>
						<input class="if_submit if_submit_log btn" type="submit" name="submit" value="submit">
					</form>
				</div>
				<div class="input_form_wrap">
					<form class="input_form input_form_reg" method="post" onsubmit="return false;">
						<div class="email_created">Регистрация прошла успешно, подтвердите аккаунт перейдя по ссылке отправлнеой вам на почту.</div>
						<input type="text" name="name_reg" placeholder="name" required>
						<input type="email" name="email" placeholder="email" required>
						<input type="password" min="5" max="20" name="pass_new" placeholder="password" required>
						<input type="password" min="5" max="20" name="pass_new_re" placeholder="password_re" required>
						<div class="if_back">back</div>
						<input class=" if_submit if_submit_reg btn" type="submit" name="submit" value="submit">
					</form>
				</div>
			</div>
		</div>
	</body>
</html>
