
$(document).ready(function(){
    console.log("document ready")
    let bootstrap_enabled = (typeof $().emulateTransitionEnd == 'function');
    checkBoot(bootstrap_enabled)
    initEL()
    


})

function checkBoot(b){
    if(b == true){
        console.log("Bootstrap loaded: " + b)
    }
    else {
        console.log("Bootstrap loaded: " + b)
    }
}

//initialize event listeners 
function initEL(){
    console.log("inside init")
    let colBtn = $(".collapsible")
    let start = $("#tttStart")
    let reset = $("#tttReset")
    const cOpen = $("#contact-open")
    const cClose = $("#contact-close")
    
    colBtn.click(function(){
        let list = $(".nav-list")
        if(list.css('display') === 'none'){
            list.css('display', 'block')
            console.log("inside first block")
        }
        else{
            list.css('display', 'none')
            console.log("inside second block")
        }
    })

    cOpen.click(function(){
        $("#contact").show()
    })

    cClose.click(function(){
        $("#contact").hide()
    })

    start.click(function(){
        TTT.start()
    })

    reset.click(function(){
        console.log("inside reset")
        TTT.reset()
    })
}
