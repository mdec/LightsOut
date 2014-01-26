$(document).ready( function() {   
 
    var timeoutId;  // initialize timeoutId
    var Lights = {
        
        /*****
            Customize the options below to suit your needs.
        *****/
        
            timerUse : true,      
                // Set to true if you want to use an automatic timeout; set to false otherwise.
                // If you don't set an automatic timeout, see documentation for adding a button or link
                // so that users can voluntarily darken the page when leaving their computer.
            timerDelay : 3,       
                // Set the number of seconds that you want to delay before turning lights off (default is 180, which is three minutes).
            messageHTML : "This page was darkened while you were away to reduce your screen's energy consumption.<p>Click anywhere in this box to restore the page.",
                // Set message to show when lights are turned off.
                // Any HTML should be valid. See documentatino for using an image instead of text.
            messageFont : "Verdana",    
                // Set font style (default is "Verdana"). 
                // For description of options, see http://css-tricks.com/snippets/css/css-font-families/
                // Check your font in multiple browsers to be sure it works correctly!
            messageFontSize : "14px",   
                // Set font size (default is "14px"). 
                // For description of options, see http://kyleschaeffer.com/user-experience/css-font-size-em-vs-px-vs-pt-vs/ 
            
        /*****
            It's probably best not to edit anything below this line, unless you know what you're doing.
        *****/
        
            status : true,  // Lights status : true = on, false = off.
            
            out : function() { 
                // Lights.out() appends a black box the size of the screen, and a smaller box with a message informing
                // the user of what happened, and that he/she can click in the smaller box to restore the page.
                $("body").append("<div id='blackout'></div>");
                $("#blackout").css({
                    "background-color" : "#000000",
                    "height" : "100%",
                    "width" : "100%",
                    "position" : "fixed",
                    "top" : "0px",
                    "left" : "0px"
                });
                $("body").append("<div id='blackout-message'>" + Lights.messageHTML + "</div>");
                $("#blackout-message").css({
                    "background-color" : "#222222",
                    "border" : "solid 1px #EEEEEE",
                    "color" : "#CCCCCC",
                    "font-family" : Lights.messageFont,
                    "font-size" : Lights.messageFontSize,
                    "padding" : "5px",
                    "text-align" : "center",
                    "width" : "50%",
                    "position" : "fixed",
                    "bottom" : "10%",
                    "left" : "25%"
                }).click( function() {
                    Lights.on(); 
                });
            },
            
            on : function() {
                // Lights.on() removes the two boxes that Lights.off() used to black out the screen
                $("#blackout, #blackout-message").remove();
                Lights.timerClear();
            },
            
            toggle : function() {
                // Lights.toggle() switches runs Lights.out() if the lights are on, and Lights.on() if the lights are off,
                // and then toggles Lights.status accordingly.
                Lights.status ? Lights.out() : Lights.on();        
                Lights.status = !Lights.status;         
            },
            
            timerStart : function(delay) {
                // Lights.timerSet() sets a timeout to run Lights.out() if the mouse doesn't move and page doesn't scroll for
                // the number of seconds specified in Lights.timerDelay.
                timeoutId = window.setTimeout(Lights.out, delay * 1000);
            },
            
            timerClear : function() {
                // Lights.timerClear() resets the timer to run Lights.out() every time the mouse moves or page scrolls.
                clearTimeout(timeoutId);  
                Lights.timerStart(Lights.timerDelay);
            }            
    };    
    
    if (Lights.timerUse) {
        // If using a timer, set the timer, and then set event handlers to reset the timer whenever the mouse is moved or page is scrolled.
        Lights.timerStart(Lights.timerDelay);
        $(document).mousemove( function() {
            Lights.timerClear();
        }).scroll( function() {
            Lights.timerClear();
        });
    }
    
    $("#lights-out").click( function() {
        // Run Lights.toggle() when the element with id = 'lights-toggle' is clicked.
        Lights.toggle();        
    });
});
