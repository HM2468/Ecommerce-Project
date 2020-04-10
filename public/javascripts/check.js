

function check_username(str){
    var res = check_input("username", str, null, 30, 1);
    return res;
}

function check_name(str){
    var res = check_input("name", str, null, 30, 1);
    return res;
}

function check_password(str){
    var res = check_input("password", str, null, 12, 4);
    return res;
}

function check_zipcode(str){
    reg = /^[0-9A-Za-z]+$/
    var res = check_input("zipcode", str, reg, 20, 5);
    if(res != ""){
        return "zipcode format is incorrect!";
    }
    return "";
}

function check_address(str){
    var res = check_input("address", str, null, 100, 1);
    return res; 
}

function check_email(str){
    reg = /^[0-9A-Za-z_]+@[0-9A-Za-z_.]+$/
    var res = check_input("email", str, reg);
    if(res != ""){
        return "email format is incorrect!";
    }
    return "";
}

/**
 * check user input by reg and length
 * @param {*} str user input str
 * @param {*} reg regular expression
 * @param {*} maxlen maximum length of the input str
 * @param {*} minlen minimum length of the input str
 */
function check_input(name, str, reg, maxlen=100, minlen=0){
    if(reg && !reg.test(str)){
        return name + " format is incorrect!";
    }
    if(str.length > maxlen){
        return name + " length can't exceed " + maxlen;
    }
    if(str.length < minlen){
        return name + " length cant't be less than "+minlen;
    }
    return "";
}

function setFormListener(checklist){
    for(var i = 0; i < checklist.length; i++){
        var cfg = checklist[i];
        setSingleListener(cfg.identify, cfg.err_identify, cfg.func);
    }
}

function setSingleListener(identify, err_identify, func){
    $(identify).blur(function(){
        var res = func($(identify).val());
        $(err_identify).html(res);
        $(err_identify).css("visibility", res != "" ? "visible" : "hidden");
    });
}

function check_form(checklist){
    var msg = ""
    for(var i = 0; i < checklist.length; i++){
        var cfg = checklist[i];
        var res = cfg.func($(cfg.identify).val());
        $(cfg.err_identify).html(res);
        $(cfg.err_identify).css("visibility", res != "" ? "visible" : "hidden");
        if(msg == "" && res != ""){
            msg = res;
            $(cfg.identify).focus();
        }
    }
    return msg;
}

























