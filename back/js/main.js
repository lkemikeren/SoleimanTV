var backEventListener = null;
var fullMode = false;
//var player;
//player = document.querySelector('player');
var lastURL = "";
var categoriesJSON, tvlistJSON;
var gatewayStatus;
var perRow = 4;
//$('.shay').attr('style', 'display: none;');

var Listener = {
	    onbufferingstart: function() {
	        console.log("Buffering start.");
	        
	        
	        EnterfullScreen();
	        //webapis.avplay.prepare();
	        startLoad();

	        
	        webapis.avplay.setBufferingParam("PLAYER_BUFFER_FOR_RESUME","PLAYER_BUFFER_SIZE_IN_SECOND", 3);
	    },

	    onbufferingprogress: function(percent) {

	        console.log("Buffering progress data : " + percent);
	        /*		    if (percent>=99) {
	        		    	webapis.avplay.play();
	        		    } else {
	        		    webapis.avplay.pause();
	        		    }*/
	        //webapis.avplay.pause();
	        startLoad();
	        /*		    $(".progress-bar").css("width", percent +"%");
	        		    $(".status").html(percent +"%");
	        		    $(".progress-wrp").show();*/
	    },

	    onbufferingcomplete: function() {
	        console.log("Buffering complete.");
	        
	        setTimeout(function() {hideCh();},3000);
	        webapis.avplay.play();
	        stopLoad();
	    		
	        //$(".progress-wrp").hide();
	    },
	    onstreamcompleted: function() {
	        console.log("Stream Completed");
	        webapis.avplay.stop();
	    },

	    oncurrentplaytime: function(currentTime) {
	        //console.log("Current playtime: " + currentTime);
	        if (webapis.avplay.getState() === 'PLAYING') {
	        
	        
	            stopLoad();
	        } else {
	            startLoad();
	        }
	    },
	   
	    onerror: function(eventType) {
	        console.log("event type error : " + eventType);
	        //alert('an error occured: '+eventType)
	        //exitFullScreen();
	        //stopLoad();
	        //webapis.avplay.stop();
	    },

	    onevent: function(eventType, eventData) {
	        console.log("event type: " + eventType + ", data: " + eventData);
	        //
	        /*if (!gatewayStatus) {
				      $('#small-dialog').show();
				    } else {
				    	$('#small-dialog').hide();
				    } 
				    	if (eventType.substring(0, 6)==='error'){
				   
			    	webapis.avplay.stop();
			    	stopLoad();
			    	exitFullScreen();
			    }*/

	    },

	    onsubtitlechange: function(duration, text, data3, data4) {
	        console.log("subtitleText: " + text);
	    },
	    ondrmevent: function(drmEvent, drmData) {
	        console.log("DRM callback: " + drmEvent + ", data: " + drmData);
	    }
	};

var unregister = function() {
    if (backEventListener !== null) {
        //document.removeEventListener('tizenhwkey', backEventListener);
        //backEventListener = null;
        //window.tizen.application.getCurrentApplication().exit();
        if (fullMode) { exitFullScreen(); } else {
    		var txt;
    if (confirm("Do you want to restart the app?") == true) {
        txt = "You pressed OK!";
        window.location.href="/start.html";
    } else {
        swal("Dont get yourself into trouble", {
        			  button: false,
        			  timer:3000
        			});
    }
    		
    	}
    }
};
var oldTitle;
oldTitle = document.title;
//Initialize function
var init = function() {
	
    // register once
    if (backEventListener !== null) {
    		
        return;
    }
};
// TODO:: Do your initialization job
console.log("init() called");

var backEvent = function(e) {
    if (e.keyName === "back") {
        try {
            if ($.mobile.urlHistory.activeIndex <= 0) {
                // if first page, terminate app
                //unregister();
            	
            	
            } else {
                // move previous page
                $.mobile.urlHistory.activeIndex -= 1;
                $.mobile.urlHistory.clearForward();
                window.history.back();
            }
        } catch (ex) {
            unregister();
        }
    }
};


