var glo_x = 0;
var glo_y = 0;
var pole = [];
function generuj(){
  document.getElementById('sachovnice').innerHTML = "";
  var x = Number(document.getElementById('sirka').value);
  var y = Number(document.getElementById('vyska').value);
  var v = Number(document.getElementById('vrstvy').value);
  glo_x = x;
  glo_y = y;

  var tile_size = 90;
  var sach_size_x = tile_size*x;
  var sach_size_y = tile_size*y;
  document.head.removeChild(document.head.childNodes[document.head.childNodes.length-1]);
  var style = document.createElement('style');
  style.innerHTML = '#sachovnice {display: grid; grid-template-columns: repeat('+ x +', 1fr);grid-template-rows: repeat('+ y +', 1fr);  height: ' + sach_size_y + 'px;  width: '+sach_size_x+'px;} .tile { width: ' + tile_size.toString() + 'px; height: ' + tile_size.toString() +'px; border-color: blue; border: 3px; text-align: center; vertical-align: middle;}';
  document.head.appendChild(style);
  console.log(x,y,v);
  var text = "";
  for (var i = 1; i < x+1; i++) {
    for (var j = 1; j < y+1; j++) {
      if (i%2==0) {
        if (j%2==0) {
          text = '<div class="tile black" onclick="zmacknuto('+i+','+j+')" style="grid-column:' + i +' / ' + (i+1) + ';grid-row:' + j +' / ' + (j+1) + ';" >x'+ (i-1) +'&nbsp;y'+(j-1)+'</div>';
        }
        else {
          text = '<div class="tile white" onclick="zmacknuto('+i+','+j+')" style="grid-column:' + i +' / ' + (i+1) + ';grid-row:' + j +' / ' + (j+1) + ';" >x'+(i-1)+'&nbsp;y'+(j-1)+'</div>';
        }
      }
      else {
        if (j%2==0) {
          text = '<div class="tile white" onclick="zmacknuto('+i+','+j+')" style="grid-column:' + i +'/' + (i+1) + ';grid-row:' + j +'/' + (j+1) + ';">x'+(i-1)+'&nbsp;y'+(j-1)+'</div>';
        }
        else {
          text = '<div class="tile black" onclick="zmacknuto('+i+','+j+')" style="grid-column:' + i +'/' + (i+1) + ';grid-row:' + j +'/' + (j+1) + ';">x'+(i-1)+'&nbsp;y'+(j-1)+'</div>';
        }
      }
        document.getElementById('sachovnice').innerHTML = document.getElementById('sachovnice').innerHTML + text;
    }
  }
  console.log("Dogenerována šachovnice!");
  pole = [];
  for (var i = 0; i < y; i++) {
    var policko = [];
    for (var j = 0; j < x ; j++) {
      policko.push(0);
    }
    pole.push(policko);
  }
  console.log(pole);
console.log("v=" + v);
for (var i = 0; i < v; i++) {
  for (var j = 0; j < x ; j++) {
    console.log(i,j);
    if (i%2==0) {
      if (j%2==0){
        pole[i][j] = 1;
      }
    }
    else {
      if (j%2==1) {
        pole[i][j] = 1;
      }
    }
  }
}
for (var i = y-1 ; i > y-v-1; i--) {
  for (var j = 0; j < x ; j++) {
    if (i%2==0) {
      if (j%2==0){
        pole[i][j] = 2;
      }
    }
    else {
      if (j%2==1) {
        pole[i][j] = 2;
      }
    }
  }
}
console.log(pole);
}

