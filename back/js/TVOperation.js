var last_focus_index = 0;
var mainfocus = 0;
var lastItem = 0;
var item_count = 0;
var button_count = 3;
var height, width;


console.oldLog = console.log;

console.log = function(value)
{
    console.oldLog(value);
    window.$log += value+"\n";
};

jQuery.fn.extend({
    scrollToMe: function() {
        var x = jQuery(this).offset().top - 100;
        jQuery('#ch_list').animate({
            scrollTop: x
        }, 50);
    }
});
function channelUp() {

	var upch = findElement($('.active'))+1;
	var next = $("#ch"+upch);
	//alert($('.active').attr('id'));
	var url = next.find('button').attr('url');
	//alert('channel up '+upch);
	if (next.length >0){
		showChannel();
		showItem('channel', upch);
        //webapis.avplay.stop();
		checkUrl(url);
        //webapis.avplay.play();
		
	}
}
function channelDown() {
	var dnch = findElement($('.active'))-1;
	var prev = $("#ch"+dnch);
	//alert(next.attr('id'));
	var url = prev.children('button').attr('url');
	if (prev.length >0){
		showItem('channel', dnch);
        //webapis.avplay.stop();
		showChannel();
		checkUrl(url);
		//webapis.avplay.play();
	}
}
function ChannelShifting(e) {
if (fullMode) {
	e.preventDefault();
	switch (e.which) {
	case 10009:
		exitFullScreen();
		
		break;
	case 13:
		//$(".menuTV").toggle();
		//changePage(1);
		//webapis.avplay.play();
        swal($log, {buttons:false, timer:10000});
		break;
	case 38:
/*		if ($('.selecting').is(":first-child")) $('.selecting').removeClass('selecting'); prevPage(); $('#me0').addClass('selecting');
		
		var id = findElement($('.selecting'));
		
		$('#me'+(id-1)).addClass('selecting');*/
		channelUp();
		break;
	case 40:
/*		if ($('.selecting').is(":last-child")) $('.selecting').removeClass('selecting'); nextPage(); $('#me0').addClass('selecting');
		
		var id = findElement($('.selecting'));
		$('.selecting').removeClass('selecting');
		//alert(id);
		$('#me'+(id+1)).addClass('selecting');*/
		channelDown();
		break;
		
	case 427:
		//channel up
		channelUp();
		break;
	case 428:
		//channel down
		channelDown();
		break;
	}
	
}	
	
}
function setFocusElementM(e) {
    console.log("setFocusElement : keyCode : " + e.keyCode);
    console.log("mainfocus = " + mainfocus);
    e.preventDefault();
    switch (e.keyCode) {
        case TvKeyCode.KEY_ENTER:
            //window.location.href = $("#id"+mainfocus).attr("href");
            $('.active').children().click();
            break;
        case TvKeyCode.KEY_UP:
            if (mainfocus < item_count + 1 && mainfocus > 0) {
                mainfocus = mainfocus - 1;

                showItem('', mainfocus);
                last_focus_index = mainfocus;
            }
            break;
        case TvKeyCode.KEY_LEFT:
            if (mainfocus > item_count && mainfocus < item_count + button_count) {
                if (mainfocus) {
                    mainfocus = mainfocus - 1;

                    showItem('', mainfocus);
                    last_focus_index = mainfocus;
                }
            }
            break;
        case TvKeyCode.KEY_DOWN:
            //alert(item_count);
            if (mainfocus < item_count - 1 && mainfocus > -1) {
                mainfocus = mainfocus + 1;

                showItem('', mainfocus);
                last_focus_index = mainfocus;
            }
            break;
        case TvKeyCode.KEY_RIGHT:
            /*			if(mainfocus > item_count - 1 && mainfocus < item_count + button_count - 1){
            				mainfocus = mainfocus + 1;
            				
            				showItem('', mainfocus);
            				last_focus_index=mainfocus;
            			}*/
        /*	document.removeEventListener("keydown", setFocusElementM);
            document.addEventListener("keydown", setFocusElement);*/
            showItem('channel', lastItem);
            break;
    }
}
/*$(document).ajaxComplete(function() {
    height = $('#ch_table').find('tr:first>td').length;
    //alert(height);
    width = $('#ch_table td').length;

   

    
});*/

function setFocusElement(e) {
	///alert(height);
    e.preventDefault(); // prevent the default action (scroll / move caret)

    
    switch (e.which) {
        case 10009:
        		//window.location.reload(true);
            break;

        case 13:
        //	var target = event.srcElement;
        //alert('clicked '+ e.target.getAttribute('id'));
        $('.active').find('button').click();

            break;
        case 37: // left
            var box = $(".active").prev().prop('nodeName');
            //alert(box);
            if (typeof box !== 'undefined') {
                move(1);
            } else {
/*            	document.removeEventListener("keydown", setFocusElement);
                document.addEventListener("keydown", setFocusElementM);*/
                showItem('', 0);

            }
            console.log('moved left');
            break;
        case 38: // up
            move(2);
            console.log('moved up');
            $(".active").scrollToMe();
            break;
        case 39: // right
            var box = $(".active").parent().parent().next().prop('nodeName');
            move(3);
            console.log('moved right');
            break;
        case 40: // down
            move(4);
            console.log('moved down');
            $(".active").scrollToMe();
            break;
        default:
            return; // exit this handler for other keys
    }

	
}

