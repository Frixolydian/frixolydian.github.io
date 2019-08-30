function dates(){


  var Day = document.getElementById('seedInput1').value;
  var Month = document.getElementById('seedInput2').value;
  var Year = document.getElementById('seedInput3').value;

  var result1 = '' + Day + Month + Year;
  var result2 = 0;
  var result3 = 0;

  for (var i = 0; i < result1.length; i++){
    result2 += Number(result1.substr(i, 1));
  }
  result2 += '';

  for (var i = 0; i < result2.length; i++){
    result3 += Number(result2.substr(i, 1));
  }

  document.getElementById("result1").innerHTML = result1;
  document.getElementById("result2").innerHTML = result2;
  document.getElementById("result3").innerHTML = result3;

}


