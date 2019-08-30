function letters(){


  var Name = document.getElementById('seedInput').value;

  var letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                  'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 
                  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  var numbers = [  1 ,  2 ,  3 ,  4 ,  5 ,  6 ,  7 ,  8 ,  9,
                   1 ,  2 ,  3 ,  4 ,  5 ,  5 ,  6 ,  7 ,  8 ,  9,
                   1 ,  2 ,  3 ,  4 ,  5 ,  6 ,  7 ,  8
  ]
  var result1 = Name.toUpperCase();
  var result2 = ''
  var result3 = 0;
  for (var i = 0; i < result1.length; i++){
  result2 += numbers[letters.indexOf(result1.substr(i, 1))] + " "
  result3 += numbers[letters.indexOf(result1.substr(i, 1))]
  }

  document.getElementById("result1").innerHTML = result1;
  document.getElementById("result2").innerHTML = result2;
  document.getElementById("result3").innerHTML = result3;

}


