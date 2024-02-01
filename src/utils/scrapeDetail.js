const puppeteer = require("puppeteer-core");
const { executablePath } = require("puppeteer");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 30 * 24 * 60 * 60, checkperiod: 24 * 60 * 60 });

async function ScrapeDetail(href) {
  try {
    const value = myCache.get(href);
    if (value == undefined) {
      const browser = await puppeteer.launch({
        headless: false,
        executablePath: executablePath(),
        //   executablePath: "/usr/bin/chromium-browser",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      await page.goto(`https://www.twibbonize.com/${href}`, { waitUntil: "networkidle2" });

      const title = await page.$eval(".campaign-participant-header__title", (el) => {
        return el.textContent;
      });
      const like = await page.$eval(
        ".campaign-participant-header > .d-flex > .align-items-center > p.tw--400 ",
        (el) => {
          const cleanedString = el.textContent
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
          return parseInt(cleanedString.replace(/,/g, ""), 10);
        }
      );
      const desc = await page.$$eval(
        ".campaign-participant-header > .campaign-participant-description > span ",
        (el) => {
          return el.map((option) => {
            return option.textContent.trim().replace(/\n+/g, " ");
          });
        }
      );
      const descUtuh = desc.join(" ");
      const img = await page.$eval(".frame-module__content > img ", (el) => {
        return el.getAttribute("src");
      });

      const data = {
        title: title.trim().replace(/\n+/g, " "),
        like: like,
        desc: descUtuh,
        img: img,
      };

      await browser.close();
      myCache.set(href, data, 86400);

      return data;
    } else {
      return value;
    }
  } catch (error) {
    return error;
  }
}

module.exports = ScrapeDetail;
