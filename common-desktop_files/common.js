/*--------------------------------------- START MODAL --------------------------------------- */

// Close drodown and modal on click outside dropdown/modal area
$(document).click(function (){
  // Exception
  if($('#choose_button').css('display') != 'none') {
    return;
  }
  if($('#custom_button_editor').css('display') != 'none') {
    return;
  }
  $('.Dropdown').hide();
  // $('.modalLayer').hide();
  resetModals();
});

// Modal toggle
$(document).on('click', '.ModalToggle', function(event) {
  event.stopPropagation();
  var id = $(this).data('target-modal');
  modal = document.getElementById(id);
  $('#'+id).show();

  $('.Dropdown').hide(); // Hide dropdowns on modal toggle
  return false;
});

// Modal close
$('.dialog_closeX').click(function (){
  $('.Dropdown').hide();
  $(this).parents('.modalLayer').hide();
  // $('.modalLayer').hide(); // Changed
  resetModals();
});

// Prevent modal from closing when clicked inside
$('.Dialog').click(function(e) {
  // e.stopPropagation();
});

/*--------------------------------------- END MODAL --------------------------------------- */

/*--------------------------------------- START DROPDOWN --------------------------------------- */

// Drodown toggle
$(document).on('click', '.DropdownToggle', function(e) {
  var id = $(this).data('target-dropdown');
  submenu = document.getElementById(id);
  submenu.style.display = submenu.style.display == "block" ? "none" : "block";
  
  var togglePosition = $(this).position().top;
  var windowHeight = $(window).height();

  if((windowHeight - togglePosition - 230) < 0) {
    $('#'+id).css({'transform':'translateY(-100%)'});
  }

  $('.Dropdown').not(submenu).hide(); // Hide other dropdowns
  return false;
});

// Secondary dropdown toggle
$('.SubDropdownToggle').mouseover(function(event) {
  event.stopPropagation();
  var id = $(this).data('target-dropdown');
  submenu = document.getElementById(id);
  if(submenu) {
    submenu.style.display = "block";
  }
  $('.SubDropdown').not(submenu).hide();
  return false;
});


/*--------------------------------------- END DROPDOWN --------------------------------------- */


/*--------------------------------------- START SIDEBAR --------------------------------------- */

// EXPANDING OF SIDEBAR
$('.Topbar_navButton').click(function() {
  $('.Topbar_navButton').addClass('is_active');
  $('.sideNavBarContainer').removeClass('is_collapsed');
  $('.CustomScrollbarContainer_thumb').hide();
});

// CLOSING OF SIDEBAR
$('.sidebarHeader_closeIcon').click(function() {
  $('.Topbar_navButton').removeClass('is_active');
  $('.sideNavBarContainer').addClass('is_collapsed');
});

// Toggle sidebar common function
function toggleSidebar()
{
  var scrollDivHeight = $('.CustomScrollbarContainer_content')[0].scrollHeight + 50;
  var windowHeight = $(window).height();
  var viewportRatio = windowHeight / scrollDivHeight;

  if(viewportRatio >= 1) {
    $('.CustomScrollbarContainer_thumb').hide();
  }
  else {
    $('.CustomScrollbarContainer_thumb').show();
    $('.CustomScrollbarContainer_thumb').height(Math.round(viewportRatio * $('.CustomScrollbarContainer_track').height()) - 10);
  }
}

// Sidebar width adjustment common function
function adjustSidebarWidth()
{
  var scrollDivHeight = $('.CustomScrollbarContainer_content')[0].scrollHeight + 50;
  var windowHeight = $(window).height();
  var viewportRatio = windowHeight / scrollDivHeight;

  if(viewportRatio >= 1) {
    $('.CustomScrollbarContainer_content').css({'width':'216px'});
  }
  else {
    $('.CustomScrollbarContainer_content').css({'width':'210px'});
  }
}

// SIDEBAR WIDTH (Adjusts depending on scroll visibility)
(function(){
  adjustSidebarWidth()
})();
$( window ).resize(function() {
  adjustSidebarWidth()
});

