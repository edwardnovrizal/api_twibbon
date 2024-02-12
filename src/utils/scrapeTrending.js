const puppeteer = require("puppeteer-core");
const { executablePath } = require("puppeteer");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 30 * 24 * 60 * 60, checkperiod: 24 * 60 * 60 });

async function ScrapeTrending() {
  const browser = await puppeteer.launch({
    headless: true,
    // executablePath: executablePath(),
    executablePath: "/usr/bin/chromium-browser",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const value = myCache.get("trending");
    if (value == undefined) {

      const page = await browser.newPage();

      await page.goto("https://www.twibbonize.com/explore/?sort=trending");

      await page.waitForSelector(".default__content");

      const thumb = await page.$$eval(
        ".t-campaign-card__thumbnail-container > picture > img.t-campaign-card__thumbnail",
        (el) => {
          return el.map((option) => {
            return {
              thumb: option.getAttribute("src"),
            };
          });
        }
      );

      const urlCard = await page.$$eval("div > .t-campaign-card__title", (el) => {
        return el.map((option) => {
          return {
            href: option.getAttribute("href"),
            title: option.textContent.trim().replace(/\n+/g, " "),
          };
        });
      });

      const like = await page.$$eval("div > p.t-campaign-card__support", (el) => {
        return el.map((option) => {
          console.log(option.textContent);
          const cleanedString = option.textContent
            .trim()
            .replace(/\n+/g, " ")
            .replace(/ Supporters$/, "");
          if (cleanedString.includes("K")) {
            const integerValue =
              parseFloat(cleanedString) * (cleanedString.includes("K") ? 1000 : 1);
            return {
              like: integerValue,
            };
          } else if (cleanedString.includes("M")) {
            const integerValue =
              parseFloat(cleanedString) * (cleanedString.includes("M") ? 1000000 : 1);
            return {
              like: integerValue,
            };
          }
          return {
            like: parseFloat(cleanedString),
          };
        });
      });

      const data = thumb.map((itemA, index) => ({
        ...itemA,
        ...urlCard[index],
        ...like[index],
      }));

      await browser.close();
      myCache.set("trending", data, 86400);
      
      return data;
    } else {
      return value;
    }
  } catch (error) {
    console.log(error);
    await browser.close();
    return error;
  }
}

module.exports = ScrapeTrending;
