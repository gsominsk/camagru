var btnMenuOut = document.getElementsByClassName('menu_icon_out')[0];
var btnMenuIn = document.getElementsByClassName('menu_icon_in')[0];
var menu = document.getElementsByClassName('float_menu_wrap')[0];

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
