var photoCounter = 0;
window.onload = function() {
	let globalPhotosList;

	ajaxGetSessionData('../../php/get_session_data.php', function(data) {
		if (data.userData === "not found") {
			console.log(1);
			if (confirm("Вы не зарегестрированы!") == true || confirm("Вы не зарегестрированы!") == false) {
				window.location.href = "../../public/html/log_form.php";
			}
		} else {
			console.log(data.userData.user_name);
			document.getElementsByClassName('profile_name')[0].innerHTML = data.userData.user_name;
		}
	});

	function ajaxGetSessionData(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onload = function (e) {
			if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
				return (NULL);
			} else {
				let str = JSON.parse(xhr.responseText);
				callback(str);
			}
		};
		xhr.send();
	}

	getPhotosList();

	function getPhotosList () {
		ajaxGetGalleryPhotos("../../php/get_gallery_photos.php", function (list) {
			console.log(list.photos_list);
			globalPhotosList = splitArray(list.photos_list);
			console.log(globalPhotosList);
			renderGalleryPhotos();
		});
	}

	function splitArray (arr) {
		let res = [];
		let i = arr.length;
		let j = 0;
		let counter = 0;

		while (i > 0) {
			res[j] = arr.slice((i - 9 > 0 ? i - 9 : 0), arr.length - counter);
			counter += 9;
			i - 9 > 0 ? i -= 9 : i = 0;
			j++;
		}
		return (res);
	}

	function renderGalleryPhotos (flag) {
		var galleryPhotosList = document.querySelector(".gallery_photo_list");

		for (let i = globalPhotosList[photoCounter].length - 1; i >= 0; i--) {
			render_elem('li',
						'gallery_photo',
						"<img src=\"" + "../" + globalPhotosList[photoCounter][i] + "\">",
						galleryPhotosList,
						zoomYourPhoto,
						flag
						);
		}
		photoCounter++;
	}

	function ajaxGetGalleryPhotos(phpUrl, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', phpUrl);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onload = function (e) {
			if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
				return (NULL);
			} else {
				let str = JSON.parse(xhr.responseText);
				str.photos_list != null ? callback(str) : 0;
			}
		};
		xhr.send();
	}

    function render_elem(elemCreate, elemClassName, elemData, elemParent, funcOnClick, flag)
    {
        newElem = document.createElement(elemCreate);
        newElem.className = elemClassName;
        newElem.innerHTML = "<div>" + elemData + "</div>";
        newElem.onclick = function () {
            elem_this = this;
            funcOnClick ? funcOnClick(elemData) : 0;
        };
		if (flag == "after")
			elemParent.appendChild(newElem);
		else
			elemParent.insertBefore(newElem, elemParent.lastChild);
	}

	let btnAddMorePhotos = document.getElementsByClassName('more_photos')[0];

	btnAddMorePhotos.onclick = function () {
		if (globalPhotosList[photoCounter])
			renderGalleryPhotos("after");
	}

/*
** ===============================================
**		Открыть подробности фото пользователя
** ===============================================
*/

    function zoomYourPhoto (elemData) {
		//открыли модальное окно
		let like = document.getElementsByClassName('photo_owner_likes')[0];
		let photoData;

		document.getElementsByClassName('modal_photo_wrap')[0].style.display = 'flex';
        setTimeout(function () {
            document.getElementsByClassName('modal_photo_content')[0].style.transform = 'translateY(0)';
        }, 100);
        //срендерили картинку
        newElem = document.createElement('div');
        newElem.className = 'owner_photo_wrap';
        newElem.innerHTML = elemData;
        document.querySelector(".modal_photo").replaceChild(newElem, document.querySelector(".owner_photo_wrap"));

		photoData = getElemData(elemData);
		// console.log(elemData);

		ajaxGetPhotoData("../../php/get_comments.php", photoData, function (commentData) {
			let commentsList = document.getElementsByClassName('modal_comentators_list')[0];

			// render photo data
			document.getElementsByClassName('num_likes')[0].innerHTML = commentData.photo.likes;
			document.getElementsByClassName('photo_owner_name')[0].innerHTML = commentData.photoOwnerName;
			document.getElementsByClassName('photo_creation_time')[0].innerHTML = commentData.photo.reg_time;

			// render comments
			commentsList.innerHTML = '';
			for (var i = 0; commentData.comments[i]; i++) {
				console.log(commentData);
				newElem = document.createElement('li');
				newElem.className = 'comentator';
				newElem.innerHTML = "	<div class=\"comentator_name\">"+
											"<div class=\"comentator_img_wrap\">"+
												"<img src=\"../../images/avatar.jpg\" alt>"+
											"</div>"+
											commentData.comments[i].user_name+
										"</div>"+
										"<div class=\"comment_creation_time\">"+
											commentData.comments[i].comment_time+
										"</div>"+
										"<textarea class=\"comentator_text\" placeholder=\""+commentData.comments[i].comment+"\">"+
										"</textarea>";
				commentsList.insertBefore(newElem, commentsList.firstChild);
			}
		});

		like.onclick = function () {
			ajaxLike("../../php/like.php", photoData, function (commentData) {
				let likeInner = document.getElementsByClassName('num_likes')[0].innerHTML.split('<');

				console.log("[like inner] : " + likeInner[0]);
				commentData.like == "added" ? likeInner[0] = parseInt(likeInner[0]) + 1 : 0;
				document.getElementsByClassName('num_likes')[0].innerHTML = likeInner[0];
				console.log(commentData.like);
			});
		}
		addComments(photoData);
    }

	function ajaxLike(phpUrl, elem, callback) {
		let xhr = new XMLHttpRequest();
		let body =	"user=" + encodeURIComponent(elem.user) +
					"&photo=" + encodeURIComponent(elem.photoNum);
		console.log(elem.user);
		console.log(elem.photoNum);
		xhr.open('POST', phpUrl, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		xhr.onload = function (e) {
			if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
			} else {
				let str = JSON.parse(xhr.responseText);
				callback(str);
			}
		}
		xhr.send(body);
	}

	function ajaxGetPhotoData (phpUrl, elem, callback) {
		let xhr = new XMLHttpRequest();
		let body =	"user=" + encodeURIComponent(elem.user) +
					"&photo=" + encodeURIComponent(elem.photoNum);
		xhr.open('POST', phpUrl, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		xhr.onload = function (e) {
			if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
			} else {
				let str = JSON.parse(xhr.responseText);
				callback(str);
			}
		}
		xhr.send(body);
	}

    document.getElementsByClassName('close_modal_photo')[0].onclick = function() {
        document.getElementsByClassName('modal_photo_content')[0].style.transform = '';
        setTimeout(function () {
            document.getElementsByClassName('modal_photo_wrap')[0].style.display = '';
        }, 350);
    }