//add eventListener for tizenhwkey (Back Button)
document.addEventListener('tizenhwkey', backEvent);
backEventListener = backEvent;
document.addEventListener('keydown', setFocusElementM);

$(document).bind('pageinit', init);
//$(document).unload( unregister );
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        //alert('hidden');
        // Something you want to do when application is paused.
        console.log("lifecycle [pause]");
        if (fullMode) webapis.avplay.stop();
    } else {

        // Something you want to do when application is resumed.
        console.log("lifecycle [resume]");
        if (fullMode) checkUrl(lastURL);

    }
});



function getMenu(mode) {
	//swal.close();
	if (mode==='cat') {
		
		
		//alert($('#ch_table').attr('category'));
		var request = $.get({
			url: "https://api.allorigins.win/get?url=http://www.nasehi.nu/hent.php",
//			headers: { 'Access-Control-Allow-Origin': '*' },
		crossDomain: true,
			cache: false,
			async: false,
			timeout: 3000,
			success: function(result) {
			
			// preserve newlines, etc - use valid JSON
			var s = result['contents'].toString().trim();
			s = s.replace(/\\/g, '')
			.replace(']', '')
			.replace('[{', '{')
			.replace(/\s+/g, '');

			//var jd = JSON.parse(result);
            //var table = $(jd['contents']);
            //$('#ch_list').html(table);
			categoriesJSON = JSON.parse(result['contents'].toString().trim())['cat'];
			//console.log('array : '+s);
			$('.nav-stacked').html('<center>');
			$.each(categoriesJSON, function(key, value) {
				$('.nav-stacked').append('<li id="li'+key+'"><a id="id'+key+'" catName="'+value.name+'" href="javascript:void(0);" style="box-shadow:0 0;">'+value.showName+'</a></li>\n ');
				//updateLists();
				
			});
			item_count = item_count = $(".nav-stacked").find("a").length;
		},
		error: function(err){
			setTimeout(function(){ getMenu('cat'); }, 3000);
			
		}
	});
// 	var url = "http://nasehi.nu/hent.php";

// var xhr = new XMLHttpRequest();
// xhr.open("GET", url, true);

// xhr.onreadystatechange = function () {
//    if (xhr.readyState === 4) {
   	


// 			// preserve newlines, etc - use valid JSON
// 			var s = result['contents'].toString().trim();
// 			s = s.replace(/\\/g, '')
// 			.replace(']', '')
// 			.replace('[{', '{')
// 			.replace(/\s+/g, '');

// 			//var jd = JSON.parse(result);
//             //var table = $(jd['contents']);
//             //$('#ch_list').html(table);
// 			categoriesJSON = JSON.parse(result['contents'].toString().trim())['cat'];
// 			//console.log('array : '+s);
// 			$('.nav-stacked').html('');
// 			$.each(categoriesJSON, function(key, value) {
// 				$('.nav-stacked').append('<li id="li'+key+'"><a id="id'+key+'" catName="'+value.name+'" href="javascript:void(0);" style="box-shadow:0 0;">'+value.showName+'</a></li>\n ');
// 				//updateLists();
				
// 			});
// 			item_count = item_count = $(".nav-stacked").find("a").length;



   	
//       console.log(xhr.status);
//       console.log(xhr.responseText);
//    }};

// xhr.send(null);
	} else {
		var request = $.get({
			url: "https://api.allorigins.win/get?url=http://www.nasehi.nu/hent.php?mode=tv",
//			headers: { 'Access-Control-Allow-Origin': '*' },
		crossDomain: true,
			cache: false,
			async: false,
			timeout: 3000,
			success: function(result) {
				
				// preserve newlines, etc - use valid JSON
				var s = result['contents'].toString().trim();
				s = s.replace(/\\/g, '')
				.replace(']', '')
				.replace('[{', '{')
				.replace(/\s+/g, '');

				//var jd = JSON.parse(result);
	            //var table = $(jd['contents']);
	            //$('#ch_list').html(table);
				tvlistJSON = JSON.parse(result['contents'].toString().trim())['list'];
				//console.log(s);
				//updateLists();
				//console.log('array : '+getObjects(tvlistJSON['list'],'','Persiana'));
			
			},
			error: function(err){
				setTimeout(function(){ getMenu('tv'); }, 3000);
				
			}
		});
	}
}
function updateLists(cat) {
	//if (tvlistJSON.length>0) {
		var list = searchJSON('tv', cat);
		//alert($('a:first-child').attr('catName'));
		//alert('list '+cat);
		//console.log(list);
		i = 0;
		var newTable;
		setTimeout(function() {
		newTable = "<table id='ch_table' category='"+cat+"' style='display:table;table-layout:fixed;border-collapse: collapse;'>";

		
		
		jQuery.each(list, function(key, value) {
		    if (value.CH_ICON !== null && value.CH_ICON.length > 3) {
		        logo = "<img src='"+value.CH_ICON+"' width='50' height='50'><br>";
		        } else {
		        logo = '';
		        }
			//console.log('key :'+key[i]+' - value: '+value.CH_NAME);
			if (i++ % perRow === 0) newTable += '<tr>';
			newTable += "<td id='ch"+key+"' style='display:table-cell;padding:5px;text-align: center;word-wrap:break-word;'><button chid='"+value.ID+"' type='button' class='btn-primary' value='"+value.CH_NAME+"' url='"+value.CH_URL+"'>"+logo+"<span>"+value.CH_NAME+"</span></button></td>";
			//$('#ch_table').append('');
			if (i % perRow === 0) newTable += '</tr>'; 
			
			
		
		});
	    if (i % perRow !== 0) newTable += '</tr>';
	    newTable += '</table>';
	    $('#ch_list').empty().html(newTable);
	    //$('#ch_table').style('background-color', '#343285');
	    $.each($('#ch_table tr td'), function(key, value) {

	        $(this).attr('id', 'ch' + key);
	    
            var input = $('#ch'+key).children('button'); // This is the jquery object of the input, do what you will

            input.on('click', function(btn) {
            	showItem('channel', key);
                var url = input.attr('url');
                //alert('playing : '+input.attr('url'));
                $(document).attr("title", "SoleimanTV - "+input.attr('value'));
                //document.title = "SoleimanTV - "+input.attr('value');
                checkUrl(url);
                //	alert(url);
                
                	
            });
	    });
	    //getList(cat);
	    
	    //showItem('channel', lastItem);
	    height = $('#ch_table tr:first > td').length;
	    //alert(height);
	    width = $('#ch_table td').length;
	    showItem('channel', lastItem);
	    //alert(height);
/*	    height = perRow;
	    //alert(height);
	    width = i;*/
	    //$(window).trigger('resize');
	    //updateChList();
	//}
	    //setTable(width, height);
		}, 0);
		
		
}
function getList(category) {
	var list = searchJSON('tv', category);
	var Channels = "";
	
	$.each(list, function(index, value){
		if (value.CH_ICON !== null && value.CH_ICON.length > 3) {
	        logo = "<td><img src='"+value.CH_ICON+"' width='25' height='25'></td>";
	        } else {
	        logo = '';
	        }
		logo = '';
		Channels += "<tr><td>"+value.ID+"</td> "+logo + "<td class='channelName'> "+value.CH_NAME+"</td></tr>";
	});
	//$('.list-group').html(Channels);
	
	
}
function searchJSON(mode, search) {
	if (mode==='tv') {
	var searchTerm = search.toLowerCase().replace(/[^a-z0-9]/g, '');
	var results = tvlistJSON.filter(function(kanal) {
		return kanal.cat.toLowerCase().indexOf(searchTerm) > -1;
	  
	});
	return results;
	} else {
		var searchTerm = search.toString().toLowerCase();
		var results = categoriesJSON.filter(function(cat) {
			
		  return cat.Name.toLowerCase().indexOf(searchTerm) > -1
		});
		return results;
	}
}
/*function getChannels(mode) {

    var requ = $.ajax({
        url: "https://api.allorigins.win/get?url=http://salmantv.onlinewebshop.net/testing.php?mode=" + mode.toUpperCase(),
        dataType: 'html',
        async: true,
        cache: false,
        	timeout:5000,
        contentType: "text/html",
        beforeSend: function() {
            startLoad();
        },
        success: function(response) {
            var jd = JSON.parse(response);
            var table = $(jd['contents']).filter('table');
            $('#ch_list').html(table);
            stopLoad();
            
        },
        error: function(x, t, m) {
        	if(t==="timeout"){
        		swal("Dårlig forbindelse - kunne ikke hente kanaler", {
        			  button: false,
        			  timer:3000
        			});
        	}
            stopLoad();
            console.log(request.responseText);
        },
        complete: function() {
        	 $.each($('#ch_table tr td'), function(key, value) {

        	        $(this).attr('id', 'ch' + key);
        	    });
        	 showItem('channel', 0);
            $("button[type='button']").each(function() {
                var input = $(this); // This is the jquery object of the input, do what you will

                input.on('click', function(btn) {
                    var url = btn.target.getAttribute('url');
                    //alert('playing : '+url);
                    checkUrl(url);
                    
                    	
                });
            });
        }
    });


}*/

