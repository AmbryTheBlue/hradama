var glo_x = 0;
var glo_y = 0;
var pole = [];

var selected = "";
var player = 1;
var last_move = "";

function generuj(){
  document.getElementById('sachovnice').innerHTML = "";
  var x = Number(document.getElementById('sirka').value);
  var y = Number(document.getElementById('vyska').value);
  var v = Number(document.getElementById('vrstvy').value);
  glo_x = x;
  glo_y = y;

  var tile_size = 90;
  var pomer = 7/10;
  var kamen_size = Math.round(tile_size*pomer);
  var posun_kamen = Math.round(tile_size*(1-pomer)/2);
  var sach_size_x = tile_size*x;
  var sach_size_y = tile_size*y;
  document.head.removeChild(document.head.childNodes[document.head.childNodes.length-1]);
  var style = document.createElement('style');
  var muj_text = '#sachovnice {margin-bottom:'+ (glo_y*2*2).toString() + 'px; display: grid; grid-template-columns: repeat('+ x +', 1fr);grid-template-rows: repeat('+ y +', 1fr);  height: ' + sach_size_y + 'px;  width: '+sach_size_x+'px;} .tile { width: ' + tile_size.toString() + 'px; height: ' + tile_size.toString() +'px; border: 2px solid blue;text-align: center; vertical-align: middle;} .kamen{ border-radius: 100%;  border: 1px solid blue; width: ' + kamen_size.toString() + 'px;  height: ' + kamen_size.toString() + 'px;}';
  muj_text = muj_text + `
  .cerny{
   position: relative;
   left: ` + posun_kamen.toString()+`px;
   background-color: gray;

  }
  .bily{
    position: relative;
    left: ` + (posun_kamen).toString()+`px;
    bottom: `+ (kamen_size+2).toString() + `px;
    background-color: white;
    z-index: 3;
  }
   `;
  style.innerHTML = muj_text;
  document.head.appendChild(style);
  console.log(x,y,v);
  var text = "";
  for (var i = 1; i < x+1; i++) {
    for (var j = 1; j < y+1; j++) {
      if (i%2==0) {
        if (j%2==0) {
          text = '<div id="x'+ (i-1) +'y'+(j-1)+'" class="tile black" onclick="zmacknuto('+i+','+j+')" style="grid-column:' + i +' / ' + (i+1) + ';grid-row:' + j +' / ' + (j+1) + ';" > <p>x'+ (i-1) +'&nbsp;y'+(j-1)+'</p><p class="kamen cerny"></p><p class="kamen bily"></p></div>';
        }
        else {
          text = '<div id="x'+ (i-1) +'y'+(j-1)+'" class="tile white" onclick="zmacknuto('+i+','+j+')" style="grid-column:' + i +' / ' + (i+1) + ';grid-row:' + j +' / ' + (j+1) + ';" ><p>x'+ (i-1) +'&nbsp;y'+(j-1)+'</p><p class="kamen cerny"></p><p class="kamen bily"></p></div>';
        }
      }
      else {
        if (j%2==0) {
          text = '<div id="x'+ (i-1) +'y'+(j-1)+'" class="tile white" onclick="zmacknuto('+i+','+j+')" style="grid-column:' + i +'/' + (i+1) + ';grid-row:' + j +'/' + (j+1) + ';"><p>x'+ (i-1) +'&nbsp;y'+(j-1)+'</p><p class="kamen cerny"></p><p class="kamen bily"></p></div>';
        }
        else {
          text = '<div id="x'+ (i-1) +'y'+(j-1)+'" class="tile black" onclick="zmacknuto('+i+','+j+')" style="grid-column:' + i +'/' + (i+1) + ';grid-row:' + j +'/' + (j+1) + ';"><p>x'+ (i-1) +'&nbsp;y'+(j-1)+'</p><p class="kamen cerny"></p><p class="kamen bily"></p></div>';
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
zobrazNaSachovnici();
}


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
     unselect();
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
        if (last_move=="") {
          console.log("Legitimní tah, bude proveden!");
          pole[k_y][k_x] = 1;
          pole[s_y][s_x] = 0;
          unselect();
          endTurn();
        }
        else {
          console.log("Po skoku nejde provést posun!");
        }
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
           unselect();
           last_move = "skok";
           selected = "x" + k_x.toString() + "y" + k_y.toString();
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
           unselect();
           last_move = "skok";
           selected = "x" + k_x.toString() + "y" + k_y.toString();
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
        if (last_move=="") {
          console.log("Legitimní tah, bude proveden!");
          pole[k_y][k_x] = 2;
          pole[s_y][s_x] = 0;
          unselect();
          endTurn();
        }
        else {
          console.log("Po skoku nejde provést posun!");
        }

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
           unselect();
           last_move = "skok";
           selected = "x" + k_x.toString() + "y" + k_y.toString();
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
           unselect();
           last_move = "skok";
           selected = "x" + k_x.toString() + "y" + k_y.toString();
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
   zobrazNaSachovnici();
}

function endTurn() {
  console.log("Tah ukončen!");
  if (player==1) {
    document.getElementById('hrac1').style.border = "7px solid white";
    document.getElementById('hrac2').style.border = "7px solid red";
    player = 2;
    console.log("Na tahu je hráč 2");
  }
  else {
    document.getElementById('hrac1').style.border = "7px solid red";
    document.getElementById('hrac2').style.border = "7px solid white";
    player = 1;
    console.log("Na tahu je hráč 1");
  }
  unselect();
  last_move = "";
}

function unselect(){
  if(selected!=""){
    var x = selected.split("y")[0].substring(1);
    var y = selected.split("y")[1];
    if((x%2==0&&y%2==0)||(x%2==1&&y%2==1)){
      document.getElementById(selected).style.backgroundColor = "black";
    }
  }
  selected = "";
}

function zobrazNaSachovnici(){
  if(selected!=""){
    document.getElementById(selected).style.backgroundColor = "red";
  }
  for (var i = 0; i < pole.length; i++) {
    for (var j = 0; j < pole[i].length; j++) {
      var akt = "x"+j+"y"+i;
      var deti = document.getElementById(akt).children;
      if (pole[i][j]==0) {
        deti[1].style.visibility = "hidden";
        deti[2].style.visibility = "hidden";
      }
      else if (pole[i][j]==1) {
        deti[1].style.visibility = "visible";
        deti[2].style.visibility = "hidden";
      }
      else if (pole[i][j]==2) {
        deti[1].style.visibility = "hidden";
        deti[2].style.visibility = "visible";
      }
      else {
        console.log("Kritická chyba vnitřních systémů zobrazení kamenů!");
      }
    }
  }
}
