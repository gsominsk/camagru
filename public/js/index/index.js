window.onload = function() {

    ajaxGetSessionData('../../php/get_session_data.php', function(data) {
		console.log(data.userData);
        if (data.userData === "not found") {
            if (confirm("Вы не зарегестрированы!") == true || confirm("Вы не зарегестрированы!") == false) {
                window.location.href = "../../public/html/log_form.php";
            }
        } else {
            document.getElementsByClassName('profile_name')[0].innerHTML = data.userData.user_name;
            console.log(data.userData.user_key);
            AjaxGetUserPhotos('../../php/photo_user.php', "../images/userPhotos/" + data.userData.user_key + "/", "../../images/userPhotos/" + data.userData.user_key + "/", function (userPhotos) {
                var user_pictures_list = document.querySelector(".photos_list");
                for (let i = 0; i < userPhotos.length; i++) {
                    render_elem('li',
                                'photo',
                                "<img src=\"" + userPhotos[i] + "\">",
                                user_pictures_list,
                                zoomYourPhoto
                                );
                }
                console.log(userPhotos);
            });
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

    function AjaxGetUserPhotos(url, userPath, userPhotosPath, callback) {
        let xhr = new XMLHttpRequest();
        let body =  'userPath=' + encodeURIComponent(userPath);
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = function (e) {
            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
                let str = JSON.parse(xhr.responseText);
                for (var i = 2; i < str.photos.length; i++) {
                    str.photos[i] = userPhotosPath  + str.photos[i];
                }
                str.photos.splice(0, 2);
                callback(str.photos);
            }
        }
        xhr.send(body);
    }

/*
** =====================================================
**		 рендер канвасов и фотографий на странице
** =====================================================
*/


    function render_elem(elemCreate, elemClassName, elemData, elemParent, funcOnClick)
    {
        newElem = document.createElement(elemCreate);
        elemClassName ? newElem.className = elemClassName : 0;
        elemData ? newElem.innerHTML = elemData : 0;
        newElem.onclick = function () {
            elem_this = this;
            funcOnClick ? funcOnClick(elemData) : 0;
        };
        elemParent.insertBefore(newElem, elemParent.firstChild);
    }

    function AjaxGetPhotosList (phpUrl, photoUrl, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', phpUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		xhr.onload = function (e) {
			if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
				return (NULL);
			} else {
				let str = JSON.parse(xhr.responseText);
				for (var i = 2; i < str.photos.length; i++) {
					str.photos[i] = photoUrl  + str.photos[i];
				}
				str.photos.splice(0, 2);
				callback (str.photos);
			}
		};
        xhr.send();
    }

    AjaxGetPhotosList('../../php/photo_canvas.php', "../../images/canvas_photos/", function (canvasPhotos) {
        var bottom_pictures_list = document.querySelector(".adding_elements_list");
        for (let i = 0; i < canvasPhotos.length; i++) {
            render_elem('li',
                        'add_elem',
                        "<img src=\"" + canvasPhotos[i] + "\">",
                        bottom_pictures_list,
                        addCanvasOnPhoto
                        );
        }
    });


    // var right_photos_list = document.querySelector(".photos_list");
    // var userPhotos = AjaxgetPhotosList('../../php/photo_user.php', "../../images/canvas_photos/");

/*
** ===============================================
**		Открыть подробности фото пользователя
** ===============================================
*/


    function zoomYourPhoto (elemData) {
        console.log(elemData);
		//открыли модальное окно
        let deletePhoto = document.getElementsByClassName('delete_photo')[0];
		let like = document.getElementsByClassName('photo_owner_likes')[0];
        let commentsList = document.getElementsByClassName('modal_comentators_list')[0];
		let photoData;

		document.getElementsByClassName('modal_photo_wrap')[0].style.display = 'block';
        setTimeout(function () {
            document.getElementsByClassName('modal_photo_content')[0].style.transform = 'translateY(0)';
        }, 100);
        //срендерили картинку
        newElem = document.createElement('div');
        newElem.className = 'owner_photo_wrap';
        newElem.innerHTML = elemData;
        document.querySelector(".modal_photo").replaceChild(newElem, document.querySelector(".owner_photo_wrap"));

		photoData = getElemData(elemData);

		ajaxGetPhotoData("../../../php/get_comments.php", photoData, function (commentData) {

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
										"<div class=\"comentator_text\">"+
											commentData.comments[i].comment+
										"</div>";
				commentsList.insertBefore(newElem, commentsList.firstChild);
			}
		});

        //записали лайк
        like.onclick = function () {
			ajaxLike("../../../php/like.php", photoData, function (commentData) {
				let likeInner = document.getElementsByClassName('num_likes')[0].innerHTML.split('<');

				console.log("[like inner] : " + likeInner[0]);
				commentData.like == "added" ? likeInner[0] = parseInt(likeInner[0]) + 1 : 0;
				document.getElementsByClassName('num_likes')[0].innerHTML = likeInner[0];
				console.log(commentData.like);
			});
		}

        //удалили фото
        deletePhoto.onclick = function () {
            let photoWrap = document.getElementsByClassName('photo');
            ajaxDeletePhoto("../../../php/delete_photo.php", photoData, function (data) {
                let el = document.querySelector('img[src=\"../../images/userPhotos/'+photoData.user+"/"+photoData.user+"."+photoData.photoNum+".jpeg\""+']');
                closeZoomedPhoto();
                for (var i = 0; i < photoWrap.length; i++) {
                    if (photoWrap[i].innerHTML == elemData) {
                        photoWrap[i].removeChild(el);
                        break ;
                    }
                }
            });
        }
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

    document.getElementsByClassName('close_modal_photo')[0].onclick = closeZoomedPhoto;

    function closeZoomedPhoto () {
        document.getElementsByClassName('modal_photo_content')[0].style.transform = '';
        setTimeout(function () {
            document.getElementsByClassName('modal_photo_wrap')[0].style.display = '';
        }, 350);
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


    function ajaxDeletePhoto (phpUrl, elem, callback) {
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

/*
** ===============================
**		    Меню слева
** ===============================
*/

    var btnMenuOut  = document.getElementsByClassName('menu_icon_out')[0];
    var btnMenuIn   = document.getElementsByClassName('menu_icon_in')[0];
    var menu        = document.getElementsByClassName('float_menu_wrap')[0];
    var logOut      = document.getElementsByClassName('log_out_btn')[0];

    function openMenu () {
        btnMenuOut.style.display = 'none';
        btnMenuIn.style.display = 'block';
        if (menu.style.transform === "translateX(-250px)") {
            menu.style.transform = "translateX(0px)";
        } else {
            menu.style.transform = "translateX(0px)";
        }
    };

    function closeMenu () {
        btnMenuOut.style.display = '';
        btnMenuIn.style.display = '';
        if (menu.style.transform === "translateX(0px)") {
            menu.style.transform = "translateX(-250px)";
        } else {
            menu.style.transform = "translateX(0px)";
        }
    };

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

    btnMenuOut.onclick  = openMenu;
    btnMenuIn.onclick   = closeMenu;
    logOut.onclick      = deleteSession;

/*
** ===============================
**		Видео стрим
** ===============================
*/

    var btnTurrnOnStream  = document.getElementsByClassName('turn_on_camera')[0];
    var btnCreatePhoto    = document.getElementsByClassName('create_photo_btn')[0];
    var videoStream       = document.getElementsByClassName('video');
    var cameraWrap        = document.getElementsByClassName('camera')[0];
    var rightPhotosList   = document.querySelector(".photos_list");
    var canvas            = document.getElementsByClassName('canvas')[0];
    var canvasArea        = document.getElementsByClassName('canvas_area')[0];
    var canvasAreaWrap    = document.getElementsByClassName('canvas_area_wrap')[0];
    var canvasOnPhoto     = document.getElementsByClassName('canvas_on_photo');
    var uploadPhoto       = document.getElementsByClassName('upload_file')[0];
    var createPhotoFlag   = 0;
    var mainDataStream    = 0;

    btnTurrnOnStream.onclick = turnOnStream;
    btnCreatePhoto.onclick   = function () {
        createPhotoFlag == 1 ? createPhoto() : 0;
    }

    uploadPhoto.onclick = function () {
         document.querySelector('input[type=file]').click();
    }

    function turnOnStream () {

        let video = document.getElementsByClassName('video')[0];
        vendorUrl = window.URL || window.webkitURL;
        navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        navigator.getMedia({
            video: true,
            audio: false
        }, function(stream) {
            video.src = vendorUrl.createObjectURL(stream);
            var isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
            video.load();

        }, function(error) {
            btnTurrnOnStream.style.display = "none";
            videoError();
        });
        showVideoStream();
        setTimeout(function () {
			resizeCanvasArea();
        }, 1000);
    };

    document.getElementsByClassName('upload_photo')[0].onchange = function () {
        	var preview = document.getElementsByClassName('uploaded_img')[0]; //selects the query named img
        	var file    = document.querySelector('input[type=file]').files[0]; //sames as here
        	var reader  = new FileReader();
        	reader.onloadend = function () {
        		preview.src = reader.result;
        	}
        	if (file) {
        		reader.readAsDataURL(file); //reads the data as a URL
				mainDataStream = 1;
        	} else {
        		preview.src = "";
        	}
        	document.getElementsByClassName('upload_file')[0].style.display = "none";
        	showVideoStream();
    }

    function showVideoStream () {
        btnTurrnOnStream.style.display              = "none";
		uploadPhoto.style.display    	          	= "none";
        videoStream[mainDataStream].style.display   = "block";
        btnCreatePhoto.style.display                = "block";
        document.getElementsByClassName('zoom_canvas_plus')[0].style.display  	= "block";
        document.getElementsByClassName('zoom_canvas_minus')[0].style.display 	= "block";
        // document.getElementsByClassName('rotate_canvas_right')[0].style.display = "block";
        // document.getElementsByClassName('rotate_canvas_left')[0].style.display  = "block";
        document.getElementsByClassName('delete_canvas')[0].style.display    	= "block";
        // canvasOnPhoto.style.display = "block";
        canvasAreaWrap.style.display     = "block";
        cameraWrap.style.backgroundColor = "black";
    }

    // function videoError() {
    //     uploadPhoto.style.display   = "block";
    //     uploadPhoto.onchange = showVideoStream;
    // }

/*
** ===============================
**	>>>>>	Создание фото
** ===============================
*/

    var TO_RADIANS = Math.PI/180;

    function rotateAndPaintImage (context, image, angleInRad , positionX, positionY, width, height, axisX, axisY) {
        context.translate(positionX, positionY);
        context.rotate( angleInRad );
        context.drawImage( image, 0, 0, width, height);
        context.rotate( -angleInRad );
        context.translate(-positionX, -positionY);
    }

    function createPhoto () {
        var context = canvas.getContext('2d');
		var relativeAreaSize = findRelativeAreaSize();

        context.drawImage(videoStream[mainDataStream], 0, 0);
        for (var i = 0; i < canvasOnPhoto.length; i++) {
            let j = getSize(canvasOnPhoto[i]);
            let r = getCoords(canvasOnPhoto[i]);
            findRelativeCoords(r, relativeAreaSize.height, relativeAreaSize.width);
            findRelativeSize(j, relativeAreaSize.height, relativeAreaSize.width);
        //     //Поворот изображения, не работает
        //     if (canvasOnPhoto[i].style.transform != "") {
        //         // context.rotate(5);
        //         // console.log(canvasOnPhoto[i].style.transform.match(/\d+/)[0]);
        //         let angle = canvasOnPhoto[i].style.transform.match(/\d+/)[0];
        //
        //         rotateAndPaintImage (context, canvasOnPhoto[i], angle * TO_RADIANS, r.left, r.top, j.width, j.height, 640 / 2, 480 / 2);
        //         // drawRotatedImage(canvasOnPhoto[i], r.left, r.top, j.width, j.height, angle, context);
        //     } else
                context.drawImage(canvasOnPhoto[i], r.left, r.top, j.width, j.height);
        }
        new_image = convertCanvasToImage(canvas);
        ajaxAddPhoto("../../php/add_photo.php", new_image.src, function (data) {
            render_elem('li',
                        'photo',
                        "<img src=\"" + "../" + data.photo + "\">",
                        rightPhotosList,
                        zoomYourPhoto
                        );
        });
    }

	function findRelativeCoords (elemCoords, relativeHeight, relativeWidth) {
		let elem = document.getElementsByClassName('canvas')[0];
		elemCoords.left = (elemCoords.left / relativeWidth) * (elem.style.width / 100);
		elemCoords.top = (elemCoords.top / relativeHeight) * (elem.style.height / 100);
	}

	function findRelativeSize (elemSize, relativeHeight, relativeWidth) {
        elemSize.width = (elemSize.width / relativeWidth) * (elem.style.width / 100);
		elemSize.height = (elemSize.height / relativeWidth) * (elem.style.width / 100);
	}

	function findRelativeAreaSize () {
		var areaSize = getSize(canvasArea);

		areaSize.width = areaSize.width / 100;
		areaSize.height = areaSize.height / 100;
		return (areaSize);
	}

    function convertCanvasToImage(canvas) {
    	var image = new Image();
    	image.src = canvas.toDataURL("image/png");
    	return image;
    }

    function ajaxAddPhoto(url, photo, callback) {
        let xhr = new XMLHttpRequest();
        let body =  'photo=' + encodeURIComponent(photo);
        xhr.open('POST', url, true);
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

/*
** =====================================================
**	>>>>>	Ресайз блока с канвасами под размер видео
** ======================================================
*/

    window.onresize = resizeCanvasArea;

    function resizeCanvasArea () {
        let videoSize = getSize(videoStream[mainDataStream]);
        canvasAreaWrap.style.height = videoSize.height + "px";
        canvasAreaWrap.style.width = videoSize.width + "px";
    }

/*
** =============================================
**	>>>>>	Наложение канваса на фотографию
** =============================================
*/

    function addCanvasOnPhoto (elemData) {
        let symb = elemData.split('"');

        createPhotoFlag = 1;
        newElem = document.createElement('img');
        newElem.className = 'canvas_on_photo';
        newElem.src = symb[1];
        newElem.onmouseover = function () {
            elem_this = this;
            moveCanvas(elem_this);
        };
        newElem.onclick = function () {
            elem_this = this;
            canvasChangeSize(elem_this);
        };
        canvasArea.insertBefore(newElem, canvasArea.firstChild);
    }

/*
** =============================================
**	>>>>>	перемещение канваса по экрану
** =============================================
*/

    function moveCanvas (canvas) {
        var elem = document.getElementById('canvas');

        canvas.onmousedown = function(e) {
            var coords = getCoords(canvas);
            var shiftX = e.pageX - coords.left;
            var shiftY = e.pageY - coords.top;

            moveAt(e);
            function moveAt(e) {
                canvas.style.zIndex = 3; // над другими элементами
                canvas.style.left = e.pageX - shiftX + 'px';
                canvas.style.top = e.pageY - shiftY + 'px';
            }
            document.onmousemove = function(e) {
                moveAt(e);
            };
            canvas.onmouseup = function() {
                canvas.style.zIndex = 2;
                document.onmousemove = null;
                canvas.onmouseup = null;
            };
        }

        canvas.ondragstart = function() {
            return false;
        };
    }

    function getCoords(canvas) {
        let coords = getComputedStyle(canvas, null) || elem.currentStyle;
        var result = {};
        result.top = parseInt(coords['top']);
        result.left = parseInt(coords['left']);
        return (result);
    }

    function getSize(canvas) {
        let coords = getComputedStyle(canvas, null) || elem.currentStyle;
        var result = {};
        result.height = parseInt(coords['height']);
        result.width = parseInt(coords['width']);
        return (result);
    }

/*
** =============================================
**	>>>>>	измененение размера канваса
** =============================================
*/

    var degrees = 10;

    function canvasChangeSize (canvas) {
		console.log(111);
        var btnZoomPlus  = document.getElementsByClassName('zoom_canvas_plus')[0];
        var btnZoomMinus = document.getElementsByClassName('zoom_canvas_minus')[0];
        var btnRotateRight    = document.getElementsByClassName('rotate_canvas_right')[0];
        var btnRotateLeft    = document.getElementsByClassName('rotate_canvas_left')[0];
        var btnDeleteCanvas    = document.getElementsByClassName('delete_canvas')[0];
        btnZoomPlus.onclick = function () {
            console.log("plus");
            let sizeCamera = getSize(canvasArea);
            let sizeCanvas = (getSize(canvas).height / (sizeCamera.height / 100));
            let size = sizeCanvas + 5 + "%";
            canvas.style.height =  "" + size;
        }
        btnZoomMinus.onclick = function () {
            console.log("minus");
            let sizeCamera = getSize(canvasArea);
            let sizeCanvas = (getSize(canvas).height / (sizeCamera.height / 100));
            let size = sizeCanvas - 5 + "%";
            canvas.style.height =  "" + size;
        }
        // btnRotateRight.onclick = function () {
        //     let elem = getComputedStyle(canvas, null) || elem.currentStyle;
        //     if (elem.transform == "none") {
        //         canvas.style.transform = "rotate(10deg)";
        //     } else {
        //         degrees += 10;
        //         canvas.style.transform = "rotate("+degrees+"deg)";
        //     }
        // }
        btnDeleteCanvas.onclick = function () {
			if (canvas) {
				canvasArea.removeChild(canvas);
				canvas = null;
			}
        }
    }
}