$( document ).ajaxStart(function() {
	
	  startLoad();
	}).ajaxComplete(function() {
	  stopLoad();
	  $('.bar').fadeOut(3000, "linear", function() {


	   		$('html, body').attr('style', 'background: white;');
	   		$('.shay').attr('style', 'display: block;');
	});
		  
	}).ajaxError(function() {
	  stopLoad();
	  //$('.shay').attr('style', 'display: none;');
	  //window.location.href='index.html';
	  
	});
function startLoad() {
    //document.activeElement.blur();
    //$("div.loading").removeClass("hidden");
    $(".loader").show();
    //$.loading('Loading...');
    //$('.toast').toast('show');
    //$('body').hide();
}

function stopLoad() {
    //$("div.loading").addClass("hidden");
    $(".loader").hide();
    //$.hideLoading();
    //$('body').show();
}

function myClickHandler(event)  {
	  // `this` is the player in this context

	  if (this.isFullscreen()) {
	      this.exitFullscreen();
	    } else {
	      this.requestFullscreen();
	    }
	};
function playChannel(url) {
	

	
	
	//alert($('.active').children().attr('value'));
    if (navigator.userAgent.indexOf("SMART-TV") >= 0) { 
    	$('#chan').show();
    		
      
    		try {
    			  
    			webapis.avplay.open(url);
    			webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
    			//
    			}
    		
    			catch (e) 
    			{
   /* 				exitFullScreen();
    		        stopLoad();
    		        webapis.avplay.stop();*/
    			console.log(e.toString());
    			}
        lastURL = "" + url;
        var bitRateString = 'BITRATES=2500~5000|STARTBITRATE=HIGHEST|SKIPBITRATE=LOWEST';

        //webapis.avplay.setStreamingProperty('ADAPTIVE_INFO', bitRateString);
        
        //webapis.avplay.setStreamingProperty("SET_MODE_4K");
        
       	webapis.avplay.setStreamingProperty("ADAPTIVE_INFO", "FIXED_MAX_RESOLUTION=1920x1080");
        
        //webapis.avplay.setStreamingProperty("ADAPTIVE_INFO", BitRateString);
        webapis.avplay.setStreamingProperty("PREBUFFER_MODE", "5000");

        webapis.avplay.setTimeoutForBuffering(2);
        //webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX')
            webapis.avplay.setDisplayMethod("PLAYER_DISPLAY_MODE_FULL_SCREEN");
        webapis.avplay.prepareAsync(prepareCallback);
    } else {
/*        var playthis = document.getElementById('playthis');

        var newSource = document.createElement('source');
        newSource.setAttribute('url', url);
        playthis.appendChild(newSource);
        	newSource.type= 'application/x-mpegURL';
        console.log('added child source with URL:' + url);*/
    		var oldPlayer = document.getElementById('my_video_1');
    		if (oldPlayer !== null) {
    		videojs(oldPlayer).dispose();
    		}
        $("#playthis").html("<center><video id='my_video_1' width='350' height='300' autoplay='true' class='video-js live-ui' controls preload='auto' data-setup='{}' controls autoplay> <source src='"+url+"' type='application/x-mpegURL'></source></video></center>");
        var  player = videojs('my_video_1', {
        	  userActions: {
        		    click: myClickHandler
        		  }
        		});
      
      
  
        //alert($('.active').children('button').attr('value'));
        $('#my_video_1_html5_api').attr('title', "SoleimanTV - " + $('.active').children('button').attr('value'));
        //player.requestFullscreen();
        
        player.play();
        	
        player.on('fullscreenchange', function () {
        	if (!player.isFullscreen()) {
        		player.stop();
        		player.hide();
        	} else {
            
        		player.play();
        		player.show();
        	}
        	
        		player.requestFullScreen();
       
        });
        /*$('#playthis').attr('url', url);
		$('#playthis').find('source').attr('url', url);*/

    }
    //alert(oldTitle);
    document.title = oldTitle;
}