/*
** ===============================================
** >>>>>>	Отправить коментарий
** ===============================================
*/


	function addComments (elem) {
		let commentsTextarea	= document.getElementsByClassName('comments_textarea')[0];
		let sendComments 		= document.getElementsByClassName('modal_send_btn')[0];
		let commentsList		= document.getElementsByClassName('modal_comentators_list')[0];

		sendComments.onclick = function () {
			// elem = getElemData(elem);
			console.log(elem);
			ajaxSendComment("../../php/send_comments.php", elem, function (commentData) {
				newElem = document.createElement('li');
				newElem.className = 'comentator';
				newElem.innerHTML = "<div class=\"comentator_name\"><div class=\"comentator_img_wrap\"><img src=\"#\" alt></div>"+commentData.user+"</div><textarea class=\"comentator_text\"placeholder=\""+commentData.comment+"\" disabled></textarea>";
				commentsList.insertBefore(newElem, commentsList.firstChild);
			});
		}

		function ajaxSendComment(phpUrl, elem, callback) {
			let xhr = new XMLHttpRequest();
			let body =	"user=" + encodeURIComponent(elem.user) +
						"&photo=" + encodeURIComponent(elem.photoNum) +
						"&comment=" + encodeURIComponent(commentsTextarea.value);
			xhr.open('POST', phpUrl, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
			xhr.onload = function (e) {
				if (xhr.status != 200) {
					console.log(xhr.status + ': ' + xhr.statusText);
				} else {
					let str = JSON.parse(xhr.responseText);
					callback(str);
					console.log(str);
				}
			}
			xhr.send(body);
		}
	}

	function getElemData (elem) {
		a = elem.split('\"');
		b = a[1];
		a = b.split('/')[5];
		a = a.split('.');
		b = {};
		b.user = a[0];
		b.photoNum = a[1];
		return (b);
	}

/*
** ===============================
**		    Меню слева
** ===============================
*/

    var btnMenuOut 	= document.getElementsByClassName('menu_icon_out')[0];
    var btnMenuIn 	= document.getElementsByClassName('menu_icon_in')[0];
    var menu 		= document.getElementsByClassName('float_menu_wrap')[0];
	var logOut     	= document.getElementsByClassName('log_out_btn')[0];

    btnMenuOut.onclick = function() {
        btnMenuOut.style.display = 'none';
        btnMenuIn.style.display = 'block';
        if (menu.style.transform === "translateX(-250px)") {
            menu.style.transform = "translateX(0px)";
        } else {
            menu.style.transform = "translateX(0px)";
        }
    }
    btnMenuIn.onclick = function() {
        btnMenuOut.style.display = 'block';
        btnMenuIn.style.display = 'none';
        if (menu.style.transform === "translateX(0px)") {
            menu.style.transform = "translateX(-250px)";
        } else {
            menu.style.transform = "translateX(0px)";
        }
    }

	function deleteSession () {
		ajaxDeleteSession('../../php/delete_session.php');

		function ajaxDeleteSession(url, callback) {
			let xhr = new XMLHttpRequest();
			xhr.open('POST', url, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
			xhr.onload = function (e) {
				if (xhr.status != 200) {
					console.log(xhr.status + ': ' + xhr.statusText);
				} else {
					// let str = JSON.parse(xhr.responseText);
					setTimeout(function () {
						window.location.href = "../../public/html/log_form.php";
					}, 0);
				}
			}
			xhr.send();
		}
	}

	logOut.onclick = deleteSession;
}
