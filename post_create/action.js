import puppeteer from "puppeteer"
import genPrompt from "./prompts.js";
import CreateImage from "./openjourney.js";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

async function postCreate(){
const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();

await page.goto('https://instagram.com/',{ waitUntil: 'domcontentloaded' });

await page.setViewport({width: 400, height: 700});

    
await delay(10000)
await page.type('[name=username]', process.env.USER);

await page.type('[name=password]', process.env.PASS);

await page.evaluate(()=>{
    document.querySelector("._acap").click()
      console.log("ok")
    })
await delay(10000)


await page.evaluate(()=>{
    const btn = document.querySelectorAll(".x19c4wfv")[3]
    btn.click()
      console.log("ok")
    })

await delay(5000)
const prompt = await genPrompt()
const url = await CreateImage(`${prompt},digital art,manga,colourful,vibrant.`)


const matchingButton = await page.waitForSelector("input[type='file']")


await delay(5000)
await matchingButton.uploadFile(`./image.jpg`);
await delay(5000)
await page.evaluate(()=>{
    const btn = document.querySelectorAll(".x1yc6y37")[1]
    btn.click()
      console.log("ok")
    })
await delay(5000)
await page.evaluate(()=>{
    const btn = document.querySelectorAll(".x1yc6y37")[1]
    btn.click()
      console.log("ok")
    })
await delay(5000)
await page.type("[aria-label='Write a caption...']", `[prompt] : ${prompt}
.
.
#aiart #art #ai #digitalart #generativeart #artificialintelligence #machinelearning #aiartcommunity #abstractart #nft #aiartists #neuralart #vqgan #ganart #contemporaryart #deepdream #artist #nftart #artoftheday #newmediaart #nightcafestudio #aiartist #modernart #neuralnetworks #neuralnetworkart #abstract #styletransfer #stylegan #digitalartist #artbreeder`);
await delay(5000)
await page.type('[name="creation-location-input"]',`India`)

delay(5000)
await page.evaluate(()=>{
  const btn = document.querySelectorAll(".x1yc6y37")[1]
  btn.click()
    })
await delay(10000)
await browser.close();
}

export default postCreate
// postCreate()