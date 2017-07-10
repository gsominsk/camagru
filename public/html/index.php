<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" name="viewport" content="width=device-width user-scalable=no">
		<title>
			Camagru
		</title>
		<link rel="shortcut icon" href="../../images/1.png" type="image/png">

		<link href="../../public/css/main.css" rel="stylesheet">
		<link href="../../public/css/navbar.css" rel="stylesheet">
		<link href="../../public/css/float_menu.css" rel="stylesheet">
		<link href="../../public/css/photo_modal.css" rel="stylesheet">

		<link href="../../public/css/index.css" rel="stylesheet">
		<link href="../../public/css/media/index_media.css" rel="stylesheet">

		<script src="../../public/js/index/index.js" charset="utf-8"></script>
		<script src="../../public/js/float_menu.js" charset="utf-8"></script>

		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
	</head>
	<body>
		<div class="wrap">
			<div class="container">
				<div class="navbar_wrap">
					<div class="log_button">
						<a class="log_out_btn" href="#">logout</a>
					</div>
				</div>
				<div class="float_menu_wrap">
					<div class="float_menu_header">
						<div class="logo">
							<span>CAMAGRU</span>
						</div>
						<div class="menu_icon_out"></div>
						<div class="menu_icon_in"></div>
					</div>
					<div class="profile_li">
						<img src="../../images/avatar.jpg" alt="">
						<span class="profile_name"></span>
					</div>
					<div class="left_menu_list">
						<ul class="menu_list">
							<li><a href="../../public/html/gallery.php">Gallery<div></div></a></li>
							<li><a class="log_out_btn" href="#">Out<div></div></a></li>
						</ul>
					</div>
				</div>
				<div class="central_part_wrap">
					<div class="your_photos">
						<ul class="photos_list">

						</ul>
					</div>
					<div class="view_camera">
						<!-- <div class="add_new_elem">
							<div class="">
								+
							</div>
						</div> -->
						<div class="camera">
							<div class="turn_on_camera btn">Включить камеру</div>
							<div class="upload_file btn">Загрузить картинку</div>
							<input class="upload_photo" type="file" >
							<div class="canvas_area_wrap" height="100%" width="100%">
								<div class="canvas_area">

								</div>
							</div>
				    		<video class="video" id="video" autoplay></video>
							<img class="uploaded_img video" src="" alt="Image preview...">
							<div class="create_photo_btn btn"><i class="fa fa-camera" aria-hidden="true"></i></div>
							<div class="zoom_canvas_plus btn"><i class="fa fa-plus" aria-hidden="true"></i></div>
							<div class="zoom_canvas_minus btn"><i class="fa fa-minus" aria-hidden="true"></i></div>
							<div class="rotate_canvas_right btn"><i class="fa fa-repeat" aria-hidden="true"></i></div>
							<div class="rotate_canvas_left btn"><i class="fa fa-undo" aria-hidden="true"></i></div>
							<div class="delete_canvas btn"><i class="fa fa-trash-o" aria-hidden="true"></i></div>
							<script src="../../public/js/index/index.js" charset="utf-8"></script>
							<iframe name="frame" width=100% height=100% style="position:absolute;z-index:-1"></iframe>
						</div>
						<canvas class="canvas" width="640px" height="480px"></canvas>
						<div class="adding_elements_wrap">
							<ul class="adding_elements_list">

							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Модалка для загрузки элементов -->
		<div class="modal_ant_wrap">
            <div class="modal_ant">
				<div class="modal_ant_text">
					Highly recomended to use PNG files!
				</div>
				<div class="upload_field">
					<form action="/action_page.php">
					  <input class="upload_file_input" type="file" name="pic" accept="image/*">
					  <div class="file_name"></div>
					</form>
				</div>
				<div class="modal_ant_btn">
					<div class="btn_save_file">Save</div>
					<div class="btn_close_modal">Close</div>
				</div>
            </div>
        </div>

		<!-- Модалка для показа фото с коментариями	 -->
		<div class="modal_photo_wrap">
			<div class="modal_photo_content">
				<div class="modal_photo">
					<div class="owner_photo_wrap">

					</div>
				</div>
				<div class="modal_photo_comments">
					<div class="photo_owner">
						<div class="photo_owner_img"><img src="../../images/avatar.jpg" alt=""></div>
						<div class="photo_owner_name">profile</div>
						<div class="photo_creation_time">some time</div>
						<div class="photo_owner_likes">
							<span class="num_likes">10</span>
							<img src="../../images/icons/like.png" alt="">
						</div>
					</div>
					<div class="photo_comments">
						<ul class="modal_comentators_list">
						</ul>
					</div>
					<div class="modal_photo_bottom">
						<div class="delete_photo btn">delete</div>
						<div class="close_modal_photo btn">close</div>
					</div>
				</div>
			</div>
		</div>

		<footer>

		</footer>
	</body>
</html>
