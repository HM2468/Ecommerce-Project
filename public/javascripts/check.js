

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
    reg = /^[0-9A-Za-z ]+$/
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

function check_province(str){
    return "";
}

function check_city(str){
    return "";
}

function check_constent(sid1, sid2){
    return $(sid1).val() == $(sid2).val();
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
        setSingleListener(cfg);
    }
}

function setSingleListener(cfg){
    $(cfg.identify).blur(function(){
        check_show_error(cfg);
    });
}

function check_show_error(cfg){
    var res = "";
    if(cfg.func == check_constent){
        var issame = check_constent(cfg.identify, cfg.ref_identify);
        res = issame ? "" : cfg.name + " input is not constent!";
    } else {
        res = cfg.func($(cfg.identify).val());
    }
    $(cfg.err_identify).html(res);
    $(cfg.err_identify).css("visibility", res != "" ? "visible" : "hidden");
    return res;
}

function check_form(checklist){
    var msg = ""
    for(var i = 0; i < checklist.length; i++){
        var cfg = checklist[i];
        var res = check_show_error(cfg);
        if(msg == "" && res != ""){
            msg = res;
            $(cfg.identify).focus();
        }
    }
    return msg;
}

function form_pack(checklist){
    var data = {};
    for(var i = 0; i < checklist.length; i++){
        var cfg = checklist[i];
        data[cfg.name] = $(cfg.identify).val()
    }
    return data;
}
























