
// できるだけvarを使わない方がいいです。letやconstを使った方がいいです。
//  配列の場合、内容が変わっても、配列が変わらないので const を使うのはおすすめです。

function DeleteFromArray(Array1,item){
  let Array2 = []
  for (let i=0; i < Array1.length; i++){
    if(Array1[i] !== item){
      Array2.push(Array1[i])
      //console.log(Array1[i]);
    }
  }
  return Array2;
}

function SumArray(Array1){
  // var num = 0;
  // for (var i=0; i < Array1.length; i++){
  //   num += Array1[i];
  // }
  // return num;

  // reduceはめちゃくちゃ便利な関数です。日本語で説明しにくいけど、配列の全てのアイテムをある処理を対応したい場合使えます。
  // https://zukucode.com/2017/05/javascript-reduce.html
  return Array1.reduce((prev, cur) => cur + prev, 0);
}

function MaxArray(Array1){
  // var num = 0;
  // for (var i=0; i < Array1.length; i++){
  //   if(num < Array1[i]){
  //     num = Array1[i];
  //   }
  // }
  // return num;
  return Array1.reduce((prev, cur) => Math.max(prev, cur),0);
}


function IsEFone(AliceUtility,BobUtility,AliceAllocation,BobAllocation){
  let AAU=[];
  let BAU=[];
  let ABU=[];
  let BBU=[];
  for (let i=0; i < AliceAllocation.length; i++){
    AAU.push(AliceUtility[AliceAllocation[i]]);
    BAU.push(BobUtility[AliceAllocation[i]]);
  }
  //console.log("AAU",AAU);
  //console.log("BAU",BAU);
  for (let i=0; i < BobAllocation.length; i++){
    ABU.push(AliceUtility[BobAllocation[i]]);
    BBU.push(BobUtility[BobAllocation[i]]);
  }
  //console.log("ABU",ABU);
  //console.log("BBU",BBU);
  //console.log("SumArray(AAU)",SumArray(AAU));
  //console.log("SumArray(ABU) - Math.max(ABU)",SumArray(ABU) - MaxArray(ABU));
  
  // isEFOneを使う時に1か0にテストしますから、直接booleanを返しても問題ない
  return (SumArray(AAU) >= SumArray(ABU) - MaxArray(ABU) && SumArray(BBU) >= SumArray(BAU)- MaxArray(BAU));
  
}



function AdjustedWinner(AliceUtility,BobUtility){
  let AliceAllocation = Array.from(Array(AliceUtility.length), (v, k) => k);
  let BobAllocation = [];
  let alist = [];
  for (let i=0; i < AliceAllocation.length; i++){
    //console.log(isString(key));
    alist.push([AliceAllocation[i], AliceUtility[AliceAllocation[i]]/BobUtility[AliceAllocation[i]]]);
  }
  //  ${}を使うと便利です。backquoteが必須です
  console.log(`AliceUtility: ${AliceUtility}, BobUtility: ${BobUtility}`);
  // sortにコールバックを使うと、1や-1と比較するではなく、>0 か <0 だけ比較するから、b[1]-a[1] が使えます。 
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort 
  alist.sort((a, b) => (b[1]-a[1]));
  let t = 0;
  for (let i=0; i < alist.length; i++){
    if(IsEFone(AliceUtility,BobUtility,AliceAllocation,BobAllocation)){
      break;
    }
    // ここに (t < alist.length) のテストが必要でしょうか？
    AliceAllocation = DeleteFromArray(AliceAllocation, alist[t][0]);
    BobAllocation.push(alist[t][0]);
    console.log(`AliceAllocation: ${AliceAllocation}, BobAllocation: ${BobAllocation}`);
    t++;
  }
  return [AliceAllocation, BobAllocation];
}



export default function Home() {
  const AliceUtility = [1,2,2,1];
  const BobUtility = [1,4,2,3];
  console.log(AdjustedWinner(AliceUtility,BobUtility));
  return (
    <>
      <h1>家事分担</h1>
      <h1 style={{backgroundColor: `red`}}>見出し</h1>
    </>
  )
}