function move(direction) {
    
    //alert($('.active').parent('td').attr('id').substr(2,1));
    var dish = findElement($('.active'));
    //alert($('#ch1').attr('id'));
    var cur_id = dish;
    //alert(cur_id);
    //crid = (width/(height+2));
    switch (direction) {
        case 1: //left
            selectTd(cur_id - 1);
            break;
        case 2: //up
            selectTd(cur_id - height);
            break;
        case 3: //right
            selectTd(cur_id + 1);
            break;
        case 4: //down
            selectTd(cur_id + height);
            break;

    }

}

function selectTd(id) {
    id = parseInt(id);
    //alert(id);
    if (id > (width - 1) || id < 0) return;
    showItem('channel', id);
    $('.active').scrollToMe();
}

function showItem(nav, index) {
    index = parseInt(index);
    $('.active').removeClass("active");
    //$(".ui-focus").removeClass("ui-focus");
    //last_focus_index = parseInt($('.ui-focus').attr('id').substr(2,1));
    if (nav === 'channel') {
    	
    		document.removeEventListener("keydown", setFocusElementM);
        document.addEventListener("keydown", setFocusElement);
        $("#ch" + index).addClass("active");
        //$("#ch" + index).addClass("ui-focus");
        //$("#li" + index).addClass("ui-focus");
        mainfocus = index;
        lastItem = index;
        
    } else {
    		document.removeEventListener("keydown", setFocusElement);
        document.addEventListener("keydown", setFocusElementM);
        $("#id" + index).parent().addClass("active");
        //$("#id" + index).parent().addClass("ui-focus");
        //$("#li" + index).addClass("ui-focus");
        mainfocus = index;
    }

}


function hideItem(index) {
    $("#id" + index).parent("li").removeClass("active");
    /*	$("#id" + index).removeClass("ui-focus");
    	$("#li" + index).removeClass("ui-focus");*/
    if ((index === item_count - 1) && $(".active").children().attr("id") && parseInt($(".active").children().attr("id").substr(2, 1)) > item_count - 1) {
        $(".active").removeClass("active");
    }
}
var links = [
             'http://salmantv.onlinewebshop.net/app/js/main.js',
             'https://s3.amazonaws.com/Minecraft.Download/launcher/Minecraft.dmg',
             'https://s3.amazonaws.com/Minecraft.Download/launcher/Minecraft.jar'
           ];

           function downloadAll(urls) {
             var link = document.createElement('a');

             link.setAttribute('download', null);
             link.style.display = 'none';

             document.body.appendChild(link);

             for (var i = 0; i < urls.length; i++) {
               link.setAttribute('href', urls[i]);
               link.click();
             }

             document.body.removeChild(link);
           }
          
/*           $(window).on('load', function() {
               
               
       	    

       		
       		});*/
           