var selected = "";
var player = 1;
function zmacknuto(k_x,k_y){
 //pozor v promenne pole je pole[y][x]
 k_x = k_x-1;
 k_y = k_y-1;
 if (selected=="") {
   selected = "x"+k_x+"y"+k_y;
   console.log("Vybráno: " + selected);
   if (player==pole[k_y][k_x]) {
     console.log("Na tomto poli máš kámen, klikni někam jinam, aby jsi s ním pohnul!");
   }
   else {
     selected="";
     console.log("Na tomto poli nemáš kámen. Výběr zrušen!");
   }
 }
 else {
   var t = selected.substring(1);
   var s_x = Number(t.split("y")[0]);
   var s_y = Number(t.split("y")[1]);
   console.log("Kliknuto: x=" + k_x + ", y=" + k_y);
   console.log("Vybráno: " + selected);
   if (player==1) {
     //posunutí o jedno pole
     if (k_y==s_y+1&&(k_x==s_x+1||k_x==s_x-1 )) {
      if (pole[k_y][k_x]==0) {
        console.log("Legitimní tah, bude proveden!");
        pole[k_y][k_x] = 1;
        pole[s_y][s_x] = 0;
        selected ="";
      }
      else {
        console.log("Na poli již leží kámen, nemůžeš se na něj přesunout!");
      }
     }
     //skákání
     else if (k_y==s_y+2) {
       if (k_x==s_x+2) {
         if (pole[s_y+1][s_x+1]==2) {
           console.log("Přeskakuješ nepřátelský kámen. Tah bude proveden!");
           pole[s_y+1][s_x+1] = 0;
           pole[s_y+2][s_x+2] = 1;
           pole[s_y][s_x] = 0;
           selected ="";
         }
         else {
           console.log("Nemůžeš přeskočit prázdné pole nebo svůj kámen!");
         }
       }
       else if (k_x==s_x-2) {
         if (pole[s_y+1][s_x-1]==2) {
           console.log("Přeskakuješ nepřátelský kámen. Tah bude proveden!");
           pole[s_y+1][s_x-1] = 0;
           pole[s_y+2][s_x-2] = 1;
           pole[s_y][s_x] = 0;
           selected ="";
         }
         else {
           console.log("Nemůžeš přeskočit prázdné pole nebo svůj kámen!");
         }
       }
       else {
         console.log("Nelegální tah!");
       }
     }
   //zbylé tahy nejsou možné
     else {
       console.log("Tento tah nelze provést!");
     }
   }
   else {
     //posunutí o jedno pole
     if (k_y==s_y-1&&(k_x==s_x+1||k_x==s_x-1 )) {
      if (pole[k_y][k_x]==0) {
        console.log("Legitimní tah, bude proveden!");
        pole[k_y][k_x] = 2;
        pole[s_y][s_x] = 0;
        selected ="";
      }
      else {
        console.log("Na poli již leží kámen, nemůžeš se na něj přesunout!");
      }
     }
     //skákání
     else if (k_y==s_y-2) {
       if (k_x==s_x+2) {
         if (pole[s_y-1][s_x+1]==1) {
           console.log("Přeskakuješ nepřátelský kámen. Tah bude proveden!");
           pole[s_y-1][s_x+1] = 0;
           pole[s_y-2][s_x+2] = 2;
           pole[s_y][s_x] = 0;
           selected ="";
         }
         else {
           console.log("Nemůžeš přeskočit prázdné pole nebo svůj kámen!");
         }
       }
       else if (k_x==s_x-2) {
         if (pole[s_y-1][s_x-1]==1) {
           console.log("Přeskakuješ nepřátelský kámen. Tah bude proveden!");
           pole[s_y-1][s_x-1] = 0;
           pole[s_y-2][s_x-2] = 2;
           pole[s_y][s_x] = 0;
           selected ="";
         }
         else {
           console.log("Nemůžeš přeskočit prázdné pole nebo svůj kámen!");
         }
       }
       else {
         console.log("Nelegální tah!");
       }
     }
   //zbylé tahy nejsou možné
     else {
       console.log("Tento tah nelze provést!");
     }

   }
   console.log("Aktuální stav hry!");
   console.log(pole);
 }

}

function endTurn() {
  console.log("Tah ukončen!");
  if (player==1) {
    player = 2;
    console.log("Na tahu je hráč 2");
  }
  else {
    player = 1;
    console.log("Na tahu je hráč 1");
  }
  selected = "";
}

function unselect(){
  selected = "";
}
