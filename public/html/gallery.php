<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" name="viewport" content="width=device-width">
		<title>
			Camagru
		</title>
		<link rel="shortcut icon" href="../../images/1.png" type="image/png">
		<link href="../../public/css/gallery.css" rel="stylesheet">
		<link href="../../public/css/navbar.css" rel="stylesheet">
		<link href="../../public/css/main.css" rel="stylesheet">
		<link href="../../public/css/float_menu.css" rel="stylesheet">
		<link href="../../public/css/photo_modal.css" rel="stylesheet">

		<link href="../../public/css/media/gallery_media.css" rel="stylesheet">

		<script src="../../public/js/gallery.js" charset="utf-8"></script>

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
							<li><a href="../../public/html/index.php">Home<div></div></a></li>
							<li><a href="#" class="log_out_btn">Out<div></div></a></li>
						</ul>
					</div>
				</div>
				<div class="central_block_wrap">
					<ul class="gallery_photo_list">

					</ul>
					<div class="more_photos">
						<i class="fa fa-caret-square-o-down" aria-hidden="true"></i>
					</div>
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
					<div class="photo_input_comment">
						<textarea class="comments_textarea" name="send_comment"></textarea>
					</div>
					<div class="modal_photo_bottom">
						<div class="modal_send_btn btn">send</div>
						<div class="close_modal_photo btn">close</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
