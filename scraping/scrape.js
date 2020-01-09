const mysql = require('mysql')
const csv = require('csv-parser');
const fs = require('fs');
module.exports = (app, puppeteer, con) =>{

    const list = {'Texas': ['Brookdale Creekside',
                          'The Delaney At Georgetown Village',
                          'The Isle At Watermere'
                        ],
                'Florida': [
                                'Legacy At Highwoods Preserve',
                                'Emerald Park of Hollywood',
                                'Banyan Place'
                        ]
                }

    const imageURLs ={
        'Plano' : [
                                "https://bucketmani.s3.ap-south-1.amazonaws.com/Brookdale+Creekside/brookdale-creekside-1-entrance_sd.jpg",
                                "https://bucketmani.s3.ap-south-1.amazonaws.com/Brookdale+Creekside/brookdale-creekside-4-bedroom_sd.jpg",
                                "https://bucketmani.s3.ap-south-1.amazonaws.com/Brookdale+Creekside/brookdale-creekside-5-living-room_sd.jpg"
                                ],
        'BOCA_RATON' : [
                                "https://bucketmani.s3.ap-south-1.amazonaws.com/The+Delaney+At+Georgetown+Village/TheDelaneyAtGeorgetownVillage_photos_01_Seniorly_sd.png",
                                "https://bucketmani.s3.ap-south-1.amazonaws.com/The+Delaney+At+Georgetown+Village/TheDelaneyAtGeorgetownVillage_photos_03_Seniorly_sd.png",
                                "https://bucketmani.s3.ap-south-1.amazonaws.com/The+Delaney+At+Georgetown+Village/TheDelaneyAtGeorgetownVillage_photos_05_Seniorly_sd.png"
                                ],
        'Southlake' : [
                                "https://bucketmani.s3.ap-south-1.amazonaws.com/The+Isle+At+Watermere/DiscoveryVillageatSouthLake_Photos_03_Seniorly_sd.jpg",
                                "https://bucketmani.s3.ap-south-1.amazonaws.com/The+Isle+At+Watermere/DiscoveryVillageatSouthLake_Photos_09_Seniorly_sd.png",
                                "https://bucketmani.s3.ap-south-1.amazonaws.com/The+Isle+At+Watermere/DiscoveryVillageatSouthLake_Photos_10_Seniorly_sd.png"
                                ],
        'TAMPA' : [
                                "https://bucketmani.s3.ap-south-1.amazonaws.com/Legacy+At+Highwoods+Preserve/Highwoods%2520Preserve_Photos_05_Seniorly_sd.png",
                                "https://bucketmani.s3.ap-south-1.amazonaws.com/Legacy+At+Highwoods+Preserve/LegacyAtHighwoodsPreserve_photos_02_Seniorly_sd.jpg",
                                "https://bucketmani.s3.ap-south-1.amazonaws.com/Legacy+At+Highwoods+Preserve/connected-box-3_sd.jpg"
                                ],
        'HOLLYWOOD' : [
                                    "https://bucketmani.s3.ap-south-1.amazonaws.com/Emerald+Park+of+Hollywood/EmeraldParkRetirement_Photos_01_Seniorly_sd.jpg",
                                    "https://bucketmani.s3.ap-south-1.amazonaws.com/Emerald+Park+of+Hollywood/EmeraldParkRetirement_Photos_02_Seniorly_sd.jpg",
                                    "https://bucketmani.s3.ap-south-1.amazonaws.com/Emerald+Park+of+Hollywood/EmeraldParkRetirement_Photos_03_Seniorly_sd.jpg"
                                ],
        'LANTANA' : [
                            "https://bucketmani.s3.ap-south-1.amazonaws.com/Banyan+Place/IMG_1086_sd.jpg",
                            "https://bucketmani.s3.ap-south-1.amazonaws.com/Banyan+Place/IMG_1134_sd.jpg",
                            "https://bucketmani.s3.ap-south-1.amazonaws.com/Banyan+Place/banyanplace_photos_06_seniorly_sd.png"

                            ],
    }

app.get('/scrapeDataSites',  (req,res)=>{
   
    list.Texas.forEach(async(p)=>{
       await scrapeTexas(p);
    })
    list.Florida.forEach(async(p)=>{
       await scrapeFlorida(p);
    })

    res.send('jhkg')
})

async function scrapeFlorida(provider){
    const browser = await puppeteer.launch({
        headless:true
    });
    try{
                const page = await browser.newPage();
                await page.goto('https://www.floridahealthfinder.gov/facilitylocator/FacilitySearch.aspx');
                await page.waitFor(1000);
                await page.select("select#ctl00_mainContentPlaceHolder_FacilityType", "ALL")
                await page.focus('#ctl00_mainContentPlaceHolder_FacilityName');
                await page.keyboard.type(provider)
                await page.click('#ctl00_mainContentPlaceHolder_SearchButton');
                await page.waitForSelector('#ctl00_mainContentPlaceHolder_dgFacilities')

                let resultData =  await page.$$eval('#ctl00_mainContentPlaceHolder_dgFacilities > tbody > tr', trs => trs.map(tr => {
                    const tds = [...tr.getElementsByTagName('td')];
                    return tds.map(td => td.textContent.replace(/\s+([\r\n\t])/gm, ''));
                }))
                //console.log(resultData);

                let resultArrayData = await  resultData[0]
                let len = await resultArrayData.length
                var keys = [];
                for(i=0; i<len; i++){
                    keys.push(resultData[0][i].trim().replace(' ','_'))
                }
                console.log('--------florida--------------')
                for(i=1; i<3; i++){
                    let resultArrayData = await  resultData[i]
                    let len = await resultArrayData.length
                    var values = [];
                    for(j=0; j<len; j++){
                        values.push(resultData[i][j].trim().replace(' ','_'))
                    }
                    floridaObj = toObject(keys, values)
                    console.log(floridaObj)
                    city = floridaObj.City;
                    console.log(city)
                   // console.log(imageURLs)
                    let images = imageURLs[city]
                    console.log(images)
                    var q = "insert INTO properties(name, address, city, state, zip_code, phone, type, capacity, images) VALUES('"+floridaObj.Name+"','"+floridaObj.Street_Address+"','"+floridaObj.City+"','"+floridaObj.State+"','"+floridaObj.Zip+"','"+floridaObj.Phone_Number+"','"+floridaObj.Type+"','"+floridaObj.Licensed_Beds+"','"+JSON.stringify(images)+"')"
                    con.query(q, (err, result)=>{
                        if(err){
                            console.log(err)
                        }else{
                            'Inserted row into DB from florida'
                        }
                    })
                }

    }
    catch(e){
        console.log(e)
        await browser.close();
    }finally{
        await browser.close();
    }
}


async function scrapeTexas(provider){
    const browser = await puppeteer.launch({
        headless:true
    });
    try{
            const page = await browser.newPage();
            await page.goto('https://apps.hhs.texas.gov/LTCSearch', {waitUntil: 'load', timeout: 0});
            await page.waitFor(1000);
            await page.click('#p7TP3tab1_2')
            await page.waitForSelector('#searchterm')
            await page.focus('#searchterm')
            await page.keyboard.type(provider)
            await page.keyboard.press('Enter');
            await page.waitForSelector('.sortabletable')
            let kdata = await page.$$eval('.sortabletable > thead > tr', ths => {
                return ths.map(th => th.textContent.replace(/\n/g, ",").slice(1,-1));
            });
            let keys = kdata[0].replace(' ', '_').split(',')
            const vdata = await page.$$eval('.sortabletable > tbody > tr', tds => {
                return tds.map(td => td.textContent.replace(/\n/g, ",").slice(1,-1));
            });
            await page.click('.sortabletable > tbody > tr > td')
            await page.waitForSelector('.p7tp3-col-wrapper')
            const bedcountSelect = await page.$eval('.p7tp3-col-wrapper > ul:nth-child(4)', li => { return li.textContent });
            let bedcount = bedcountSelect.replace(/\D/g,'')
            values = vdata[0].split(',')
            console.log('------texas--------')
            let combinedObj =  toObject(keys, values)
            combinedObj['bedCount'] = bedcount;
            console.log(combinedObj)
            city = combinedObj.City;
            let images = imageURLs[city]

            var q = "insert INTO properties(name, address, city, state, zip_code, country, phone, type, capacity, images) VALUES('"+combinedObj.Provider+"','"+combinedObj.Address+"','"+combinedObj.City+"','"+'Texas'+"','"+combinedObj.ZIP_Code+"','"+combinedObj.County+"','"+combinedObj.Phone+"','"+combinedObj.Type+"','"+combinedObj.bedCount+"','"+images+"')"
            con.query(q, (err, result)=>{
                if(err){
                    console.log(err)
                }else{
                    'Inserted row into DB from florida'
                }
            })

   }
   catch(e){
       console.log(e)
       await browser.close();
   }finally{
        await browser.close();
   }
}



function toObject(names, values) {
    var result = {};
    for (var i = 0; i < names.length; i++)
         result[names[i]] = values[i];
    return result;
}


function insertToDB(arr){
    // arr.forEach(element => {
        
    // });

}
// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
//     await page.pdf({path: 'hn.pdf', format: 'A4'});
  
//     await browser.close();
//   })();


}