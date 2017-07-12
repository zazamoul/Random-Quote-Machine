var activeQuote = new Object();
var arrayColor = ["000000","111111"];
var actualColor = "222222" ;

function getColor() {
    $.ajax
            ({
                url: "http://www.colr.org/json/scheme/random",
                cache: false,
                dataType: "text",
                success: function (data)
                {
                    var colorObj = JSON.parse(data);
                    arrayColor = colorObj["schemes"][0]["colors"];
                    randomColor();
                    console.log(arrayColor);
                 }                
            });
    };

function randomColor()
    {
    console.log(arrayColor);
    if (arrayColor.length > 0)
        {
            do {
                var i = Math.trunc(Math.random() * arrayColor.length);
                console.log(i);
                console.log("arrayColor[i] = ", arrayColor[i], "actualColor = ", actualColor, "différents ? ",(arrayColor[i] == actualColor));
               }
            while (arrayColor[i] == actualColor)
        }
    actualColor = arrayColor[i];
    console.log("#" + actualColor);
    $('.jumbotron').css('background-color', "#" + actualColor);
    //$(".jumbotron").style("background-color: :" + "#4404D4");}
    
    };


function getQuote() {


            $.ajax
            ({
                url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
                success: function (data) {
                    var post = data.shift(); // The data is an array of posts. Grab the first one.
                    var contentDisplay = "&#8220 " + truncate(post.content) + " &#8221";
                    var authorDisplay = " - " + post.title; 
                    activeQuote.author = post.title;
                    activeQuote.content = truncate(post.content);

                    $('#quote-author').html(authorDisplay);
                    $('#quote-content').html(contentDisplay);
                    
                    getColor();


                    // If the Source is available, use it. Otherwise hide it.
                    if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
                        $('#quote-source').html('Source:' + post.custom_meta.Source);
                    }
                    else {
                        $('#quote-source').html('');
                    }
                },
                cache: false
            });
    };

function truncate(strAcouper) {
        // alert(strAcouper);
        strAcouper = strAcouper.replace("<p>", "");
        strAcouper = strAcouper.replace("<\/p>\n", "");
        //   alert(strAcouper);
        return strAcouper;
    };

$(document).ready(function () {
        

        getQuote();
        

        $('#get-another-quote-button').on('click', getQuote);

        $('#tweet-quote').on('click', function () {
            var adrTwitter = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent('"' + activeQuote.content + '" ' + activeQuote.author);
            window.open(adrTwitter, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=800,height=400");
        });
        });