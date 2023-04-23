$(document).ready(function() {
    var fileList;
    var frontPage;
    var perc;
    var downloadId;


    // tizen.filesystem.deleteFile("downloads/AppFiles.txt", function() {
    // //alert('deleted');
    // }, function(e) {
    // alert(e.message);
    // });
    // var downloadRequest = new tizen.DownloadRequest("https://nasehi.nu/AppFiles.txt", "downloads");
    // downloadRequest.httpHeader["Pragma"] = "no-cache";
    // downloadRequest.httpHeader["Access-Control-Allow-Origin"] = "*";
    // downloadRequest.httpHeader["Cookie"] = "__test=hvaså der; expires=Thu, 31-Dec-37 23:55:55 GMT; path=/";
    // downloadRequest.httpHeader["User-Agent"] = ""+navigator.userAgent;
    // var downloadId = tizen.download.start(downloadRequest);
    // tizen.download.setListener(downloadId, DLLlistener);
    // readTextFile("/opt/usr/home/owner/content/Downloads/AppFiles.txt");

    function kaldFil() {
            $.get({
                url: "http://www.nasehi.nu/AppFiles.txt",

                crossDomain: true,
                async: false,
                contentType: 'text/plain',
                success: function(result) {
                    tilbage = "" + result;
                    console.log('Download Succes\n' + JSON.stringify(result));
                    fileList = tilbage.split(';');
                    //$(".conso").html(''+JSON.stringify(result));
                    downloadRemoteApp(fileList);
                    //alert(fileList);

                    //$(".conso").html('');




                },
                error: function(xhr, error, message) {
                    alert('fejl: ' + xhr.responseText + ', ' + error + ', ' + message);
                    setTimeout(function() {
                        kaldFil();
                    }, 3000);
                }
            });
        }
        //fileList.splice(-1);
    kaldFil();

    function getListen() {
        return fileList;

    }
    var storrelse = getListen();
    var prog = storrelse.length / 2;
    //alert(prog);
    var left = 0;
    var perc = 0;

    function readTextFile(file) {
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status == 0) {
                        var allText = rawFile.responseText;
                        fileList = allText.split(";");


                    }
                }
            }
            rawFile.send(null);
        }
        //readTextFile("http://www.nasehi.nu/AppFiles.txt");
        // SIGNATURE PROGRESS
    function moveProgressBar(darsad) {
            var elem = document.getElementById("myBar");
            var width = 1;
            width = darsad;
            elem.style.width = width + '%';
            document.getElementById("label").innerHTML = width * 1 + '%';
            //$('#label').html(width * 1 + '%');
        }


    var success = function(dir) {

        dir.createDirectory('app');
        dir.createDirectory('app/boot');
        dir.createDirectory('app/boot/js');
        dir.createDirectory('app/boot/css');
        dir.createDirectory('app/boot/fonts');
        dir.createDirectory('app/js');
        dir.createDirectory('app/css');
        //alert('yay');
        console.log("---- CREATED NEW DIRECTORIES");

    };
    var error = function(e) {
        alert('Error: ' + e.message);
    };


    tizen.filesystem.resolve('documents/', success, error);



    var DLLlistener = {
        onprogress: function(id, receivedSize, totalSize) {
            console.log("Received with id: " + id + ", " + receivedSize + "/" + totalSize);

        },
        onpaused: function(id) {
            console.log("Paused with id: " + id);
        },
        oncanceled: function(id) {
            console.log("Canceled with id: " + id);
        },
        oncompleted: function(id, path) {
            //alert('procent: '+ prog+'' );
        		left++;
            perc = Math.round((left / prog) * 100);
            moveProgressBar(perc);
            
            console.log("Completed with id: " + id + ", path: " + path);
            $('p').append("Completed with id: " + id + ", path: " + path + "<br>");
            if (path.indexOf('index.html') !== -1) {
                frontPage = path;
                console.log('------ INDEX FILEN : '+path);
                //var path = document.location.pathname;
                setTimeout(function() {
                	window.location = frontPage;
                	}, 2000);
            }

            //alert('---- har vi lyst til en procenttal ' + perc + ' - left ' + left);
            //left += 1;
            
            
            //$('#file').attr('value', (perc));
            //$('span').html((perc)+'%');
            //alert(' jeg vil gerne viderstille : '+perc+'%');
            if (perc > 95) {
            	//tau.defaults.pageTransition = "slideup";
            	
                //alert(' jeg vil gerne viderstille : ' + perc + '%');
            //	window.location.href = '/opt/usr/home/owner/content/Documents/app/index.html';
                // console.log(path);
               
                console.log('----- KIGGER EFTER PROCENT : ' + perc + ' % ');
                //$(location).attr('href','/opt/usr/home/owner/content/Documents/app/index.html');
                
            }

            
            //            if (path.includes('index.html')) {
            //              
            //            }
        },
        onfailed: function(id, error) {
            //left += 1;
            console.log("Failed with id: " + id + ", error name: " + error.name);
            $('.conso').html("Failed with id: " + id + ", error name: " + error.name + "<br>");
            //left += 1;
            //perc = Math.round((left / prog) * 100);
            //moveProgressBar(perc);
            //tizen.download.resume(downloadId);
        }
    };


    function downloadRemoteApp(Llisten) {
        var timer = 0;
        Llisten.forEach(function(shay, index, arr) {


            //$(".conso").append('Shay :' + shay + ' - index: ' + index + '');
            // Working on fileSystem - status : not working on emulator
            //alert('navn: '+index);
            if (index % 2 === 0) {
                setTimeout(function() {
                    //$(".conso").append('Shay :' + shay + ' - index: ' + index + '<br>');
                    //alert('fil: '+arr[index]+'\nin: '+arr[index+1]);
                    var dirc = '';
                    dirx = arr[index + 1];
                    dirx = dirx.replace("\n", "");
                    if (dirx.indexOf('app') !== -1) {
                        dirc = 'app/';
                    } else {
                        dirc = 'app/' + arr[index + 1].trim();
                    }
                    var url = shay.trim();
                    	url = url.replace("\n", url, "");

                    console.log('FIL: ' + url + ' in ' + dirc);
                    //document.getElementsByClassName("conso")[0].innerHTML(url + ' in '+dirc);
                    $(".conso").html(url + ' in ' + dirc + '<br>');
                    var downloadRequest = new tizen.DownloadRequest(url, "documents/" + dirc + "");
                    downloadRequest.httpHeader["Pragma"] = "no-cache";
                    downloadRequest.httpHeader["Cookie"] = "__test=hvaså der; expires=Thu, 31-Dec-37 23:55:55 GMT; path=/";
                    downloadRequest.httpHeader["User-Agent"] = "" + navigator.userAgent;
                    //alert(downloadRequest.httpHeader["User-Agent"]);


                    downloadId = tizen.download.start(downloadRequest);
                    tizen.download.setListener(downloadId, DLLlistener);
                    tizen.download.getDownloadRequest(downloadId);


                }, timer);


                timer += 50;
            }
        });


    }




});