function prepareCallback() {
    webapis.avplay.play();
    
}

function EnterfullScreen() {
    //alert('fullscreen');
    //startLoad();
	document.removeEventListener("keydown", setFocusElement);
	document.addEventListener('keydown', ChannelShifting);
	
    //webapis.avplay.setBufferingParam("PLAYER_BUFFER_FOR_RESUME","PLAYER_BUFFER_SIZE_IN_SECOND", 15);
    //webapis.avplay.play();
	//$('#player').attr('width', '100%');
	//$('#player').attr('height', '100%');
	
    $('#player').addClass('fullscreenMode');
    $('#player').addClass('av-player');
    
    $('#player').show();
    $('#player').scrollToMe();
    fullMode = true;
    showChannel();
}

function exitFullScreen() {
	
    //webapis.avplay.stop();
	document.addEventListener("keydown", setFocusElement);
	document.removeEventListener('keydown', ChannelShifting);
	$('#chan').hide();
    stopLoad();
    $('#player').removeClass('fullscreenMode');
    $('#player').removeClass('av-player');
    $('#player').hide();
    $('html,body').scrollToMe();
    fullMode = false;
    webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX');
    //player.width = window.document.documentElement.clientWidth;
    //player.height = window.document.documentElement.clientHeight;
    webapis.avplay.stop();
    swal.close();
    //webapis.avplay.setDisplayRect(playerCoords.x, playerCoords.y, playerCoords.width, playerCoords.height);

}

