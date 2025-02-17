import { requestProvider } from '../utils/webln/client';
import  {ExportMetadata}   from "../assets/hashes/JSONConstructor"
import {requestInvoice} from '../lnurl-pay/request-invoice';
import { Satoshis } from '../lnurl-pay/types';

async function pay(song: object) {
  const tokenvalue: Satoshis = 10 as Satoshis;
  const { invoice } =
  await requestInvoice({
    lnUrlOrAddress: "pavanj@getalby.com",
    tokens: tokenvalue,
    comment: "Buy Song",
  });


  type ObjectKey = keyof typeof song;

const songSrc: string = song['src' as ObjectKey];

  console.log(song);

  const webln = await requestProvider();
  console.log(webln);
  if(!webln) {
    return;
  }
  requestProvider()
      .then(function(webln) {
        // returns weblnProvider object which contains all the methods defined example send payment, execute, verifySignMessage etc etc
        // we will define specification used by lnurl metadata here as well.
        console.log(webln)

        console.log(song);
      
        //// Metadata json array which must be presented as raw string here, this is required to pass signature verification at a later step
        /// we need way to convert json array into raw string, decode it on wallet side and then render it.
        //https://github.com/fiatjaf/lnurl-rfc/blob/luds/06.md type of metadata that is also to be decided

        // metadata prepared as json format, passed as string

        const metadataString =JSON.stringify(ExportMetadata())

        console.log(metadataString);

        return webln.sendPayment(invoice, metadataString)
          .then(function(r) {
            // required this constraint to protect metadata in empty invoices as a rule
            if(r != undefined){
              const contentDiv = document.getElementById('content') as HTMLDivElement;
            contentDiv.innerHTML = "YAY, thanks!";
            const timeout = document.getElementById('content') as HTMLDivElement;
            setTimeout(hideElement, 5000) //milliseconds until timeout//
            function hideElement() {
              timeout.style.display = 'none'
            }
          console.log('done', r);

            const a = document.createElement('a')
  a.href = songSrc
  a.download = songSrc.split('/').pop() as string
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

          }
          })
          .catch(function(e) {
            alert("Failed: " + e.message);
            console.log('err pay:', e);
          });
    })
    .catch(function(e) {
      alert("Webln error, check console");
      console.log('err, provider', e);
    });
}

// function download(song){
//   const a = document.createElement('a')
//   a.href = song.src
//   a.download = song.src.split('/').pop()
//   document.body.appendChild(a)
//   a.click()
//   document.body.removeChild(a)

// }

type Props = {
  songs: object,
  currentSongIndex: number
}
function BuySong({songs, currentSongIndex}: Props) {

  //console.log(props.songs[props.currentSongIndex]);
  
  return (
    <div><button className="glow-on-hover position-button" onClick={() =>pay(songs[currentSongIndex as keyof object])}>Buy This Song</button>
    {/* <button onClick={()=> download(props.songs[props.currentSongIndex])}>download</button> */}
    <div id="content" className="position-text"></div>
    </div>
  )
}

export default BuySong