// SIDEBAR - SCROLLBAR (Show/hide scrollbar thumb, set scrollbar thumb height)
$('.CustomScrollbarContainer_content').hover(function() {
  $('.CustomScrollbarContainer_thumb').hide();
  var scrollDivHeight = this.scrollHeight + 50;
  var windowHeight = $(window).height();
  var viewportRatio = windowHeight / scrollDivHeight;

  if(viewportRatio >= 1) {
    $('.CustomScrollbarContainer_thumb').hide();
  }
  else {
    $('.CustomScrollbarContainer_thumb').show();
    $('.CustomScrollbarContainer_thumb').height(Math.round(viewportRatio * $('.CustomScrollbarContainer_track').height()) - 10);
  }
});

// SIDEBAR - SCROLLBAR (Set scrollbar thumb top)
$('.scrollable_vertical').scroll(function() {
  var scrollTop = $('.scrollable_vertical').scrollTop() / $('.CustomScrollbarContainer_content')[0].scrollHeight * $('.CustomScrollbarContainer_track').height();
  $('.CustomScrollbarContainer_thumb').css({'top':scrollTop});
});

// SIDEBAR - Hide dropdown on scroll
$('.scrollable_vertical').scroll(function() {
  // $('.Dropdown').hide();
});

// Folder Items Show More
$('.moreFolders').click(function(e) {
  $('.HiddenFolders').toggle();
  if($(this).text() == "More Folders") {
    $(this).text("Show Less");
  } else {
    $(this).text("More Folders");
  };
  toggleSidebar();
});

// Website Items Show More
$('.moreWebsites').click(function(e) {
  $('.HiddenWebsites').toggle();
  if($(this).text() == "Show More") {
    $(this).text("Show Less");
  } else {
    $(this).text("Show More");
  };
  toggleSidebar();
});

// SIDEBAR - Item Selection
$('.SidebarItemRow').click(function(e) {
  $('.SidebarItemRow').removeClass('is_selected');
  $(this).addClass('is_selected');
});

// SIDEBAR DROPDOWN
$('.SidebarItemRow_MenuButton').click(function() {
  $('.SidebarItemRow_MenuButton').addClass('is_dropdownVisible');
});

// SIDEBAR - MENU ICON VISIBILITY ON CLICK
$('.SidebarItemRow_MenuButton').click(function(e) {
  $('.SidebarItemRow_MenuButton').removeClass('is_dropdownVisible');
  $(this).addClass('is_dropdownVisible');
});
/*--------------------------------------- END SIDEBAR --------------------------------------- */


/*--------------------------------------- START CREATE FOLDER --------------------------------------- */
// SHOW/HIDE - Create Folder
$('.ToggleElement').click(function(e) {
  $('.TargetElement').show();
  $('.NewFolderForm_descriptionAdd').hide();
});

// TEXT INPUT - INVALID
$('.textInput').keyup(function() {
  $('.textInput').removeClass('is_invalid');
  var folderName = $('.NewFolderForm_nameInput').val().trim();
  if(folderName == '') {
    $('.textInput').addClass('is_invalid');
    $('.NewFolderForm_createButton').addClass('button_is_disabled');
  }
  else {
    $('.NewFolderForm_createButton').removeClass('button_is_disabled');
  }
});

// Modal: Create new folder modal
function resetModals() {
  // Folder Modal
  $('.textInput').addClass('is_invalid');
  $('.NewFolderForm_nameInput').val('');
  $('.NewFolderForm_createButton').addClass('button_is_disabled');
  $('.TargetElement').hide();
  $('.NewFolderForm_descriptionAdd').show();
  $('.ql_editor').html('<div></div>');
}
/*--------------------------------------- END CREATE FOLDER --------------------------------------- */


/*--------------------------------------- START NOTIFICATION --------------------------------------- */

// Show notification
$('.ToastToggle').click(function() {
  $('.ToastBase').removeClass('is_hiding');
  $('.ToastBase').addClass('is_showing');
});


// Hide notification
$('.ToastBase .CloseButton').click(function() {
  $('.ToastBase').removeClass('is_showing');
  $('.ToastBase').addClass('is_hiding');
});
/*--------------------------------------- END NOTIFICATION --------------------------------------- */