function checkUrl(url) {
	//alert(swal.getState());
	
	$.ajax({
        url:url, //be sure to check the right attribute
        	timeout: 3000,
        	async: true,
        cache: false,
        success: function () { //pass an anonymous callback function
        	if (navigator.userAgent.indexOf("SMART-TV") >= 0) {
        	webapis.avplay.stop();
        	EnterfullScreen();
	        document.removeEventListener("keydown", setFocusElement);
        	}
        //	webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
        
        	playChannel(url);
        },
        error: function (jqXHR, status, er) {
        //alert('status: '+status+'\nshay: '+jqXHR+'\nerror: '+er);
        	if(status==="timeout"){
        	document.addEventListener("keydown", setFocusElement);
        	swal("Dårlig forbindelse - kunne ikke vise kanalen", {buttons:false, timer:4000});
        	}
        	if (status=== "error") {
        		
        		
        	}
        	if (navigator.userAgent.indexOf("SMART-TV") >= 0) {
        	webapis.avplay.stop();
        	exitFullScreen();
        	}
        	//alert('dead link '+status);
            //only set the error on 404
        	if (jqXHR.status !== 200) {
        		swal("Død kanal", {buttons:false,timer:1000});
        		hideChannel($('.active').children().attr('chid'));
        	}
            if (jqXHR.status === 404) { 
            	
            //	hideChannel(findElement($('.active')));
            	swal("Død kanal", {buttons:false,timer:3000});
            
            	
            }
        	
            //you could perform additional checking with different classes
            //for other 400 and 500 level HTTP status codes.
        }
    });
}
function hideChannel(id) {
	//alert(' found id '+id);
	$.ajax({
		cache:false,
		async:true,
		data: {'update':'yes',
		'chid': id	
		},
		type: "get",
		url: 'https://api.allorigins.win/get?url=http://nasehi.nu/testing.php?chid='+id,
		crossDomain: true,
		
			cache: false,
			async: true,
			timeout: 3000,
		success: function(result){
			swal("DØD LINK\nKanal: "+$('.active').children().attr('value')+' er slettet. Det vil registreres næste app start', {buttons:false, timer:4000});
			
			updateChList();
			showItem('channel', lastItem);
			//alert(result.toString());
		},
		error: function (jqXHR, status, er) {
			swal("Fejl i sletning af kanal", {buttons:false, timer:4000});
		}
		
	});
}
function updateChList(){
	var now = findElement($('.active'));
	
	var navn = $('.active').children().attr('chid');
	var table = $('.active').parent().parent().clone();
	
	$('.active').remove();
	//$(window).trigger('resize');
	//alert('forrige : '+now);
//alert($('#ch_table').attr('category'));
//getMenu('tv');
	//alert(tvlistJSON.length);
	//alert(navn);
	Array.prototype.getIndexOf = function(el) {

		  var arr = this;

		  for (i in arr){
		     //console.log(arr[i].ID);
		     if(arr[i].ID==el){
		    	 console.log(arr[i].CH_NAME);
		       return i;
		     }
		     
		  }
		  
		  return -1;

		}
	//alert(tvlistJSON.getIndexOf(navn));
	delete tvlistJSON[tvlistJSON.getIndexOf(navn)];
	//alert(tvlistJSON.length);
	updateLists($('#ch_table').attr('category'));
	//showItem('channel', lastItem);
	
}
function getIndexOfKey(key){
    for (var i = 0; i < tvlistJSON.length; i++)
    {
        if (typeof(tvlistJSON[i][key]) != 'undefined')
        {
            return i;
        }
    }    
    return -1;
}
function showChannel() {
	if (fullMode) {
		$('#myNavbar').html('Changing...');
 	$('#chan').show();
    //alert('hej');
$('#myNavbar').attr('style','display: block;');
		$('#myNavbar').html(''+$('.active').children('button').attr('value')+'');
	}
}
function hideCh() {
	if (fullMode) {
		//$('#myNavbar').html('Changing...');
 	$('#chan').hide();
    //alert('hej');
$('#myNavbar').attr('style','display: none;');
		//$('#myNavbar').html(''+$('.active').children('button').attr('value')+'');
	}
}
var current_page = 1;
var records_per_page = 10;
function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}
    
function changePage(page)
{
    /*var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");*/
    var listing_table = $('#menuList');
   // var page_span = document.getElementById("page");
    
    
    objJson = searchJSON('tv', $('#ch_table').attr('category'));
    //pages = objJson.length / records_per_page;
    //alert(objJson.length);
    
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();
    var strList = "";
    //listing_table.innerHTML = "";

    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
        //listing_table.innerHTML += "<li>"+objJson[i].CH_NAME + "</li>";
    		if (lastURL === objJson[i].CH_URL) {
    			strList += "<li class='channelName selecting' id='me"+i+"'>"+objJson[i].CH_NAME + "</li>";
    		} else {
    			
    			strList += "<li class='channelName' id='me"+i+"'>"+objJson[i].CH_NAME + "</li>";
    		}
    }
	listing_table.html(strList);
    //page_span.innerHTML = page;

/*    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }*/

/*    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }*/
}

function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}

/*window.onload = function() {
    changePage(1);
};*/
