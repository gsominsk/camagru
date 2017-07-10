window.onload = function() {
    /*
	**	_-= плавное появление блоков =-_
	*/
    let btnOpenReg = document.getElementsByClassName('register')[0];
    let btnCloseReg = document.getElementsByClassName('if_back')[0];
    let firstForm = document.getElementsByClassName('input_form_wrap')[0];
    let secondForm = document.getElementsByClassName('input_form_wrap')[1];

    btnOpenReg.onclick = function() {
        firstForm.classList.add('hide_block');
        firstForm.classList.remove('show_block');
        setTimeout(function () { firstForm.style.display = 'none'; }, 400);
        setTimeout(function () { secondForm.classList.add('show_block'); }, 400);
    }

    btnCloseReg.onclick = function() {
        secondForm.classList.add('hide_block');
        secondForm.classList.remove('show_block');
        setTimeout(function () { firstForm.style.display = 'block'; }, 400);
        setTimeout(function () { firstForm.classList.add('show_block'); }, 600);
    }

	/*
	**	_-= проверка введенных данных пользователя =-_
	*/

    let name = document.querySelectorAll("[name=\"name_reg\"")[0];
    let email = document.querySelectorAll("[name=\"email\"")[0];
	let password = document.querySelectorAll("[name=\"pass_new\"")[0];
    let passwordRe = document.querySelectorAll("[name=\"pass_new_re\"")[0];

    password.onchange = checkPasswords;
    passwordRe.onchange = checkPasswords;

    function checkPasswords () {
        let password = document.querySelectorAll("[name=\"pass_new\"")[0];
        let passwordRe = document.querySelectorAll("[name=\"pass_new_re\"")[0];

        if (password.value != passwordRe.value) {
            passwordRe.setCustomValidity("Пароли не совпадают");
            passwordRe.style.borderBottom = password.style.borderBottom = '1px solid red';
            return (0);
        } else if ((password.value.length < 5 || password.value.length > 20) || (passwordRe.value.length < 5 || passwordRe.value.length > 20)){
            passwordRe.setCustomValidity("Пароль не соотвутствует длине. От 5 - 20 символов.");
            passwordRe.style.borderBottom = password.style.borderBottom = '1px solid red';
            return (0);
        } else {
            passwordRe.setCustomValidity('');
            passwordRe.style.borderBottom = password.style.borderBottom = '1px solid limegreen';
            return (1);
        }
    }

    function checkEmail() {
        let email = document.querySelectorAll("[name=\"email\"")[0];
        let name = document.querySelectorAll("[name=\"name_reg\"")[0];

        if (email.checkValidity() == true && name.checkValidity() == true)
            return (1);
        else {
            return (0);
        }
    }

    /*
    ** ===================================================
    **              Форма регистрации через AJAX
    ** ===================================================
    */

    document.getElementsByClassName('if_submit_reg')[0].addEventListener('click', function () {
        if (checkPasswords() && checkEmail()) {
            ajaxReg('../../php/registration.php', function(data) {
                alert(JSON.stringify(data));
            });
        }
        return false;
    });

	function ajaxReg(url, callback) {
        let email = document.querySelectorAll("[name=\"email\"")[0];
        let xhr = new XMLHttpRequest();
        let body =  'name_reg=' + encodeURIComponent(name.value) +
                    '&email=' + encodeURIComponent(email.value) +
                    '&pass_new=' + encodeURIComponent(password.value) +
                    '&pass_new_re=' + encodeURIComponent(passwordRe.value);
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		xhr.onload = function (e) {
			if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
			} else {
				let str = JSON.parse(xhr.responseText);

				if (str.user === "found") {
					email.setCustomValidity("Данная почта уже существует.");
				} else {
					document.getElementsByClassName("email_created")[0].style.display = "block";
					email.setCustomValidity("");
					setTimeout(function () {
						// window.location.href = "../../public/html/log_form.php";
					}, 3000);
				}
				// console.log(xhr.responseText);
			}
		}
        xhr.send(body);
    }

    /*
    ** ===================================================
    **              Форма входа через AJAX
    ** ===================================================
    */

    document.getElementsByClassName('if_submit_log')[0].addEventListener('click', function () {

        ajaxLogIn('../../php/login.php', function(data) {
            alert(JSON.stringify(data));
        });
        return false;
    });

    function ajaxLogIn(url, callback) {
        let email = document.querySelectorAll("[name=\"email_log\"")[0];
        let password = document.querySelectorAll("[name=\"pass_log\"")[0];
        let xhr = new XMLHttpRequest();
        let body =  'email=' + encodeURIComponent(email.value) +
                    '&password=' + encodeURIComponent(password.value);
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = function (e) {
            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
                // console.log(xhr.responseText);
                let str = JSON.parse(xhr.responseText);

                if (str.user === "found") {
                    // console.log("found");
                    setTimeout(function () {
                        window.location.href = "../../public/html/index.php";
                    }, 500)
                } else {
                    document.getElementsByClassName("error_name_wrap")[0].style.display = "block";
                }
                // console.log(xhr.responseText);
            }
        }
        xhr.send(body);
    }
}
