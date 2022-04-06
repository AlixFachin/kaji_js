
function DeleteFromArray(Array1,item){
  var Array2 = [];
  for (var i=0; i < Array1.length; i++){
    if(Array1[i] !== item){
      Array2.push(Array1[i])
      //console.log(Array1[i]);
    }
  }
  return Array2;
}

function SumArray(Array1){
  var num = 0;
  for (var i=0; i < Array1.length; i++){
    num += Array1[i];
  }
  return num;
}

function MaxArray(Array1){
  var num = 0;
  for (var i=0; i < Array1.length; i++){
    if(num < Array1[i]){
      num = Array1[i];
    }
  }
  return num;
}


function IsEFone(AliceUtility,BobUtility,AliceAllocation,BobAllocation){
  var AAU=[];
  var BAU=[];
  var ABU=[];
  var BBU=[];
  for (var i=0; i < AliceAllocation.length; i++){
    AAU.push(AliceUtility[AliceAllocation[i]]);
    BAU.push(BobUtility[AliceAllocation[i]]);
  }
  //console.log("AAU",AAU);
  //console.log("BAU",BAU);
  for (var i=0; i < BobAllocation.length; i++){
    ABU.push(AliceUtility[BobAllocation[i]]);
    BBU.push(BobUtility[BobAllocation[i]]);
  }
  //console.log("ABU",ABU);
  //console.log("BBU",BBU);
  //console.log("SumArray(AAU)",SumArray(AAU));
  //console.log("SumArray(ABU) - Math.max(ABU)",SumArray(ABU) - MaxArray(ABU));
  if (SumArray(AAU) >= SumArray(ABU) - MaxArray(ABU) && SumArray(BBU) >= SumArray(BAU)- MaxArray(BAU)) {
    return 1;
  }else{
    return 0;
  }
}



function AdjustedWinner(AliceUtility,BobUtility){
  var AliceAllocation = Array.from(Array(AliceUtility.length), (v, k) => k);
  var BobAllocation = [];
  var alist = [];
  for (var i=0; i < AliceAllocation.length; i++){
    //console.log(isString(key));
    alist.push([AliceAllocation[i], AliceUtility[AliceAllocation[i]]/BobUtility[AliceAllocation[i]]]);
  }
  console.log("AliceAllocation,BobAllocation",[AliceAllocation,BobAllocation]);
  alist.sort(function(a,b){
    if( a[1] > b[1] ) return -1;
    if( a[1] < b[1] ) return 1;
    return 0;
  });
  var t = 0;
  for (var i=0; i < alist.length; i++){
    if(IsEFone(AliceUtility,BobUtility,AliceAllocation,BobAllocation)==1){
      break;
    }
    AliceAllocation = DeleteFromArray(AliceAllocation, alist[t][0]);
    BobAllocation.push(alist[t][0]);
    console.log("AliceAllocation,BobAllocation",[AliceAllocation,BobAllocation]);
    console.log("AliceUtility,BobUtility",[AliceUtility,BobUtility]);
    t++;
  }
  return [AliceAllocation, BobAllocation];
}



export default function Home() {
  console.log(AdjustedWinner([1,2,2,1],[1,4,2,3]));
  return (
    <>
      <h1>家事分担</h1>
      <h1 style={{backgroundColor: `red`}}>見出し</h1>
    </>
  )
}