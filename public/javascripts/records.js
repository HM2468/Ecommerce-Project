$(function(){
    var records = gon.records;

    showRecords(records);

    function showRecords(records){
        var template = '<p class="records-row">'+
                        '<span class="col-ip">$ip</span>'+
                        '<span class="col-time">$time</span>'+
                        '<span class="col-path">$path</span>'+
                    '</p>';
        var htmlstr = '';
        for(var i=0; i < records.length; i++){
            var record = records[i];
            var unitstr = template.replace("$ip", record.ip);
            unitstr = unitstr.replace("$time", String(record.timestr).substr(0,19));
            unitstr = unitstr.replace("$path", record.path);
            htmlstr += unitstr;
        }
        $("#records-list").html(htmlstr);
    }
});


