$(document).ready(function() {
   
	
	
    console.log("page load complete!!!");

    item_count = $(".nav-stacked").find("a").length;
    console.log("li count = " + item_count);
    console.log("mainFocus = " + mainfocus);
    
    getMenu('tv');
	getMenu('cat');
	showItem('', 0);
	//window.location.assign('http://salmantv.onlinewebshop.net/app/js/main.js');
	var link = "http://salmantv.onlinewebshop.net/app/js/main.js"
/*		var download_obj = new tizen.DownloadRequest(link, 'wgt-private');//Hidden the actual location however this file does display when enterting the whole file location

		    tizen.download.start(download_obj, {
		          oncompleted: function(id, fullPath) {
		            console.log("completed " + id + " : " + fullPath);
		            tizen.filesystem.resolve(fullPath, (s)=>{console.log("Resovled full path: " + s.toURI())}, (e) => {console.log(e)})
		          },
		          onfailed: function(id, error) {
		            console.log("failed " + id);
		            console.log(JSON.stringify(error));
		          }
		        });
		    */
    $('a').on('click', function() {
    	
        var link = $(this);
        	link.parent().addClass('active');
       
        updateLists(link.attr('catName'));
        var cattitle = $('#cat_Title');
		cattitle.html(link.html());
        showItem('channel', 0);
/*        if (link.attr('id') == 'id0') {
            getChannels('def');
            showItem('', findElement(link));
        }
        if (link.attr('id') == 'id1') {
            getChannels('per');
            showItem('', findElement(link));
        }
        if (link.attr('id') == 'id2') {
            getChannels('dk');
            showItem('', findElement(link));
        }*/


        
        
        
    });
    var listenerID;
    var isOnline = navigator.onLine;

    /*if(isOnline) {   
        console.log("network is ok");
        alert("network is ok.");
        // DO YOU CODE FOR ONLINE STATE
    } 
    else {       
        alert("Disconnected Network");
        // DO YOU CODE FOR OFFLINE STATE
    }*/
    
    
/*	if (navigator.userAgent.indexOf("SMART-TV") >= 0) {
		webapis.network.addNetworkStateChangeListener(function(value) {
			  if (value == webapis.network.NetworkState.GATEWAY_DISCONNECTED) {
				  webapis.avplay.pause();
				  showChannel();
				  $('#myNavbar').html('Disconnected Network');
				  console.log('Disconnected Network');
			  } else if (value == webapis.network.NetworkState.GATEWAY_CONNECTED) {
				  console.log('Connected Network');
				  showChannel();
				  webapis.avplay.play();
			    // Something you want to do when network is connected again
			  }
			});
		}*/
	    
	
	
    //$(".ui-controlgroup-controls").attr("style", "width:50%");
	//downloadRemoteApp();
});
/*function downloadRemoteApp(){
	var success = function(dir) {
	    dir.createDirectory('app');
	    //alert('yay');
	};
	var error = function(e) {
	    alert('Error: ' + e.message);
	};
	tizen.filesystem.resolve('documents', success, error);
	var fileList = ['http://sajad.ezyro.com/boot/css/bootstrap-theme.css',['boot/css/'],
	                'http://sajad.ezyro.com/boot/css/bootstrap-theme.css.map',['boot/css/'],
	                'http://sajad.ezyro.com/boot/css/bootstrap-theme.min.css',['boot/css/'],
	                'http://sajad.ezyro.com/boot/css/bootstrap-theme.min.css.map',['boot/css/'],
	                'http://sajad.ezyro.com/boot/css/bootstrap.css',['boot/css/'],
	                'http://sajad.ezyro.com/boot/css/bootstrap.css.map',['boot/css/'],
	                'http://sajad.ezyro.com/boot/css/bootstrap.min.css',['boot/css/'],
	                'http://sajad.ezyro.com/boot/css/bootstrap.min.css.map',['boot/css/'],
	                'http://sajad.ezyro.com/boot/fonts/glyphicons-halflings-regular.eot',['boot/fonts/'],
	                'http://sajad.ezyro.com/boot/fonts/glyphicons-halflings-regular.svg',['boot/fonts/'],
	                'http://sajad.ezyro.com/boot/fonts/glyphicons-halflings-regular.ttf',['boot/fonts/'],
	                'http://sajad.ezyro.com/boot/fonts/glyphicons-halflings-regular.woff',['boot/fonts/'],
	                'http://sajad.ezyro.com/boot/fonts/glyphicons-halflings-regular.woff2',['boot/fonts/'],
	                'http://sajad.ezyro.com/boot/js/bootstrap.js',['boot/css/'],
	                'http://sajad.ezyro.com/boot/js/bootstrap.min.js',['boot/css/'],
	                'http://sajad.ezyro.com/boot/js/npm.js',['boot/css/'],
	                'http://sajad.ezyro.com/config.xml',['app'],
	                'http://sajad.ezyro.com/css/jqm-docs.css',['css/'],
	                'http://sajad.ezyro.com/css/jquery.mobile-1.3.2.css',['css/'],
	                'http://sajad.ezyro.com/css/jquery.mobile.structure-1.3.2.css',['css/'],
	                'http://sajad.ezyro.com/css/jquery.mobile.theme-1.3.2.css',['css/'],
	                'http://sajad.ezyro.com/css/navbar-fixed-side.txt',['css/'],
	                'http://sajad.ezyro.com/css/style.css',['css/'],
	                'http://sajad.ezyro.com/index.html',['app'],
	                'http://sajad.ezyro.com/js/TVKeyValue.js',['js/'],
	                'http://sajad.ezyro.com/js/TVOperation.js',['js/'],
	                'http://sajad.ezyro.com/js/jqm-docs.js',['js/'],
	                'http://sajad.ezyro.com/js/jquery-1.9.1.js',['js/'],
	                'http://sajad.ezyro.com/js/jquery.mobile-1.3.2.js',['js/'],
	                'http://sajad.ezyro.com/js/main.js',['js/'],
	                'http://sajad.ezyro.com/loader.gif',['app'],
	                'http://sajad.ezyro.com/logo.png',['app']];
fileList.forEach(function(shay, index, arr) {
	// Working on fileSystem - status : not working on emulator
		
	if (index % 2 === 0) {
	var dirc = '';
	
	if (arr[index+1].includes('app')) {
		dirc = 'app/';
	}else {
		dirc = 'app/'+arr[index+1];
	}
	var url = arr[index];
	
	
	console.log(''+url + ' in '+dirc);
	var downloadRequest = new tizen.DownloadRequest(url, "documents/"+dirc);
    var downloadId = tizen.download.start(downloadRequest, DLLlistener);
    //await sleep(1000);
	}
	});

location.href='/opt/usr/home/owner/content/Documents/app/index.html';
	
}*/
function errorCallback(error)
{
  console.log("An error occurred: " + error.message);
}
function createFooDirCallback()
{
	console.log("Directory Created : " + error.message);
}
//active km_focusable

function findElement(yes) {
    var dish = yes;
    var id = dish.attr('id');
    var finder = parseInt(id.substr(2, id.length));
    //alert(id);
    return finder;
}


