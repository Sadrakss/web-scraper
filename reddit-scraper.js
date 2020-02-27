const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';

puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => {
        return page.goto(url).then(function () {
            return page.content();
        });
    })
    .then(html => {
        const $ = cheerio.load(html);
        const newsHeadlines = [];
        // $('div[class="_1OVBBWLtHoSPfGCRaPzpTf _3nSp9cdBpqL13CqjdMr2L_"] > div').each(function () {
        $('.statsTableContainer > tr').each(function () {
            newsHeadlines.push({
                rank: $(this).find('.rank > strong').text(),
                playerName: $(this).find('.playerName > strong').text(),
                nationality: $(this).find('.playerCountry').text(),
                goals: $(this).find('.mainStat').text()
            });
        });

        console.log(newsHeadlines);
    })
    .catch(console.error);