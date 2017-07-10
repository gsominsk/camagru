<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" name="viewport" content="width=device-width">
		<title>
			Camagru
		</title>
		<link rel="shortcut icon" href="../../images/1.png" type="image/png">

		<link href="../css/reset_form.css" rel="stylesheet">

        <script src="../../public/js/reset_form.js" charset="utf-8"></script>
    </head>
    <body>
        <div class="wrap">
			<div class="container">
				<div class="label">
					<a href="#">CAMAGRU</a>
				</div>
				<div class="input_form_wrap">
					<form class="input_form input_form_log" method="post" onsubmit="return false;">
                        <div class="email_created">Введите вашу почту для получения ключа.</div>
                        <input type="email" name="email_reset" placeholder="email" required>
						<input class="if_submit check_pass btn" type="submit" name="submit" value="submit">
                        <a href="log_form.php" class="if_back">back</a>
                    </form>
				</div>
				<div class="input_form_wrap">
					<form class="input_form input_form_reg" method="post" onsubmit="return false;">
                        <div class="email_created">
                            <span class="email_instructions">Введите ключ отосланный вам на почту, затем введите новый пароль.</span>
                            <span class="email_created_success">Пароль успешно изменен.</span>
                        </div>
                        <input type="text" name="user_key" placeholder="key" required>
						<input type="password" min="5" max="20" name="pass_reset" placeholder="password" required>
						<input type="password" min="5" max="20" name="pass_reset_re" placeholder="password_re" required>
                        <div class="if_back if_back_to_email">back</div>
						<input class="if_submit change_pass_btn btn" type="submit" name="submit" value="submit">
					</form>
				</div>
			</div>
		</div>
    </body>
</html>
