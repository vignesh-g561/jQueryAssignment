var arr = []; //json data array
 $.getJSON('GDP_json_2013.json',function(data){
     arr = data;
     var output = '';
     for (var i=0;i<arr.length;i++){
       output += "<tr><td>" + arr[i]['Country Name'] +"</td><td>" + arr[i]['Population (Millions) - 2013']
       + '</td><td><button class="btn btn-danger" id="'+arr[i]['Country Name']+'"> X </button></td></tr>';
     }
     $("#jsonTable").append(output);
     arr = data.sort(function(a, b) {
       return parseInt(b['Population (Millions) - 2013']) - parseInt(a['Population (Millions) - 2013'])});
     renderGraph(arr);

 });
 $('#addbtn').on('click', function(){
   var obj={};
   cname = document.getElementById('cName').value;
   pval = document.getElementById('pop2013').value;
   if(cname != "" || pval !=""){
     var output="";
     obj['Country Name'] = cname;
     obj['Population (Millions) - 2013'] = pval;
     arr.push(obj);
     output += "<tr><td>" + cname +"</td><td>" + pval
     + '</td><td><button class="btn btn-danger" id="'+cname+'" > X </button></td></tr>';
     $("#jsonTable").append(output);
     $("#bPart").empty();
     renderGraph(arr);
     console.log(obj);
   }
 });
 $('#jsonTable').on('click', "button",function(){
   var btnid = $(this).attr('id');
   for(var i=0;i<arr.length;i++){
      if(arr[i]['Country Name'] == btnid){
        arr.splice(i,1);
        $("#bPart").empty();
        renderGraph(arr);
        break;
      }
      $(this).parent().parent().css("display","none");
   }
 });
