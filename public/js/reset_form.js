window.onload = function() {
/*
** =====================================================================
**    Плавная смена форма проверики имейла на форму изменения паароля
** =====================================================================
*/
    var btnOpenReg = document.getElementsByClassName('register')[0];
    var btnCloseReg = document.getElementsByClassName('if_back')[0];
    var firstForm = document.getElementsByClassName('input_form_wrap')[0];
    var secondForm = document.getElementsByClassName('input_form_wrap')[1];
    var returnToEmail = document.getElementsByClassName('if_back_to_email')[0];

    function change_form() {
        firstForm.classList.add('hide_block');
        firstForm.classList.remove('show_block');
        setTimeout(function () { firstForm.style.display = 'none'; }, 400);
        setTimeout(function () { secondForm.classList.add('show_block'); }, 400);
    }

    returnToEmail.onclick = function() {
        secondForm.classList.add('hide_block');
        secondForm.classList.remove('show_block');
        setTimeout(function () { firstForm.style.display = 'block'; }, 400);
        setTimeout(function () { firstForm.classList.add('show_block'); }, 600);
    }
/*
** =================================================================
**          Восстановление пароля, форма проверки почты AJAX
** =================================================================
*/
    document.getElementsByClassName('check_pass')[0].addEventListener('click', function () {
        ajaxReset('../../php/check_email.php', function(data) {
            alert(JSON.stringify(data));
        });
        return false;
    });

    var email = document.querySelectorAll("[name=\"email_reset\"")[0];

    function ajaxReset(url, callback) {
        let xhr = new XMLHttpRequest();
        let body = 'email=' + encodeURIComponent(email.value);

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		xhr.onload = function (e) {
			if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
			} else {
				let str = JSON.parse(xhr.responseText);

				if (str.user === "found") {
					email.setCustomValidity("");
					console.log("email found!");
					change_form();
				} else {
					email.setCustomValidity("Вы ввели не зарегистрированную почту.");
				}
				console.log(xhr.responseText);
			}
		}
		xhr.send(body);
    }
/*
** =================================================================
**          Восстановление пароля, форма проверки почты AJAX
** =================================================================
*/
    let password = document.querySelectorAll("[name=\"pass_reset\"")[0];
    let passwordRe = document.querySelectorAll("[name=\"pass_reset_re\"")[0];

    password.onchange = checkPasswords;
    passwordRe.onchange = checkPasswords;

    function checkPasswords () {
        let password = document.querySelectorAll("[name=\"pass_reset\"")[0];
        let passwordRe = document.querySelectorAll("[name=\"pass_reset_re\"")[0];

        if (password.value != passwordRe.value) {
            passwordRe.setCustomValidity("Пароли не совпадают");
            passwordRe.style.borderBottom = password.style.borderBottom = '1px solid red';
            return (1);
        } else if ((password.value.length < 5 || password.value.length > 20) || (passwordRe.value.length < 5 || passwordRe.value.length > 20)){
            passwordRe.setCustomValidity("Пароль не соотвутствует длине. От 5 - 20 символов.");
            passwordRe.style.borderBottom = password.style.borderBottom = '1px solid red';
            return (1);
        } else {
            passwordRe.setCustomValidity('');
            passwordRe.style.borderBottom = password.style.borderBottom = '1px solid limegreen';
            return (0);
        }
    }

    document.getElementsByClassName('change_pass_btn')[0].addEventListener('click', function () {
        if (checkPasswords() == 0) {
            ajaxChangePass('../../php/reset_pass.php', function(data) {
                alert(JSON.stringify(data));
            });
        }
        return false;
    });

    function ajaxChangePass(url, callback) {
        let userKey = document.querySelectorAll("[name=\"user_key\"")[0];
        let newPass = document.querySelectorAll("[name=\"pass_reset\"")[0];
        let newPassRe = document.querySelectorAll("[name=\"pass_reset_re\"")[0];
        let xhr = new XMLHttpRequest();
        let body =  'email=' + encodeURIComponent(email.value) +
                    '&user_key=' + encodeURIComponent(userKey.value) +
                    '&new_pass=' + encodeURIComponent(newPass.value) +
                    '&new_pass_re=' + encodeURIComponent(newPassRe.value);
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onload = function (e) {
			if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
			} else {
				let str = JSON.parse(xhr.responseText);

				if (str.user === "updated") {
					email.setCustomValidity("");
					document.getElementsByClassName('email_created_success')[0].style.display = "block";
					document.getElementsByClassName('email_instructions')[0].style.display = "none";
					setTimeout(function () {
						window.location.href = "../../public/html/log_form.php";
					}, 2000)
				} else {
					userKey.setCustomValidity("Неверный ключ пользователя.");
				}
				console.log(xhr.responseText);
			}
		}
        xhr.send(body);
    }
}
