
var store=[];
var empt=['1','2','3','4','5','6','7','8'];
//var row=Math.floor(Math.random()*3+1);
$(".lotto").text("Lotto No. : "+Math.floor(Math.random()*1000));
var n=10;
for(var j=1;j<=3;j++)
{


  for(var i=1;i<=4;i++)
  {

    var col=Math.floor(Math.random()*2+1);
    if(j==3 && (empt[0]-i==(i-1) || empt[0]-i==i))
    {
      var select=empt[0];

      if((parseInt(select))%2!=0)
      {
      col=1;
      console.log(select+" "+col);
    }
      else {
        col=2;
        console.log(select+" "+col);
      }
    }
    if(col==1)
    {
      var ran=randomnumber(((j-1)*3));
      n+=10;

    }
    else {
      n+=10;
      var ran=randomnumber(((j-1)*3))

    }
    //console.log(ran);
    var str=ran.toString();

    var s=(str).charAt(0);
    //console.log(empt.indexOf(s));
    if(empt.indexOf(s)>=0)
    empt.splice(empt.indexOf(s),1);

    var ele=s+j;
    if(str.length==1)
    {
      $("."+j).text(ran);
    }
    else
    {
    $("."+ele).text(ran);

  }

  }
  if(j==1)
  {
  n=0;
    var ran=randomnumber(0);
    store.push(ran);
  $(".1").text(ran);
  n=0;
  }

   else if(j==2)
  {
    n=80;
      var ran=randomnumber(3);
      store.push(ran);
    $(".82").text(ran);
   n=10;

 }
  else {
    if(empt.length!=0)
    {
    var rest=empt[0];
    n=rest*10;
    var ran=randomnumber(6);

    var ele="."+rest+""+j;
   $(ele).text(ran);
   empt.shift();
   n=0;
 }
 else {
   n=0;
     var ran=randomnumber(6);
     store.push(ran);
   $(".3").text(ran);
   n=0;

 }


   }


 }

function randomnumber(j)
{
  var ran=Math.floor(((Math.random()*3+1)+j)+n);
    while(true)
  {
    if(!(store.includes(ran)))
    {
      store.push(ran);
      break;
    }
    else {
      ran=Math.floor((Math.random()*3+1)+n);

    }
  }
  n+=10;
  return ran;

}



//event listener
$(".number").click(function()
{
  var str=this.innerHTML;
  if(str.length>0)
  {
  var button=this.className;
  var ele=button.charAt(0)+button.charAt(1);
  $("."+ele).toggleClass("pressed");
  console.log(button+ " " +ele);
}

});
