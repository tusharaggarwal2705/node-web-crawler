const { handleResponse, handleError } = require('../utils/requestHandlers');
const puppeteer=require('puppeteer')

exports.webPageCrawler=async({query:{webPageUrl}},res)=>{
    try {
        let browser=await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(webPageUrl);
        const customerReviews=await page.$$("#customerReviews #customerReviews .review");
        let final=[]
        for(let customerReview of customerReviews){
                let reviewObj={ }
                reviewObj['reviewComment']=await customerReview.$eval("blockquote",el=>el.textContent)
                let reviewerDetails=await customerReview.$$(".reviewer dd");
                reviewObj['reviewerName']=await reviewerDetails[0].evaluate(el=>el.textContent)
                reviewObj['reviewDate']=await reviewerDetails[1].evaluate(el=>el.textContent)
                let reviewRatings=await customerReview.$$('.leftCol .itemReview .itemRating')
                reviewObj['reviewRating']=await reviewRatings[0].evaluate(el=>el.textContent);
                final.push(reviewObj)
                
            
            
        }
        await browser.close();
        handleResponse({res,data:final})
    } catch (err) {
        handleError({err,res})
    }
}