/*--------------------------------------- START DRAG and DROP --------------------------------------- */

var dragSource = null;

var source;

function isbefore(a, b) {
  if (a.parentNode == b.parentNode) {
      for (var cur = a; cur; cur = cur.previousSibling) {
          if (cur === b) { 
              return true;
          }
      }
  }
  return false;
} 

function handleDragStart(e) {
  // this.style.opacity = '0.4';  // this / e.target is the source node.
  // alert('here');
  var item = $(this).find('.SidebarItemRow_Name').text();
  $('#drag-chiclet').text(item);

  dragSource = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setDragImage(document.getElementById('drag-chiclet'),0,0);
  // e.dataTransfer.setData('text/html', $(this).html());
  source = e.target;  

}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  // this.classList.add('dragged');

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this / e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }

  // See the section on the DataTransfer object.

  // dragSource.innerHTML = this.innerHTML;

  // $(this).html(e.dataTransfer.getData('text/html'));

  if (isbefore(source, e.target)) {
        e.target.parentNode.insertBefore(source, e.target);
    }
    else {
        e.target.parentNode.insertBefore(source, e.target.nextSibling);
    }

  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.

  [].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });
}

var cols = document.querySelectorAll('.DraggableContainer');
[].forEach.call(cols, function(col) {
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragenter', handleDragEnter, false);
  col.addEventListener('dragover', handleDragOver, false);
  col.addEventListener('dragleave', handleDragLeave, false);
  col.addEventListener('drop', handleDrop, false);
  col.addEventListener('dragend', handleDragEnd, false);
});
/*--------------------------------------- END DRAG and DROP --------------------------------------- */







/**************************************************** For Cleanup ****************************************************/

// $('.menu_item').mouseover(function(event) {
//   event.stopPropagation();
//   var id = $(this).data('target-dropdown');
//   submenu = document.getElementById(id);
//   if(id) {
//     submenu = document.getElementById(id);
  
//     if(submenu) {
//       submenu.style.display = "block";
//     }
//     $('.SubDropdown').not(submenu).hide();
//   }
//   else {
//     $('.SubDropdown').not(submenu).hide();
//   }
  
//   return false;
// });


// function handleDragStart(e)
// {
//   e.preventDefault();
//   e.stopPropagation();
//   e.dataTransfer.effectAllowed = 'move';
//   $(this).addClass('hello');
//   alert('done');
//   // $(this).css('opacity', '0.4');
//   // console.log($(this)[0].html());
//   // e.dataTransfer.setData('text/html', );
// }
// $('.DraggableContainer').


/*--------------------------------------- START EDITS TO EXISTING --------------------------------------- */


// THEME PICKER
// $(document).on('click', 'userHomscreen_themePicker', function() {
//   $('.HomeLeftSideBar_Checkbox').show();
//   $('.HomeLeftSideBar_List_Item button').show();
//   $(this).hide();
//   $('.HomeLeftSideBar_Done').show();
//   $('.SideBar_Color').show();

//   $('.HomeLeftSideBar_ShowMore').hide();
// });

// $(document).on('click', '.HomeLeftSideBar_Done', function() {
//   $('.HomeLeftSideBar_Checkbox').hide();
//   $('.HomeLeftSideBar_List_Item button').hide();
//   $(this).hide();
//   $('.HomeLeftSideBar_ShowMore').show();
//   $('.userHomscreen_themePicker').show();

//   var checkedBoxes = document.querySelectorAll('input[name=feedsidebar]:checked');
//   for (var i = 0; i < checkedBoxes.length; i++) {
//     var getText = $(checkedBoxes[i]).parent().text();
//     var itemClone = $(checkedBoxes[i]).parent().clone()
//     itemClone.children().remove();
//     $('.Feed_Favorites li button').clone().appendTo(itemClone);
//     itemClone.appendTo('.Feed_Favorites')
//     $(checkedBoxes[i]).parent().hide()

//   }
//   $('.SideBar_Color').hide();
// });
/*--------------------------------------- END EDITS TO EXISTING --------------------------------------- */